import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/reduction';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('reduction kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('algebra_sum', () => {
    it('should compute sum of [1, 2, 3, 4] = 10', () => {
      const m = new WebGLMemory(gl, 4);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(10.0, 5);

      m.free();
      result.free();
    });

    it('should compute sum of [1, 2, 3, 4, 5] = 15 (odd count)', () => {
      const m = new WebGLMemory(gl, 5);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(15.0, 5);

      m.free();
      result.free();
    });

    it('should compute sum of single element [42] = 42', () => {
      const m = new WebGLMemory(gl, 1);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([42.0]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(42.0, 5);

      m.free();
      result.free();
    });
  });

  describe('algebra_max_coeff', () => {
    it('should find max of [1, 5, 3, 2, 4] = 5', () => {
      const m = new WebGLMemory(gl, 5);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([1.0, 5.0, 3.0, 2.0, 4.0]));

      const kernel = getKernel('algebra_max_coeff');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(5.0, 5);

      m.free();
      result.free();
    });

    it('should find max of [-10, -5, -1, -20] = -1 (all negative)', () => {
      const m = new WebGLMemory(gl, 4);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([-10.0, -5.0, -1.0, -20.0]));

      const kernel = getKernel('algebra_max_coeff');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(-1.0, 5);

      m.free();
      result.free();
    });

    it('should find max of single element [7] = 7', () => {
      const m = new WebGLMemory(gl, 1);
      const result = new WebGLMemory(gl, 1);
      m.set(new Float32Array([7.0]));

      const kernel = getKernel('algebra_max_coeff');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(7.0, 5);

      m.free();
      result.free();
    });
  });
});
