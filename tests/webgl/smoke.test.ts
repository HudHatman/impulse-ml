import createContext from 'gl';

describe('WebGL smoke test', () => {
  it('should create a headless WebGL context', () => {
    const gl = createContext(1, 1);
    expect(gl).toBeDefined();
    expect(gl.getExtension('OES_texture_float')).not.toBeNull();
  });
});
