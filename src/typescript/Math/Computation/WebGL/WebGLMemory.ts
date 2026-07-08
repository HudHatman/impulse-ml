/**
 * Computes the 2D texture dimensions needed to hold `count` float elements.
 * Each float occupies one pixel (R channel only) in an RGBA texture.
 *
 * @param count - Total number of float elements to store
 * @returns Object with texWidth and texHeight for the texture
 */
export function computeTextureDimensions(count: number): { texWidth: number; texHeight: number } {
  const maxWidth = 4096;
  const texWidth = Math.min(count, maxWidth);
  const texHeight = Math.ceil(count / texWidth);
  return { texWidth, texHeight };
}

/**
 * Represents a GPU-resident data buffer backed by a WebGL texture and framebuffer.
 * Each instance owns one RGBA float texture and one framebuffer for render-to-texture operations.
 */
export class WebGLMemory {
  private _gl: WebGLRenderingContext;
  private _texture: WebGLTexture;
  private _framebuffer: WebGLFramebuffer;
  private _texWidth: number;
  private _texHeight: number;
  private _count: number;
  private _width: number = 0;
  private _height: number = 0;
  private _depth: number = 0;
  private _freed: boolean = false;

  constructor(gl: WebGLRenderingContext, count: number) {
    this._gl = gl;
    this._count = count;

    const { texWidth, texHeight } = computeTextureDimensions(count);
    this._texWidth = texWidth;
    this._texHeight = texHeight;

    // Create and configure texture
    const texture = gl.createTexture();
    if (!texture) {
      throw new Error('Failed to create WebGL texture');
    }
    this._texture = texture;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Initialize with zeros (RGBA float, 4 channels)
    const initialData = new Float32Array(texWidth * texHeight * 4);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.FLOAT, initialData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Create framebuffer and attach texture
    const framebuffer = gl.createFramebuffer();
    if (!framebuffer) {
      throw new Error('Failed to create WebGL framebuffer');
    }
    this._framebuffer = framebuffer;

    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

    // Verify framebuffer completeness
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Framebuffer not complete: ${status}`);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /** WebGL rendering context */
  get gl(): WebGLRenderingContext {
    return this._gl;
  }

  /** The backing WebGL texture */
  get texture(): WebGLTexture {
    return this._texture;
  }

  /** The framebuffer attached to this memory's texture */
  get framebuffer(): WebGLFramebuffer {
    return this._framebuffer;
  }

  /** Physical texture width in pixels */
  get texWidth(): number {
    return this._texWidth;
  }

  /** Physical texture height in pixels */
  get texHeight(): number {
    return this._texHeight;
  }

  /** Total element count */
  get count(): number {
    return this._count;
  }

  /** Logical matrix rows */
  get width(): number {
    return this._width;
  }

  /** Logical matrix columns */
  get height(): number {
    return this._height;
  }

  /** Logical matrix depth */
  get depth(): number {
    return this._depth;
  }

  /** Whether this memory has been freed */
  get freed(): boolean {
    return this._freed;
  }

  /** Set logical matrix row count */
  setWidth(w: number): void {
    this.guardFreed();
    this._width = w;
  }

  /** Set logical matrix column count */
  setHeight(h: number): void {
    this.guardFreed();
    this._height = h;
  }

  /** Set logical matrix depth */
  setDepth(d: number): void {
    this.guardFreed();
    this._depth = d;
  }

  /**
   * Creates a new WebGLMemory instance with the same data and logical dimensions.
   *
   * @returns A new WebGLMemory with identical data and dimensions
   */
  clone(): WebGLMemory {
    this.guardFreed();
    const cloned = new WebGLMemory(this._gl, this._count);
    cloned._width = this._width;
    cloned._height = this._height;
    cloned._depth = this._depth;
    cloned.set(this.get());
    return cloned;
  }

  /**
   * Guards against operations on freed memory.
   * Throws if this memory has already been freed.
   */
  protected guardFreed(): void {
    if (this._freed) {
      throw new Error('Operation on freed WebGL memory');
    }
  }

  /**
   * Reads back the GPU texture data and returns it as a Float32Array.
   * Binds the framebuffer, reads RGBA pixels, and extracts the R channel values.
   *
   * @returns Float32Array of length `count` containing the stored values
   */
  get(): Float32Array {
    this.guardFreed();

    const gl = this._gl;

    // Bind framebuffer for reading
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);

    // Read RGBA pixels
    const rgba = new Float32Array(this._texWidth * this._texHeight * 4);
    gl.readPixels(0, 0, this._texWidth, this._texHeight, gl.RGBA, gl.FLOAT, rgba);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Extract R channel values
    const result = new Float32Array(this._count);
    for (let i = 0; i < this._count; i++) {
      result[i] = rgba[i * 4]; // R channel
    }

    return result;
  }

  /**
   * Releases the WebGL texture and framebuffer resources.
   * Idempotent — calling free() on already-freed memory is a no-op.
   */
  free(): void {
    if (this._freed) {
      return;
    }
    this._gl.deleteTexture(this._texture);
    this._gl.deleteFramebuffer(this._framebuffer);
    this._freed = true;
  }

  /**
   * Copies data from another WebGLMemory instance into this one.
   * Uses CPU readback then re-upload for simplicity (can be optimized later).
   * Also copies logical dimensions (width, height, depth).
   *
   * @param other - The source WebGLMemory to copy from
   */
  copyFrom(other: WebGLMemory): void {
    this.guardFreed();
    this._width = other._width;
    this._height = other._height;
    this._depth = other._depth;
    this.set(other.get());
  }

  /**
   * Uploads data to the GPU texture.
   * Converts Float64Array or regular Array to Float32Array if needed.
   * Packs data into RGBA format (value in R channel, A=1.0).
   *
   * @param data - The data to upload (Float32Array, Float64Array, or number[])
   * @returns this for method chaining
   */
  set(data: Float32Array | Float64Array | number[]): this {
    this.guardFreed();

    const floatData = data instanceof Float32Array ? data : new Float32Array(data);

    // Pack into RGBA format: value in R channel, A=1.0
    const rgba = new Float32Array(this._texWidth * this._texHeight * 4);
    for (let i = 0; i < this._count; i++) {
      rgba[i * 4] = floatData[i];       // R channel
      rgba[i * 4 + 3] = 1.0;            // A channel
    }

    // Upload to texture
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
    this._gl.texImage2D(
      this._gl.TEXTURE_2D,
      0,
      this._gl.RGBA,
      this._texWidth,
      this._texHeight,
      0,
      this._gl.RGBA,
      this._gl.FLOAT,
      rgba
    );
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);

    return this;
  }
}
