import { WebGLDevice } from '../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { ShaderCache } from '../../src/typescript/Math/Computation/WebGL/ShaderCache';
import { WebGLMemory } from '../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import { WebGLModule } from '../../src/typescript/Math/Computation/WebGL/WebGLModule';

describe('WebGLDevice', () => {
  it('should construct successfully with default parameters', () => {
    expect(() => new WebGLDevice()).not.toThrow();
  });

  it('should construct successfully with custom context dimensions', () => {
    expect(() => new WebGLDevice(2, 2)).not.toThrow();
  });

  it('getGL() returns a valid WebGL context', () => {
    const device = new WebGLDevice();
    const gl = device.getGL();
    expect(gl).toBeDefined();
    // Verify it's a real GL context by checking a known constant
    expect(gl.ARRAY_BUFFER).toBeDefined();
    expect(gl.getParameter(gl.VERSION)).toBeDefined();
  });

  it('getShaderCache() returns a ShaderCache instance', () => {
    const device = new WebGLDevice();
    const cache = device.getShaderCache();
    expect(cache).toBeInstanceOf(ShaderCache);
  });

  it('getQuadBuffer() returns a buffer', () => {
    const device = new WebGLDevice();
    const buffer = device.getQuadBuffer();
    expect(buffer).toBeDefined();
    expect(buffer).not.toBeNull();
  });

  it('isDestroyed() returns false initially', () => {
    const device = new WebGLDevice();
    expect(device.isDestroyed()).toBe(false);
  });

  describe('alloc()', () => {
    it('returns a WebGLMemory instance with correct count', () => {
      const device = new WebGLDevice();
      const mem = device.alloc(16);
      expect(mem).toBeInstanceOf(WebGLMemory);
      expect(mem.count).toBe(16);
    });

    it('returns a memory that can be used for set/get', () => {
      const device = new WebGLDevice();
      const mem = device.alloc(4);
      const data = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      mem.set(data);
      const result = mem.get();
      expect(result[0]).toBeCloseTo(1.0);
      expect(result[1]).toBeCloseTo(2.0);
      expect(result[2]).toBeCloseTo(3.0);
      expect(result[3]).toBeCloseTo(4.0);
    });

    it('throws on count <= 0', () => {
      const device = new WebGLDevice();
      expect(() => device.alloc(0)).toThrow('Allocation count must be positive');
      expect(() => device.alloc(-5)).toThrow('Allocation count must be positive');
    });

    it('throws on destroyed device', () => {
      const device = new WebGLDevice();
      // Access internal destroyed flag via type assertion to simulate destroyed state
      (device as any).destroyed = true;
      expect(() => device.alloc(10)).toThrow('Cannot allocate on destroyed WebGL device');
    });
  });

  describe('loadModule()', () => {
    it('returns a WebGLModule instance', () => {
      const device = new WebGLDevice();
      const mod = device.loadModule('algebra');
      expect(mod).toBeInstanceOf(WebGLModule);
    });

    it('returns a module with the correct name', () => {
      const device = new WebGLDevice();
      const mod = device.loadModule('matrix');
      expect(mod.getModuleName()).toBe('matrix');
    });

    it('returns a module referencing the device', () => {
      const device = new WebGLDevice();
      const mod = device.loadModule('algebra');
      expect(mod.getDevice()).toBe(device);
    });

    it('throws on destroyed device', () => {
      const device = new WebGLDevice();
      device.destroy();
      expect(() => device.loadModule('algebra')).toThrow('Cannot load module on destroyed WebGL device');
    });
  });

  describe('destroy()', () => {
    it('marks the device as destroyed', () => {
      const device = new WebGLDevice();
      expect(device.isDestroyed()).toBe(false);
      device.destroy();
      expect(device.isDestroyed()).toBe(true);
    });

    it('is idempotent (calling destroy twice does not throw)', () => {
      const device = new WebGLDevice();
      device.destroy();
      expect(() => device.destroy()).not.toThrow();
      expect(device.isDestroyed()).toBe(true);
    });

    it('after destroy, alloc() throws', () => {
      const device = new WebGLDevice();
      device.destroy();
      expect(() => device.alloc(10)).toThrow('Cannot allocate on destroyed WebGL device');
    });

    it('after destroy, loadModule() throws', () => {
      const device = new WebGLDevice();
      device.destroy();
      expect(() => device.loadModule('algebra')).toThrow('Cannot load module on destroyed WebGL device');
    });
  });
});
