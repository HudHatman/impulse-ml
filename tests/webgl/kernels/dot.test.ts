import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/dot';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('dot product and related kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('algebra_dot', () => {
    it('should multiply 2×3 × 3×2 matrices to produce a 2×2 result', () => {
      // A (2×3): [[1, 2, 3], [4, 5, 6]]  stored row-major
      const A = new WebGLMemory(gl, 6);
      A.setWidth(2);   // rows
      A.setHeight(3);  // cols
      A.set(new Float32Array([1, 2, 3, 4, 5, 6]));

      // B (3×2): [[7, 8], [9, 10], [11, 12]]  stored row-major
      const B = new WebGLMemory(gl, 6);
      B.setWidth(3);   // rows
      B.setHeight(2);  // cols
      B.set(new Float32Array([7, 8, 9, 10, 11, 12]));

      // Result (2×2)
      const result = new WebGLMemory(gl, 4);
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('algebra_dot');
      kernel.executeFn(gl, device, [A, B, result], []);

      const data = result.get();
      // C[0][0] = 1*7 + 2*9 + 3*11 = 7 + 18 + 33 = 58
      // C[0][1] = 1*8 + 2*10 + 3*12 = 8 + 20 + 36 = 64
      // C[1][0] = 4*7 + 5*9 + 6*11 = 28 + 45 + 66 = 139
      // C[1][1] = 4*8 + 5*10 + 6*12 = 32 + 50 + 72 = 154
      expect(data[0]).toBeCloseTo(58, 3);
      expect(data[1]).toBeCloseTo(64, 3);
      expect(data[2]).toBeCloseTo(139, 3);
      expect(data[3]).toBeCloseTo(154, 3);

      A.free();
      B.free();
      result.free();
    });

    it('should handle identity matrix multiplication', () => {
      // A (2×2): [[3, 4], [5, 6]]
      const A = new WebGLMemory(gl, 4);
      A.setWidth(2);
      A.setHeight(2);
      A.set(new Float32Array([3, 4, 5, 6]));

      // B (2×2): identity [[1, 0], [0, 1]]
      const B = new WebGLMemory(gl, 4);
      B.setWidth(2);
      B.setHeight(2);
      B.set(new Float32Array([1, 0, 0, 1]));

      const result = new WebGLMemory(gl, 4);
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('algebra_dot');
      kernel.executeFn(gl, device, [A, B, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(3, 5);
      expect(data[1]).toBeCloseTo(4, 5);
      expect(data[2]).toBeCloseTo(5, 5);
      expect(data[3]).toBeCloseTo(6, 5);

      A.free();
      B.free();
      result.free();
    });

    it('should handle non-square matrices (1×3 × 3×1 = 1×1)', () => {
      // A (1×3): [2, 3, 4]
      const A = new WebGLMemory(gl, 3);
      A.setWidth(1);
      A.setHeight(3);
      A.set(new Float32Array([2, 3, 4]));

      // B (3×1): [5, 6, 7]
      const B = new WebGLMemory(gl, 3);
      B.setWidth(3);
      B.setHeight(1);
      B.set(new Float32Array([5, 6, 7]));

      // Result (1×1)
      const result = new WebGLMemory(gl, 1);
      result.setWidth(1);
      result.setHeight(1);

      const kernel = getKernel('algebra_dot');
      kernel.executeFn(gl, device, [A, B, result], []);

      const data = result.get();
      // 2*5 + 3*6 + 4*7 = 10 + 18 + 28 = 56
      expect(data[0]).toBeCloseTo(56, 3);

      A.free();
      B.free();
      result.free();
    });
  });

  describe('algebra_rowwise_sum', () => {
    it('should sum each row of a 3×4 matrix into a column vector', () => {
      // M (3×4): [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
      const m = new WebGLMemory(gl, 12);
      m.setWidth(3);   // rows
      m.setHeight(4);  // cols
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));

      // Result (3×1): column vector
      const result = new WebGLMemory(gl, 3);
      result.setWidth(3);
      result.setHeight(1);

      const kernel = getKernel('algebra_rowwise_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      // Row 0: 1+2+3+4 = 10
      // Row 1: 5+6+7+8 = 26
      // Row 2: 9+10+11+12 = 42
      expect(data[0]).toBeCloseTo(10, 3);
      expect(data[1]).toBeCloseTo(26, 3);
      expect(data[2]).toBeCloseTo(42, 3);

      m.free();
      result.free();
    });

    it('should handle a single-row matrix', () => {
      // M (1×4): [[2, 4, 6, 8]]
      const m = new WebGLMemory(gl, 4);
      m.setWidth(1);
      m.setHeight(4);
      m.set(new Float32Array([2, 4, 6, 8]));

      const result = new WebGLMemory(gl, 1);
      result.setWidth(1);
      result.setHeight(1);

      const kernel = getKernel('algebra_rowwise_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      // 2+4+6+8 = 20
      expect(data[0]).toBeCloseTo(20, 3);

      m.free();
      result.free();
    });

    it('should handle negative values', () => {
      // M (2×3): [[-1, 2, -3], [4, -5, 6]]
      const m = new WebGLMemory(gl, 6);
      m.setWidth(2);
      m.setHeight(3);
      m.set(new Float32Array([-1, 2, -3, 4, -5, 6]));

      const result = new WebGLMemory(gl, 2);
      result.setWidth(2);
      result.setHeight(1);

      const kernel = getKernel('algebra_rowwise_sum');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      // Row 0: -1+2+(-3) = -2
      // Row 1: 4+(-5)+6 = 5
      expect(data[0]).toBeCloseTo(-2, 3);
      expect(data[1]).toBeCloseTo(5, 3);

      m.free();
      result.free();
    });
  });

  describe('algebra_forward_propagation', () => {
    it('should compute W×input + b for W(2×3), input(3×2), b(2×1)', () => {
      // W (2×3): [[1, 2, 3], [4, 5, 6]]
      const W = new WebGLMemory(gl, 6);
      W.setWidth(2);   // rows
      W.setHeight(3);  // cols
      W.set(new Float32Array([1, 2, 3, 4, 5, 6]));

      // input (3×2): [[1, 2], [3, 4], [5, 6]]
      const input = new WebGLMemory(gl, 6);
      input.setWidth(3);   // rows
      input.setHeight(2);  // cols
      input.set(new Float32Array([1, 2, 3, 4, 5, 6]));

      // b (2×1): [[10], [20]]
      const b = new WebGLMemory(gl, 2);
      b.setWidth(2);
      b.setHeight(1);
      b.set(new Float32Array([10, 20]));

      // result (2×2)
      const result = new WebGLMemory(gl, 4);
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('algebra_forward_propagation');
      kernel.executeFn(gl, device, [W, input, b, result], []);

      const data = result.get();
      // W×input:
      //   [0][0] = 1*1 + 2*3 + 3*5 = 1+6+15 = 22
      //   [0][1] = 1*2 + 2*4 + 3*6 = 2+8+18 = 28
      //   [1][0] = 4*1 + 5*3 + 6*5 = 4+15+30 = 49
      //   [1][1] = 4*2 + 5*4 + 6*6 = 8+20+36 = 64
      // + b:
      //   [0][0] = 22+10 = 32
      //   [0][1] = 28+10 = 38
      //   [1][0] = 49+20 = 69
      //   [1][1] = 64+20 = 84
      expect(data[0]).toBeCloseTo(32, 3);
      expect(data[1]).toBeCloseTo(38, 3);
      expect(data[2]).toBeCloseTo(69, 3);
      expect(data[3]).toBeCloseTo(84, 3);

      W.free();
      input.free();
      b.free();
      result.free();
    });

    it('should handle zero bias (equivalent to pure dot product)', () => {
      // W (2×2): [[1, 0], [0, 1]] (identity)
      const W = new WebGLMemory(gl, 4);
      W.setWidth(2);
      W.setHeight(2);
      W.set(new Float32Array([1, 0, 0, 1]));

      // input (2×2): [[3, 4], [5, 6]]
      const input = new WebGLMemory(gl, 4);
      input.setWidth(2);
      input.setHeight(2);
      input.set(new Float32Array([3, 4, 5, 6]));

      // b (2×1): [[0], [0]]
      const b = new WebGLMemory(gl, 2);
      b.setWidth(2);
      b.setHeight(1);
      b.set(new Float32Array([0, 0]));

      // result (2×2)
      const result = new WebGLMemory(gl, 4);
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('algebra_forward_propagation');
      kernel.executeFn(gl, device, [W, input, b, result], []);

      const data = result.get();
      // Identity × input = input, + 0 = input
      expect(data[0]).toBeCloseTo(3, 5);
      expect(data[1]).toBeCloseTo(4, 5);
      expect(data[2]).toBeCloseTo(5, 5);
      expect(data[3]).toBeCloseTo(6, 5);

      W.free();
      input.free();
      b.free();
      result.free();
    });

    it('should handle negative weights and bias', () => {
      // W (1×2): [[-1, 2]]
      const W = new WebGLMemory(gl, 2);
      W.setWidth(1);
      W.setHeight(2);
      W.set(new Float32Array([-1, 2]));

      // input (2×1): [[3], [4]]
      const input = new WebGLMemory(gl, 2);
      input.setWidth(2);
      input.setHeight(1);
      input.set(new Float32Array([3, 4]));

      // b (1×1): [[-5]]
      const b = new WebGLMemory(gl, 1);
      b.setWidth(1);
      b.setHeight(1);
      b.set(new Float32Array([-5]));

      // result (1×1)
      const result = new WebGLMemory(gl, 1);
      result.setWidth(1);
      result.setHeight(1);

      const kernel = getKernel('algebra_forward_propagation');
      kernel.executeFn(gl, device, [W, input, b, result], []);

      const data = result.get();
      // W×input = (-1)*3 + 2*4 = -3 + 8 = 5
      // + b = 5 + (-5) = 0
      expect(data[0]).toBeCloseTo(0, 5);

      W.free();
      input.free();
      b.free();
      result.free();
    });
  });
});
