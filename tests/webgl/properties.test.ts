import * as fc from 'fast-check';
import { WebGLDevice } from '../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../src/typescript/Math/Computation/WebGL/kernels';
import { getKernel } from '../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('WebGL Property-Based Tests', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  // 12.1: Memory round-trip properties

  /**
   * **Validates: Requirements 2.1, 2.2, 2.3**
   */
  describe('Property 1: Memory Round-Trip Consistency (Float32Array)', () => {
    it('set/get round-trip returns identical Float32Array data', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }), { minLength: 1, maxLength: 100 }),
          (values) => {
            const mem = new WebGLMemory(gl, values.length);
            const data = new Float32Array(values);
            mem.set(data);
            const result = mem.get();
            for (let i = 0; i < values.length; i++) {
              if (Math.abs(result[i] - data[i]) > 1e-6) return false;
            }
            mem.free();
            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  /**
   * **Validates: Requirements 2.2, 2.3, 9.1**
   */
  describe('Property 8: Float64 to Float32 Narrowing', () => {
    it('Float64Array data is narrowed to Float32 precision on round-trip', () => {
      fc.assert(
        fc.property(
          fc.array(fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }), { minLength: 1, maxLength: 50 }),
          (values) => {
            const mem = new WebGLMemory(gl, values.length);
            const data = new Float64Array(values);
            mem.set(data);
            const result = mem.get();
            const expected = new Float32Array(data);
            for (let i = 0; i < values.length; i++) {
              if (Math.abs(result[i] - expected[i]) > 1e-6) return false;
            }
            mem.free();
            return true;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // 12.2: Element-wise properties

  /**
   * **Validates: Requirements 3.1, 9.1**
   */
  describe('Property 2: Addition Identity (A + 0 = A)', () => {
    it('adding zero matrix preserves values', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e4, max: 1e4 }), { minLength: 1, maxLength: 50 }),
          (values) => {
            const m = new WebGLMemory(gl, values.length);
            const zeros = new WebGLMemory(gl, values.length);
            m.set(new Float32Array(values));
            zeros.set(new Float32Array(values.length));

            const kernel = getKernel('algebra_add_matrix');
            kernel.executeFn(gl, device, [m, zeros], []);

            const result = m.get();
            const expected = new Float32Array(values);
            for (let i = 0; i < values.length; i++) {
              if (Math.abs(result[i] - expected[i]) > 1e-5) return false;
            }
            m.free();
            zeros.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  /**
   * **Validates: Requirements 3.4, 9.1**
   */
  describe('Property 3: Multiplication Identity (A * 1 = A)', () => {
    it('multiplying by one matrix preserves values', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e4, max: 1e4 }), { minLength: 1, maxLength: 50 }),
          (values) => {
            const m = new WebGLMemory(gl, values.length);
            const ones = new WebGLMemory(gl, values.length);
            const result_dest = new WebGLMemory(gl, values.length);
            m.set(new Float32Array(values));
            ones.set(new Float32Array(values.length).fill(1.0));

            const kernel = getKernel('algebra_multiply');
            kernel.executeFn(gl, device, [m, ones, result_dest], []);

            const result = result_dest.get();
            const expected = new Float32Array(values);
            for (let i = 0; i < values.length; i++) {
              if (Math.abs(result[i] - expected[i]) > 1e-5) return false;
            }
            m.free();
            ones.free();
            result_dest.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  /**
   * **Validates: Requirements 3.1**
   */
  describe('Property 9: Element-wise Addition Commutativity', () => {
    it('add(A, B) == add(B, A)', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e4, max: 1e4 }), { minLength: 1, maxLength: 50 }),
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e4, max: 1e4 }), { minLength: 1, maxLength: 50 }),
          (valuesA, valuesB) => {
            const len = Math.min(valuesA.length, valuesB.length);
            if (len === 0) return true;

            // A + B
            const a1 = new WebGLMemory(gl, len);
            const b1 = new WebGLMemory(gl, len);
            a1.set(new Float32Array(valuesA.slice(0, len)));
            b1.set(new Float32Array(valuesB.slice(0, len)));
            const kernel = getKernel('algebra_add_matrix');
            kernel.executeFn(gl, device, [a1, b1], []);
            const resultAB = a1.get();

            // B + A
            const a2 = new WebGLMemory(gl, len);
            const b2 = new WebGLMemory(gl, len);
            a2.set(new Float32Array(valuesB.slice(0, len)));
            b2.set(new Float32Array(valuesA.slice(0, len)));
            kernel.executeFn(gl, device, [a2, b2], []);
            const resultBA = a2.get();

            for (let i = 0; i < len; i++) {
              if (Math.abs(resultAB[i] - resultBA[i]) > 1e-5) return false;
            }
            a1.free();
            b1.free();
            a2.free();
            b2.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  // 12.3: Matrix operation properties

  /**
   * **Validates: Requirements 4.2**
   */
  describe('Property 5: Transpose Involution', () => {
    it('transpose(transpose(A)) == A', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 8 }),
          fc.integer({ min: 1, max: 8 }),
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -100, max: 100 }), { minLength: 64, maxLength: 64 }),
          (rows, cols, rawValues) => {
            const count = rows * cols;
            const values = rawValues.slice(0, count);
            if (values.length < count) return true; // skip if not enough values

            const m = new WebGLMemory(gl, count);
            m.setWidth(rows);
            m.setHeight(cols);
            m.set(new Float32Array(values));

            // First transpose: rows×cols → cols×rows
            const t1 = new WebGLMemory(gl, count);
            t1.setWidth(cols);
            t1.setHeight(rows);

            const kernel = getKernel('matrix_transpose');
            kernel.executeFn(gl, device, [m, t1], []);

            // Second transpose: cols×rows → rows×cols
            const t2 = new WebGLMemory(gl, count);
            t2.setWidth(rows);
            t2.setHeight(cols);
            kernel.executeFn(gl, device, [t1, t2], []);

            const original = m.get();
            const doubleTranspose = t2.get();

            for (let i = 0; i < count; i++) {
              if (Math.abs(original[i] - doubleTranspose[i]) > 1e-5) return false;
            }

            m.free();
            t1.free();
            t2.free();
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  /**
   * **Validates: Requirements 4.1**
   */
  describe('Property 4: Dot Product Dimension Correctness', () => {
    it('dot(A_MxK, B_KxN) produces M*N elements', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 5 }),
          fc.integer({ min: 1, max: 5 }),
          fc.integer({ min: 1, max: 5 }),
          (M, K, N) => {
            const aCount = M * K;
            const bCount = K * N;
            const cCount = M * N;

            const a = new WebGLMemory(gl, aCount);
            a.setWidth(M);
            a.setHeight(K);
            a.set(new Float32Array(aCount).fill(1.0));

            const b = new WebGLMemory(gl, bCount);
            b.setWidth(K);
            b.setHeight(N);
            b.set(new Float32Array(bCount).fill(1.0));

            const c = new WebGLMemory(gl, cCount);
            c.setWidth(M);
            c.setHeight(N);

            const kernel = getKernel('algebra_dot');
            kernel.executeFn(gl, device, [a, b, c], []);

            const result = c.get();
            // When all elements are 1, each output element should be K
            for (let i = 0; i < cCount; i++) {
              if (Math.abs(result[i] - K) > 1e-3) return false;
            }

            a.free();
            b.free();
            c.free();
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  // 12.4: Reduction properties

  /**
   * **Validates: Requirements 6.1**
   */
  describe('Property 7: Set Zeros Invariant', () => {
    it('setZeros makes all elements exactly 0.0', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 200 }),
          (size) => {
            const m = new WebGLMemory(gl, size);
            // Fill with non-zero values first
            const nonZero = new Float32Array(size).fill(42.0);
            m.set(nonZero);

            const kernel = getKernel('matrix_set_zeros');
            kernel.executeFn(gl, device, [m], []);

            const result = m.get();
            for (let i = 0; i < size; i++) {
              if (result[i] !== 0.0) return false;
            }
            m.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  /**
   * **Validates: Requirements 5.1, 9.3**
   */
  describe('Property 6: Sum Correctness Against CPU', () => {
    it('WebGL sum matches CPU sum within 1e-3 tolerance', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -100, max: 100 }), { minLength: 1, maxLength: 100 }),
          (values) => {
            const data = new Float32Array(values);
            const cpuSum = data.reduce((a, b) => a + b, 0);

            const m = new WebGLMemory(gl, values.length);
            m.set(data);
            const result = new WebGLMemory(gl, 1);

            const kernel = getKernel('algebra_sum');
            kernel.executeFn(gl, device, [m, result], []);

            const gpuSum = result.get()[0];
            const relError = Math.abs(cpuSum) > 1
              ? Math.abs(gpuSum - cpuSum) / Math.abs(cpuSum)
              : Math.abs(gpuSum - cpuSum);

            m.free();
            result.free();
            return relError < 1e-3;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  /**
   * **Validates: Requirements 5.2**
   */
  describe('Property 11: Reduction Max is Upper Bound', () => {
    it('maxCoeff(A) >= every element in A', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -1000, max: 1000 }), { minLength: 1, maxLength: 100 }),
          (values) => {
            const data = new Float32Array(values);

            const m = new WebGLMemory(gl, values.length);
            m.set(data);
            const result = new WebGLMemory(gl, 1);

            const kernel = getKernel('algebra_max_coeff');
            kernel.executeFn(gl, device, [m, result], []);

            const maxVal = result.get()[0];
            for (let i = 0; i < data.length; i++) {
              if (maxVal < data[i] - 1e-5) return false;
            }

            m.free();
            result.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  // 12.5: Activation and loss

  /**
   * **Validates: Requirements 7.3**
   */
  describe('Property: Softmax outputs sum to 1 per column', () => {
    it('column-wise softmax sums to 1.0', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 2, max: 6 }),
          fc.integer({ min: 1, max: 4 }),
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -10, max: 10 }), { minLength: 24, maxLength: 24 }),
          (rows, cols, rawValues) => {
            const count = rows * cols;
            const values = rawValues.slice(0, count);
            if (values.length < count) return true;

            const m = new WebGLMemory(gl, count);
            m.setWidth(rows);
            m.setHeight(cols);
            m.set(new Float32Array(values));

            const kernel = getKernel('algebra_softmax');
            kernel.executeFn(gl, device, [m], []);

            const result = m.get();

            // Verify each column sums to 1 and all values are in [0, 1]
            for (let col = 0; col < cols; col++) {
              let colSum = 0;
              for (let row = 0; row < rows; row++) {
                const val = result[row * cols + col];
                if (val < -1e-6 || val > 1.0 + 1e-6) return false;
                colSum += val;
              }
              if (Math.abs(colSum - 1.0) > 1e-4) return false;
            }

            m.free();
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  /**
   * **Validates: Requirements 7.1**
   */
  describe('Property: Leaky ReLU preserves positive values', () => {
    it('positive values pass through unchanged', () => {
      fc.assert(
        fc.property(
          fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: Math.fround(0.001), max: 1e4 }), { minLength: 1, maxLength: 50 }),
          (values) => {
            const m = new WebGLMemory(gl, values.length);
            const alpha = new WebGLMemory(gl, 1);
            m.set(new Float32Array(values));
            alpha.set(new Float32Array([0.01]));

            const kernel = getKernel('algebra_leaky_relu');
            kernel.executeFn(gl, device, [m, alpha], []);

            const result = m.get();
            const expected = new Float32Array(values);
            for (let i = 0; i < values.length; i++) {
              if (Math.abs(result[i] - expected[i]) > 1e-5) return false;
            }
            m.free();
            alpha.free();
            return true;
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});
