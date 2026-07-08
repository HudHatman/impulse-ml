import createContext from 'gl';
import { ShaderCache } from './ShaderCache';
import { WebGLMemory } from './WebGLMemory';
import { WebGLModule } from './WebGLModule';

/**
 * WebGL computation device that implements the Device interface.
 * Creates a headless WebGL context and manages GPU resources.
 */
export class WebGLDevice {
  private gl: WebGLRenderingContext;
  private shaderCache: ShaderCache;
  private quadBuffer: WebGLBuffer;
  private destroyed: boolean = false;

  constructor(contextWidth: number = 1, contextHeight: number = 1) {
    // Create headless GL context
    const gl = createContext(contextWidth, contextHeight) as unknown as WebGLRenderingContext;
    if (!gl) {
      throw new Error('WebGL context creation failed: headless-gl not available');
    }
    this.gl = gl;

    // Verify float texture support
    const ext = gl.getExtension('OES_texture_float');
    if (!ext) {
      throw new Error('WebGL requires OES_texture_float extension');
    }

    // Initialize shader cache
    this.shaderCache = new ShaderCache(gl);

    // Create full-screen quad vertex buffer (triangle strip: 4 vertices)
    const quadBuffer = gl.createBuffer();
    if (!quadBuffer) {
      throw new Error('Failed to create quad vertex buffer');
    }
    this.quadBuffer = quadBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    const vertices = new Float32Array([
      -1, -1,   // bottom-left
       1, -1,   // bottom-right
      -1,  1,   // top-left
       1,  1,   // top-right
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  /** Get the WebGL rendering context */
  getGL(): WebGLRenderingContext {
    return this.gl;
  }

  /** Get the shader cache */
  getShaderCache(): ShaderCache {
    return this.shaderCache;
  }

  /** Get the full-screen quad vertex buffer */
  getQuadBuffer(): WebGLBuffer {
    return this.quadBuffer;
  }

  /** Check if the device has been destroyed */
  isDestroyed(): boolean {
    return this.destroyed;
  }

  /**
   * Allocates GPU memory (texture + framebuffer) for the given number of float elements.
   * @param count - Number of float elements to allocate
   * @returns A new WebGLMemory instance
   */
  alloc(count: number): WebGLMemory {
    if (this.destroyed) {
      throw new Error('Cannot allocate on destroyed WebGL device');
    }
    if (count <= 0) {
      throw new Error('Allocation count must be positive');
    }
    return new WebGLMemory(this.gl, count);
  }

  /**
   * Loads a computation module by name (e.g., "algebra", "matrix").
   * Returns a WebGLModule that can load individual kernel functions.
   */
  loadModule(name: string): WebGLModule {
    if (this.destroyed) {
      throw new Error('Cannot load module on destroyed WebGL device');
    }
    return new WebGLModule(this, name);
  }

  /**
   * Releases all GPU resources: shader cache, quad buffer.
   * After calling this, no operations can be performed on this device.
   */
  destroy(): void {
    if (this.destroyed) return;
    this.shaderCache.dispose();
    this.gl.deleteBuffer(this.quadBuffer);
    this.destroyed = true;
  }
}
