import createContext from 'gl';
import { WebGLMemory, computeTextureDimensions } from '../../src/typescript/Math/Computation/WebGL/WebGLMemory';

describe('computeTextureDimensions', () => {
  it('should return correct dimensions for small counts', () => {
    const result = computeTextureDimensions(10);
    expect(result.texWidth).toBe(10);
    expect(result.texHeight).toBe(1);
  });

  it('should clamp width to maxWidth (4096) for large counts', () => {
    const result = computeTextureDimensions(8192);
    expect(result.texWidth).toBe(4096);
    expect(result.texHeight).toBe(2);
  });

  it('should handle counts exactly at maxWidth', () => {
    const result = computeTextureDimensions(4096);
    expect(result.texWidth).toBe(4096);
    expect(result.texHeight).toBe(1);
  });

  it('should ceil texHeight for non-evenly-divisible counts', () => {
    const result = computeTextureDimensions(4097);
    expect(result.texWidth).toBe(4096);
    expect(result.texHeight).toBe(2);
  });

  it('should handle count of 1', () => {
    const result = computeTextureDimensions(1);
    expect(result.texWidth).toBe(1);
    expect(result.texHeight).toBe(1);
  });
});

describe('WebGLMemory', () => {
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    gl = createContext(1, 1) as unknown as WebGLRenderingContext;
    gl.getExtension('OES_texture_float');
  });

  it('should construct with correct properties', () => {
    const mem = new WebGLMemory(gl, 100);
    expect(mem.count).toBe(100);
    expect(mem.texWidth).toBe(100);
    expect(mem.texHeight).toBe(1);
    expect(mem.texture).toBeDefined();
    expect(mem.framebuffer).toBeDefined();
    expect(mem.freed).toBe(false);
  });

  it('should compute correct dimensions for large allocations', () => {
    const mem = new WebGLMemory(gl, 5000);
    expect(mem.count).toBe(5000);
    expect(mem.texWidth).toBe(4096);
    expect(mem.texHeight).toBe(2);
  });

  it('should initialize width, height, depth to 0', () => {
    const mem = new WebGLMemory(gl, 10);
    expect(mem.width).toBe(0);
    expect(mem.height).toBe(0);
    expect(mem.depth).toBe(0);
  });

  it('should allow setting logical dimensions', () => {
    const mem = new WebGLMemory(gl, 12);
    mem.setWidth(3);
    mem.setHeight(4);
    mem.setDepth(1);
    expect(mem.width).toBe(3);
    expect(mem.height).toBe(4);
    expect(mem.depth).toBe(1);
  });

  it('should expose the gl context', () => {
    const mem = new WebGLMemory(gl, 5);
    expect(mem.gl).toBe(gl);
  });

  it('should handle count of 1 correctly', () => {
    const mem = new WebGLMemory(gl, 1);
    expect(mem.texWidth).toBe(1);
    expect(mem.texHeight).toBe(1);
    expect(mem.count).toBe(1);
  });

  describe('set()', () => {
    it('should not throw when called with Float32Array', () => {
      const mem = new WebGLMemory(gl, 4);
      const data = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      expect(() => mem.set(data)).not.toThrow();
    });

    it('should not throw when called with Float64Array', () => {
      const mem = new WebGLMemory(gl, 4);
      const data = new Float64Array([1.0, 2.0, 3.0, 4.0]);
      expect(() => mem.set(data)).not.toThrow();
    });

    it('should not throw when called with a regular number array', () => {
      const mem = new WebGLMemory(gl, 3);
      expect(() => mem.set([5.5, 6.6, 7.7])).not.toThrow();
    });

    it('should return this for method chaining', () => {
      const mem = new WebGLMemory(gl, 2);
      const result = mem.set(new Float32Array([1.0, 2.0]));
      expect(result).toBe(mem);
    });

    it('should throw on freed memory', () => {
      const mem = new WebGLMemory(gl, 4);
      // Manually set freed state for testing guard
      (mem as any)._freed = true;
      expect(() => mem.set(new Float32Array([1, 2, 3, 4]))).toThrow('Operation on freed WebGL memory');
    });
  });

  describe('get()', () => {
    it('should round-trip Float32Array values correctly', () => {
      const mem = new WebGLMemory(gl, 4);
      const data = new Float32Array([1.5, -2.25, 3.75, 0.0]);
      mem.set(data);
      const result = mem.get();
      expect(result).toBeInstanceOf(Float32Array);
      expect(result.length).toBe(4);
      for (let i = 0; i < data.length; i++) {
        expect(result[i]).toBeCloseTo(data[i], 5);
      }
    });

    it('should round-trip Float64Array values narrowed to Float32 precision', () => {
      const mem = new WebGLMemory(gl, 4);
      const data = new Float64Array([1.1234567890123456, -2.9876543210987654, 0.00001, 999999.999]);
      mem.set(data);
      const result = mem.get();
      const expected = new Float32Array(data);
      expect(result).toBeInstanceOf(Float32Array);
      expect(result.length).toBe(4);
      for (let i = 0; i < expected.length; i++) {
        expect(result[i]).toBeCloseTo(expected[i], 5);
      }
    });

    it('should round-trip number[] values correctly', () => {
      const mem = new WebGLMemory(gl, 5);
      const data = [10.5, -20.25, 0, 100.125, -0.5];
      mem.set(data);
      const result = mem.get();
      const expected = new Float32Array(data);
      expect(result).toBeInstanceOf(Float32Array);
      expect(result.length).toBe(5);
      for (let i = 0; i < expected.length; i++) {
        expect(result[i]).toBeCloseTo(expected[i], 5);
      }
    });

    it('should throw on freed memory', () => {
      const mem = new WebGLMemory(gl, 4);
      (mem as any)._freed = true;
      expect(() => mem.get()).toThrow('Operation on freed WebGL memory');
    });

    it('should return correct length for single element', () => {
      const mem = new WebGLMemory(gl, 1);
      mem.set(new Float32Array([42.0]));
      const result = mem.get();
      expect(result.length).toBe(1);
      expect(result[0]).toBeCloseTo(42.0, 5);
    });
  });

  describe('free()', () => {
    it('should cause get() to throw after freeing', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.set(new Float32Array([1, 2, 3, 4]));
      mem.free();
      expect(() => mem.get()).toThrow('Operation on freed WebGL memory');
    });

    it('should cause set() to throw after freeing', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.free();
      expect(() => mem.set(new Float32Array([1, 2, 3, 4]))).toThrow('Operation on freed WebGL memory');
    });

    it('should be idempotent — calling twice does not throw', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.free();
      expect(() => mem.free()).not.toThrow();
      expect(mem.freed).toBe(true);
    });

    it('should set freed property to true', () => {
      const mem = new WebGLMemory(gl, 4);
      expect(mem.freed).toBe(false);
      mem.free();
      expect(mem.freed).toBe(true);
    });
  });

  describe('copyFrom()', () => {
    it('should copy data from another WebGLMemory', () => {
      const src = new WebGLMemory(gl, 4);
      const dst = new WebGLMemory(gl, 4);
      const data = new Float32Array([10.5, -20.25, 0.0, 100.125]);
      src.set(data);
      dst.copyFrom(src);
      const result = dst.get();
      expect(result.length).toBe(4);
      for (let i = 0; i < data.length; i++) {
        expect(result[i]).toBeCloseTo(data[i], 5);
      }
    });

    it('should copy logical dimensions from source', () => {
      const src = new WebGLMemory(gl, 6);
      src.setWidth(2);
      src.setHeight(3);
      src.setDepth(1);
      src.set(new Float32Array([1, 2, 3, 4, 5, 6]));

      const dst = new WebGLMemory(gl, 6);
      dst.copyFrom(src);
      expect(dst.width).toBe(2);
      expect(dst.height).toBe(3);
      expect(dst.depth).toBe(1);
    });

    it('should throw when called on freed memory', () => {
      const src = new WebGLMemory(gl, 4);
      src.set(new Float32Array([1, 2, 3, 4]));
      const dst = new WebGLMemory(gl, 4);
      dst.free();
      expect(() => dst.copyFrom(src)).toThrow('Operation on freed WebGL memory');
    });
  });

  describe('setWidth/setHeight/setDepth freed guard', () => {
    it('should throw on setWidth when memory is freed', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.free();
      expect(() => mem.setWidth(2)).toThrow('Operation on freed WebGL memory');
    });

    it('should throw on setHeight when memory is freed', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.free();
      expect(() => mem.setHeight(2)).toThrow('Operation on freed WebGL memory');
    });

    it('should throw on setDepth when memory is freed', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.free();
      expect(() => mem.setDepth(1)).toThrow('Operation on freed WebGL memory');
    });
  });

  describe('clone()', () => {
    it('should return a new instance with same data', () => {
      const mem = new WebGLMemory(gl, 4);
      const data = new Float32Array([1.5, -2.5, 3.0, 4.25]);
      mem.set(data);
      mem.setWidth(2);
      mem.setHeight(2);
      mem.setDepth(1);

      const cloned = mem.clone();
      expect(cloned).not.toBe(mem);
      expect(cloned.count).toBe(4);
      expect(cloned.width).toBe(2);
      expect(cloned.height).toBe(2);
      expect(cloned.depth).toBe(1);

      const result = cloned.get();
      for (let i = 0; i < data.length; i++) {
        expect(result[i]).toBeCloseTo(data[i], 5);
      }
    });

    it('should produce an independent copy (modifying clone does not affect original)', () => {
      const mem = new WebGLMemory(gl, 3);
      mem.set(new Float32Array([10, 20, 30]));

      const cloned = mem.clone();
      cloned.set(new Float32Array([99, 99, 99]));

      const original = mem.get();
      expect(original[0]).toBeCloseTo(10, 5);
      expect(original[1]).toBeCloseTo(20, 5);
      expect(original[2]).toBeCloseTo(30, 5);
    });

    it('should throw on freed memory', () => {
      const mem = new WebGLMemory(gl, 4);
      mem.set(new Float32Array([1, 2, 3, 4]));
      mem.free();
      expect(() => mem.clone()).toThrow('Operation on freed WebGL memory');
    });
  });
});
