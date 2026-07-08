import { VERTEX_SHADER_SOURCE } from './shaders/vertex';

/**
 * Compiles and caches WebGL shader programs.
 * Uses a shared vertex shader across all kernels.
 */
export class ShaderCache {
  private cache: Map<string, WebGLProgram> = new Map();
  private gl: WebGLRenderingContext;
  private vertexShader: WebGLShader;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.vertexShader = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  }

  /**
   * Returns a cached program for the kernel name, or compiles a new one from the fragment source.
   */
  getOrCompile(kernelName: string, fragmentSource: string): WebGLProgram {
    const cached = this.cache.get(kernelName);
    if (cached) return cached;

    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentSource);
    const program = this.linkProgram(this.vertexShader, fragmentShader);

    // Fragment shader can be detached and deleted after linking
    this.gl.detachShader(program, fragmentShader);
    this.gl.deleteShader(fragmentShader);

    this.cache.set(kernelName, program);
    return program;
  }

  /**
   * Releases all cached programs and the shared vertex shader.
   */
  dispose(): void {
    for (const program of this.cache.values()) {
      this.gl.deleteProgram(program);
    }
    this.cache.clear();
    this.gl.deleteShader(this.vertexShader);
  }

  private compileShader(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('Failed to create shader');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const infoLog = gl.getShaderInfoLog(shader) || 'Unknown error';
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${infoLog}`);
    }
    return shader;
  }

  private linkProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const gl = this.gl;
    const program = gl.createProgram();
    if (!program) {
      throw new Error('Failed to create program');
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const infoLog = gl.getProgramInfoLog(program) || 'Unknown error';
      gl.deleteProgram(program);
      throw new Error(`Program link error: ${infoLog}`);
    }
    return program;
  }
}
