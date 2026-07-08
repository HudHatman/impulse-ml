import createContext from 'gl';
import { ShaderCache } from '../../src/typescript/Math/Computation/WebGL/ShaderCache';

const SIMPLE_FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_texCoord;
void main() {
  gl_FragColor = vec4(v_texCoord, 0.0, 1.0);
}
`;

const INVALID_FRAGMENT_SHADER = `
this is not valid GLSL at all;
`;

describe('ShaderCache', () => {
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    gl = createContext(1, 1) as unknown as WebGLRenderingContext;
    gl.getExtension('OES_texture_float');
  });

  it('should construct successfully with a valid GL context', () => {
    expect(() => new ShaderCache(gl)).not.toThrow();
  });

  it('getOrCompile returns a WebGLProgram for a simple fragment shader', () => {
    const cache = new ShaderCache(gl);
    const program = cache.getOrCompile('test-kernel', SIMPLE_FRAGMENT_SHADER);
    expect(program).toBeDefined();
    // Verify it's a valid program by checking a program parameter
    const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    expect(linkStatus).toBe(true);
    cache.dispose();
  });

  it('getOrCompile returns the same program when called twice with the same name', () => {
    const cache = new ShaderCache(gl);
    const program1 = cache.getOrCompile('cached-kernel', SIMPLE_FRAGMENT_SHADER);
    const program2 = cache.getOrCompile('cached-kernel', SIMPLE_FRAGMENT_SHADER);
    expect(program1).toBe(program2);
    cache.dispose();
  });

  it('getOrCompile throws with a descriptive error for invalid fragment source', () => {
    const cache = new ShaderCache(gl);
    expect(() => cache.getOrCompile('bad-kernel', INVALID_FRAGMENT_SHADER)).toThrow(
      /Shader compile error/
    );
    cache.dispose();
  });

  it('dispose() does not throw', () => {
    const cache = new ShaderCache(gl);
    cache.getOrCompile('kernel-a', SIMPLE_FRAGMENT_SHADER);
    expect(() => cache.dispose()).not.toThrow();
  });
});
