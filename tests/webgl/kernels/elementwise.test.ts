import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/elementwise';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('elementwise kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('algebra_add_matrix', () => {
    it('should add two matrices element-wise in-place on the first input', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
      n.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));

      const kernel = getKernel('algebra_add_matrix');
      kernel.executeFn(gl, device, [m, n], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(11.0, 5);
      expect(result[1]).toBeCloseTo(22.0, 5);
      expect(result[2]).toBeCloseTo(33.0, 5);
      expect(result[3]).toBeCloseTo(44.0, 5);

      m.free();
      n.free();
    });

    it('should handle adding zeros (identity operation)', () => {
      const m = new WebGLMemory(gl, 3);
      const zeros = new WebGLMemory(gl, 3);
      m.set(new Float32Array([5.5, -3.25, 100.0]));
      zeros.set(new Float32Array([0.0, 0.0, 0.0]));

      const kernel = getKernel('algebra_add_matrix');
      kernel.executeFn(gl, device, [m, zeros], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(5.5, 5);
      expect(result[1]).toBeCloseTo(-3.25, 5);
      expect(result[2]).toBeCloseTo(100.0, 5);

      m.free();
      zeros.free();
    });

    it('should handle negative values', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      m.set(new Float32Array([1.0, -2.0, 3.0, -4.0]));
      n.set(new Float32Array([-1.0, 2.0, -3.0, 4.0]));

      const kernel = getKernel('algebra_add_matrix');
      kernel.executeFn(gl, device, [m, n], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(0.0, 5);
      expect(result[1]).toBeCloseTo(0.0, 5);
      expect(result[2]).toBeCloseTo(0.0, 5);
      expect(result[3]).toBeCloseTo(0.0, 5);

      m.free();
      n.free();
    });
  });

  describe('algebra_add_number', () => {
    it('should add a scalar to every element of a matrix in-place', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
      scalar.set(new Float32Array([10.0]));

      const kernel = getKernel('algebra_add_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(11.0, 5);
      expect(result[1]).toBeCloseTo(12.0, 5);
      expect(result[2]).toBeCloseTo(13.0, 5);
      expect(result[3]).toBeCloseTo(14.0, 5);

      m.free();
      scalar.free();
    });

    it('should handle adding zero scalar (identity operation)', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([7.5, -2.0, 99.9]));
      scalar.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_add_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(7.5, 5);
      expect(result[1]).toBeCloseTo(-2.0, 5);
      expect(result[2]).toBeCloseTo(99.9, 4);

      m.free();
      scalar.free();
    });

    it('should handle negative scalar', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
      scalar.set(new Float32Array([-5.0]));

      const kernel = getKernel('algebra_add_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(5.0, 5);
      expect(result[1]).toBeCloseTo(15.0, 5);
      expect(result[2]).toBeCloseTo(25.0, 5);
      expect(result[3]).toBeCloseTo(35.0, 5);

      m.free();
      scalar.free();
    });
  });

  describe('algebra_subtract', () => {
    it('should subtract two matrices element-wise into result destination', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
      n.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));

      const kernel = getKernel('algebra_subtract');
      kernel.executeFn(gl, device, [m, n, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(9.0, 5);
      expect(result[1]).toBeCloseTo(18.0, 5);
      expect(result[2]).toBeCloseTo(27.0, 5);
      expect(result[3]).toBeCloseTo(36.0, 5);

      m.free();
      n.free();
      result_dest.free();
    });

    it('should handle subtraction resulting in negative values', () => {
      const m = new WebGLMemory(gl, 3);
      const n = new WebGLMemory(gl, 3);
      const result_dest = new WebGLMemory(gl, 3);
      m.set(new Float32Array([1.0, 2.0, 3.0]));
      n.set(new Float32Array([5.0, 5.0, 5.0]));

      const kernel = getKernel('algebra_subtract');
      kernel.executeFn(gl, device, [m, n, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(-4.0, 5);
      expect(result[1]).toBeCloseTo(-3.0, 5);
      expect(result[2]).toBeCloseTo(-2.0, 5);

      m.free();
      n.free();
      result_dest.free();
    });

    it('should not modify the original input matrices', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
      n.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));

      const kernel = getKernel('algebra_subtract');
      kernel.executeFn(gl, device, [m, n, result_dest], []);

      const mData = m.get();
      expect(mData[0]).toBeCloseTo(10.0, 5);
      expect(mData[1]).toBeCloseTo(20.0, 5);

      const nData = n.get();
      expect(nData[0]).toBeCloseTo(1.0, 5);
      expect(nData[1]).toBeCloseTo(2.0, 5);

      m.free();
      n.free();
      result_dest.free();
    });
  });

  describe('algebra_multiply', () => {
    it('should multiply two matrices element-wise into result destination', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([2.0, 3.0, 4.0, 5.0]));
      n.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));

      const kernel = getKernel('algebra_multiply');
      kernel.executeFn(gl, device, [m, n, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(20.0, 5);
      expect(result[1]).toBeCloseTo(60.0, 5);
      expect(result[2]).toBeCloseTo(120.0, 5);
      expect(result[3]).toBeCloseTo(200.0, 5);

      m.free();
      n.free();
      result_dest.free();
    });

    it('should handle multiplication with negative values', () => {
      const m = new WebGLMemory(gl, 3);
      const n = new WebGLMemory(gl, 3);
      const result_dest = new WebGLMemory(gl, 3);
      m.set(new Float32Array([-2.0, 3.0, -4.0]));
      n.set(new Float32Array([5.0, -2.0, -3.0]));

      const kernel = getKernel('algebra_multiply');
      kernel.executeFn(gl, device, [m, n, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(-10.0, 5);
      expect(result[1]).toBeCloseTo(-6.0, 5);
      expect(result[2]).toBeCloseTo(12.0, 5);

      m.free();
      n.free();
      result_dest.free();
    });

    it('should handle multiplication by zeros', () => {
      const m = new WebGLMemory(gl, 4);
      const zeros = new WebGLMemory(gl, 4);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([5.0, 10.0, 15.0, 20.0]));
      zeros.set(new Float32Array([0.0, 0.0, 0.0, 0.0]));

      const kernel = getKernel('algebra_multiply');
      kernel.executeFn(gl, device, [m, zeros, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(0.0, 5);
      expect(result[1]).toBeCloseTo(0.0, 5);
      expect(result[2]).toBeCloseTo(0.0, 5);
      expect(result[3]).toBeCloseTo(0.0, 5);

      m.free();
      zeros.free();
      result_dest.free();
    });
  });

  describe('algebra_multiply_number', () => {
    it('should multiply every element by a scalar into result destination', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
      scalar.set(new Float32Array([3.0]));

      const kernel = getKernel('algebra_multiply_number');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(3.0, 5);
      expect(result[1]).toBeCloseTo(6.0, 5);
      expect(result[2]).toBeCloseTo(9.0, 5);
      expect(result[3]).toBeCloseTo(12.0, 5);

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should handle multiplication by zero scalar', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 3);
      m.set(new Float32Array([7.0, -3.0, 100.0]));
      scalar.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_multiply_number');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(0.0, 5);
      expect(result[1]).toBeCloseTo(0.0, 5);
      expect(result[2]).toBeCloseTo(0.0, 5);

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should handle multiplication by negative scalar', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([2.0, 4.0, 6.0, 8.0]));
      scalar.set(new Float32Array([-0.5]));

      const kernel = getKernel('algebra_multiply_number');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(-1.0, 5);
      expect(result[1]).toBeCloseTo(-2.0, 5);
      expect(result[2]).toBeCloseTo(-3.0, 5);
      expect(result[3]).toBeCloseTo(-4.0, 5);

      m.free();
      scalar.free();
      result_dest.free();
    });
  });

  describe('algebra_divide_matrix', () => {
    it('should divide two matrices element-wise in-place on the first input', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      m.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
      n.set(new Float32Array([2.0, 4.0, 5.0, 8.0]));

      const kernel = getKernel('algebra_divide_matrix');
      kernel.executeFn(gl, device, [m, n], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(5.0, 5);
      expect(result[1]).toBeCloseTo(5.0, 5);
      expect(result[2]).toBeCloseTo(6.0, 5);
      expect(result[3]).toBeCloseTo(5.0, 5);

      m.free();
      n.free();
    });

    it('should handle division with fractional results', () => {
      const m = new WebGLMemory(gl, 3);
      const n = new WebGLMemory(gl, 3);
      m.set(new Float32Array([1.0, 2.0, 3.0]));
      n.set(new Float32Array([4.0, 4.0, 4.0]));

      const kernel = getKernel('algebra_divide_matrix');
      kernel.executeFn(gl, device, [m, n], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(0.25, 5);
      expect(result[1]).toBeCloseTo(0.5, 5);
      expect(result[2]).toBeCloseTo(0.75, 5);

      m.free();
      n.free();
    });

    it('should handle division with negative values', () => {
      const m = new WebGLMemory(gl, 4);
      const n = new WebGLMemory(gl, 4);
      m.set(new Float32Array([-10.0, 20.0, -30.0, 40.0]));
      n.set(new Float32Array([2.0, -4.0, -5.0, 8.0]));

      const kernel = getKernel('algebra_divide_matrix');
      kernel.executeFn(gl, device, [m, n], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(-5.0, 5);
      expect(result[1]).toBeCloseTo(-5.0, 5);
      expect(result[2]).toBeCloseTo(6.0, 5);
      expect(result[3]).toBeCloseTo(5.0, 5);

      m.free();
      n.free();
    });
  });

  describe('algebra_divide_number', () => {
    it('should divide every element by a scalar in-place', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
      scalar.set(new Float32Array([5.0]));

      const kernel = getKernel('algebra_divide_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(2.0, 5);
      expect(result[1]).toBeCloseTo(4.0, 5);
      expect(result[2]).toBeCloseTo(6.0, 5);
      expect(result[3]).toBeCloseTo(8.0, 5);

      m.free();
      scalar.free();
    });

    it('should handle division by negative scalar', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([10.0, -20.0, 30.0]));
      scalar.set(new Float32Array([-2.0]));

      const kernel = getKernel('algebra_divide_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(-5.0, 5);
      expect(result[1]).toBeCloseTo(10.0, 5);
      expect(result[2]).toBeCloseTo(-15.0, 5);

      m.free();
      scalar.free();
    });

    it('should handle division resulting in fractional values', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
      scalar.set(new Float32Array([3.0]));

      const kernel = getKernel('algebra_divide_number');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(1.0 / 3.0, 4);
      expect(result[1]).toBeCloseTo(2.0 / 3.0, 4);
      expect(result[2]).toBeCloseTo(1.0, 5);
      expect(result[3]).toBeCloseTo(4.0 / 3.0, 4);

      m.free();
      scalar.free();
    });
  });

  describe('algebra_pow', () => {
    it('should raise every element to a power in-place', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([2.0, 3.0, 4.0, 5.0]));
      scalar.set(new Float32Array([2.0]));

      const kernel = getKernel('algebra_pow');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(4.0, 5);
      expect(result[1]).toBeCloseTo(9.0, 5);
      expect(result[2]).toBeCloseTo(16.0, 5);
      expect(result[3]).toBeCloseTo(25.0, 5);

      m.free();
      scalar.free();
    });

    it('should handle power of 1 (identity)', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([5.0, 10.0, 15.0]));
      scalar.set(new Float32Array([1.0]));

      const kernel = getKernel('algebra_pow');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(5.0, 5);
      expect(result[1]).toBeCloseTo(10.0, 5);
      expect(result[2]).toBeCloseTo(15.0, 5);

      m.free();
      scalar.free();
    });

    it('should handle power of 0.5 (square root)', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([4.0, 9.0, 16.0, 25.0]));
      scalar.set(new Float32Array([0.5]));

      const kernel = getKernel('algebra_pow');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(2.0, 5);
      expect(result[1]).toBeCloseTo(3.0, 5);
      expect(result[2]).toBeCloseTo(4.0, 5);
      expect(result[3]).toBeCloseTo(5.0, 5);

      m.free();
      scalar.free();
    });
  });

  describe('matrix_set_min', () => {
    it('should clamp values below threshold upward', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([-5.0, 0.0, 3.0, 10.0]));
      scalar.set(new Float32Array([2.0])); // min threshold

      const kernel = getKernel('matrix_set_min');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      // max(element, 2.0): values below 2 are raised to 2
      expect(result[0]).toBeCloseTo(2.0, 5);  // max(-5, 2) = 2
      expect(result[1]).toBeCloseTo(2.0, 5);  // max(0, 2) = 2
      expect(result[2]).toBeCloseTo(3.0, 5);  // max(3, 2) = 3
      expect(result[3]).toBeCloseTo(10.0, 5); // max(10, 2) = 10

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should leave all values unchanged when all are above threshold', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 3);
      m.set(new Float32Array([5.0, 10.0, 15.0]));
      scalar.set(new Float32Array([1.0])); // all values already above 1

      const kernel = getKernel('matrix_set_min');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(5.0, 5);
      expect(result[1]).toBeCloseTo(10.0, 5);
      expect(result[2]).toBeCloseTo(15.0, 5);

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should handle negative threshold', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([-10.0, -3.0, -1.0, 5.0]));
      scalar.set(new Float32Array([-2.0])); // min threshold of -2

      const kernel = getKernel('matrix_set_min');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(-2.0, 5);  // max(-10, -2) = -2
      expect(result[1]).toBeCloseTo(-2.0, 5);  // max(-3, -2) = -2
      expect(result[2]).toBeCloseTo(-1.0, 5);  // max(-1, -2) = -1
      expect(result[3]).toBeCloseTo(5.0, 5);   // max(5, -2) = 5

      m.free();
      scalar.free();
      result_dest.free();
    });
  });

  describe('matrix_set_max', () => {
    it('should clamp values above threshold downward', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([-5.0, 0.0, 3.0, 10.0]));
      scalar.set(new Float32Array([5.0])); // max threshold

      const kernel = getKernel('matrix_set_max');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      // min(element, 5.0): values above 5 are lowered to 5
      expect(result[0]).toBeCloseTo(-5.0, 5); // min(-5, 5) = -5
      expect(result[1]).toBeCloseTo(0.0, 5);  // min(0, 5) = 0
      expect(result[2]).toBeCloseTo(3.0, 5);  // min(3, 5) = 3
      expect(result[3]).toBeCloseTo(5.0, 5);  // min(10, 5) = 5

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should leave all values unchanged when all are below threshold', () => {
      const m = new WebGLMemory(gl, 3);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 3);
      m.set(new Float32Array([1.0, 2.0, 3.0]));
      scalar.set(new Float32Array([100.0])); // all values already below 100

      const kernel = getKernel('matrix_set_max');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(1.0, 5);
      expect(result[1]).toBeCloseTo(2.0, 5);
      expect(result[2]).toBeCloseTo(3.0, 5);

      m.free();
      scalar.free();
      result_dest.free();
    });

    it('should handle negative threshold', () => {
      const m = new WebGLMemory(gl, 4);
      const scalar = new WebGLMemory(gl, 1);
      const result_dest = new WebGLMemory(gl, 4);
      m.set(new Float32Array([-10.0, -3.0, -1.0, 5.0]));
      scalar.set(new Float32Array([-2.0])); // max threshold of -2

      const kernel = getKernel('matrix_set_max');
      kernel.executeFn(gl, device, [m, scalar, result_dest], []);

      const result = result_dest.get();
      expect(result[0]).toBeCloseTo(-10.0, 5); // min(-10, -2) = -10
      expect(result[1]).toBeCloseTo(-3.0, 5);  // min(-3, -2) = -3
      expect(result[2]).toBeCloseTo(-2.0, 5);  // min(-1, -2) = -2
      expect(result[3]).toBeCloseTo(-2.0, 5);  // min(5, -2) = -2

      m.free();
      scalar.free();
      result_dest.free();
    });
  });
});
