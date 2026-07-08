import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/matrix';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('matrix utility kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('matrix_set_zeros', () => {
    it('should set all elements to zero in-place', () => {
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]));

      const kernel = getKernel('matrix_set_zeros');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();
      for (let i = 0; i < 6; i++) {
        expect(result[i]).toBe(0.0);
      }

      m.free();
    });

    it('should handle single-element matrix', () => {
      const m = new WebGLMemory(gl, 1);
      m.set(new Float32Array([42.0]));

      const kernel = getKernel('matrix_set_zeros');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();
      expect(result[0]).toBe(0.0);

      m.free();
    });

    it('should handle already-zeroed matrix', () => {
      const m = new WebGLMemory(gl, 4);
      m.set(new Float32Array([0.0, 0.0, 0.0, 0.0]));

      const kernel = getKernel('matrix_set_zeros');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();
      for (let i = 0; i < 4; i++) {
        expect(result[i]).toBe(0.0);
      }

      m.free();
    });
  });

  describe('matrix_set_random', () => {
    it('should fill matrix with random values scaled by scalar', () => {
      const m = new WebGLMemory(gl, 100);
      m.set(new Float32Array(100)); // start with zeros
      const scalar = new WebGLMemory(gl, 1);
      scalar.set(new Float32Array([2.0]));

      const kernel = getKernel('matrix_set_random');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      // All values should be in [-2, 2]
      for (let i = 0; i < 100; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(-2.0);
        expect(result[i]).toBeLessThanOrEqual(2.0);
      }
      // At least some non-zero values (extremely unlikely all zero)
      const hasNonZero = Array.from(result).some((v) => v !== 0.0);
      expect(hasNonZero).toBe(true);

      m.free();
      scalar.free();
    });

    it('should respect the scale factor', () => {
      const m = new WebGLMemory(gl, 50);
      const scalar = new WebGLMemory(gl, 1);
      scalar.set(new Float32Array([0.5]));

      const kernel = getKernel('matrix_set_random');
      kernel.executeFn(gl, device, [m, scalar], []);

      const result = m.get();
      for (let i = 0; i < 50; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(-0.5);
        expect(result[i]).toBeLessThanOrEqual(0.5);
      }

      m.free();
      scalar.free();
    });

    it('should produce different values on successive calls', () => {
      const m1 = new WebGLMemory(gl, 20);
      const m2 = new WebGLMemory(gl, 20);
      const scalar = new WebGLMemory(gl, 1);
      scalar.set(new Float32Array([1.0]));

      const kernel = getKernel('matrix_set_random');
      kernel.executeFn(gl, device, [m1, scalar], []);
      kernel.executeFn(gl, device, [m2, scalar], []);

      const r1 = m1.get();
      const r2 = m2.get();
      // Extremely unlikely to be identical
      const allSame = Array.from(r1).every((v, i) => v === r2[i]);
      expect(allSame).toBe(false);

      m1.free();
      m2.free();
      scalar.free();
    });
  });

  describe('matrix_transpose', () => {
    it('should transpose a 2x3 matrix to a 3x2 matrix', () => {
      // Input: 2 rows x 3 cols = [1,2,3, 4,5,6]
      // Row 0: [1, 2, 3], Row 1: [4, 5, 6]
      // Transposed (3 rows x 2 cols): [1,4, 2,5, 3,6]
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6]));
      m.setWidth(2);  // rows
      m.setHeight(3); // cols

      const result = new WebGLMemory(gl, 6);
      result.setWidth(3);  // rows (cols of input)
      result.setHeight(2); // cols (rows of input)

      const kernel = getKernel('matrix_transpose');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      // Expected: [1,4, 2,5, 3,6]
      expect(data[0]).toBeCloseTo(1.0, 5);
      expect(data[1]).toBeCloseTo(4.0, 5);
      expect(data[2]).toBeCloseTo(2.0, 5);
      expect(data[3]).toBeCloseTo(5.0, 5);
      expect(data[4]).toBeCloseTo(3.0, 5);
      expect(data[5]).toBeCloseTo(6.0, 5);

      m.free();
      result.free();
    });

    it('should transpose a 3x2 matrix to a 2x3 matrix', () => {
      // Input: 3 rows x 2 cols = [1,2, 3,4, 5,6]
      // Transposed (2 rows x 3 cols): [1,3,5, 2,4,6]
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6]));
      m.setWidth(3);  // rows
      m.setHeight(2); // cols

      const result = new WebGLMemory(gl, 6);
      result.setWidth(2);  // rows
      result.setHeight(3); // cols

      const kernel = getKernel('matrix_transpose');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      // Expected: [1,3,5, 2,4,6]
      expect(data[0]).toBeCloseTo(1.0, 5);
      expect(data[1]).toBeCloseTo(3.0, 5);
      expect(data[2]).toBeCloseTo(5.0, 5);
      expect(data[3]).toBeCloseTo(2.0, 5);
      expect(data[4]).toBeCloseTo(4.0, 5);
      expect(data[5]).toBeCloseTo(6.0, 5);

      m.free();
      result.free();
    });

    it('should transpose a 1x4 row vector to a 4x1 column vector', () => {
      const m = new WebGLMemory(gl, 4);
      m.set(new Float32Array([10, 20, 30, 40]));
      m.setWidth(1);  // 1 row
      m.setHeight(4); // 4 cols

      const result = new WebGLMemory(gl, 4);
      result.setWidth(4);  // 4 rows
      result.setHeight(1); // 1 col

      const kernel = getKernel('matrix_transpose');
      kernel.executeFn(gl, device, [m, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(10.0, 5);
      expect(data[1]).toBeCloseTo(20.0, 5);
      expect(data[2]).toBeCloseTo(30.0, 5);
      expect(data[3]).toBeCloseTo(40.0, 5);

      m.free();
      result.free();
    });
  });

  describe('matrix_row', () => {
    it('should extract a specific row from a matrix', () => {
      // 3x4 matrix (3 rows, 4 cols)
      // Row 0: [1, 2, 3, 4]
      // Row 1: [5, 6, 7, 8]
      // Row 2: [9, 10, 11, 12]
      const m = new WebGLMemory(gl, 12);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
      m.setWidth(3);  // rows
      m.setHeight(4); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([1])); // extract row 1

      const result = new WebGLMemory(gl, 4); // 1 row x 4 cols
      result.setWidth(1);
      result.setHeight(4);

      const kernel = getKernel('matrix_row');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(5.0, 5);
      expect(data[1]).toBeCloseTo(6.0, 5);
      expect(data[2]).toBeCloseTo(7.0, 5);
      expect(data[3]).toBeCloseTo(8.0, 5);

      m.free();
      indexScalar.free();
      result.free();
    });

    it('should extract the first row', () => {
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([10, 20, 30, 40, 50, 60]));
      m.setWidth(2);  // rows
      m.setHeight(3); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([0])); // first row

      const result = new WebGLMemory(gl, 3);
      result.setWidth(1);
      result.setHeight(3);

      const kernel = getKernel('matrix_row');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(10.0, 5);
      expect(data[1]).toBeCloseTo(20.0, 5);
      expect(data[2]).toBeCloseTo(30.0, 5);

      m.free();
      indexScalar.free();
      result.free();
    });

    it('should extract the last row', () => {
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([10, 20, 30, 40, 50, 60]));
      m.setWidth(2);  // rows
      m.setHeight(3); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([1])); // last row

      const result = new WebGLMemory(gl, 3);
      result.setWidth(1);
      result.setHeight(3);

      const kernel = getKernel('matrix_row');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(40.0, 5);
      expect(data[1]).toBeCloseTo(50.0, 5);
      expect(data[2]).toBeCloseTo(60.0, 5);

      m.free();
      indexScalar.free();
      result.free();
    });
  });

  describe('matrix_col', () => {
    it('should extract a specific column from a matrix', () => {
      // 3x4 matrix (3 rows, 4 cols)
      // Row 0: [1, 2, 3, 4]
      // Row 1: [5, 6, 7, 8]
      // Row 2: [9, 10, 11, 12]
      const m = new WebGLMemory(gl, 12);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
      m.setWidth(3);  // rows
      m.setHeight(4); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([2])); // extract column 2

      const result = new WebGLMemory(gl, 3); // 3 rows x 1 col
      result.setWidth(3);
      result.setHeight(1);

      const kernel = getKernel('matrix_col');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(3.0, 5);  // row0, col2
      expect(data[1]).toBeCloseTo(7.0, 5);  // row1, col2
      expect(data[2]).toBeCloseTo(11.0, 5); // row2, col2

      m.free();
      indexScalar.free();
      result.free();
    });

    it('should extract the first column', () => {
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6]));
      m.setWidth(2);  // rows
      m.setHeight(3); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([0])); // first column

      const result = new WebGLMemory(gl, 2);
      result.setWidth(2);
      result.setHeight(1);

      const kernel = getKernel('matrix_col');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(1.0, 5); // row0, col0
      expect(data[1]).toBeCloseTo(4.0, 5); // row1, col0

      m.free();
      indexScalar.free();
      result.free();
    });

    it('should extract the last column', () => {
      const m = new WebGLMemory(gl, 6);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6]));
      m.setWidth(2);  // rows
      m.setHeight(3); // cols

      const indexScalar = new WebGLMemory(gl, 1);
      indexScalar.set(new Float32Array([2])); // last column

      const result = new WebGLMemory(gl, 2);
      result.setWidth(2);
      result.setHeight(1);

      const kernel = getKernel('matrix_col');
      kernel.executeFn(gl, device, [m, indexScalar, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(3.0, 5); // row0, col2
      expect(data[1]).toBeCloseTo(6.0, 5); // row1, col2

      m.free();
      indexScalar.free();
      result.free();
    });
  });

  describe('matrix_block', () => {
    it('should extract a 2x2 block from a 3x4 matrix', () => {
      // 3x4 matrix (3 rows, 4 cols)
      // Row 0: [1,  2,  3,  4]
      // Row 1: [5,  6,  7,  8]
      // Row 2: [9, 10, 11, 12]
      const m = new WebGLMemory(gl, 12);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
      m.setWidth(3);  // rows
      m.setHeight(4); // cols

      const rowOff = new WebGLMemory(gl, 1);
      rowOff.set(new Float32Array([1])); // start at row 1
      const colOff = new WebGLMemory(gl, 1);
      colOff.set(new Float32Array([1])); // start at col 1
      const nRows = new WebGLMemory(gl, 1);
      nRows.set(new Float32Array([2])); // 2 rows
      const nCols = new WebGLMemory(gl, 1);
      nCols.set(new Float32Array([2])); // 2 cols

      const result = new WebGLMemory(gl, 4); // 2x2 block
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('matrix_block');
      kernel.executeFn(gl, device, [m, rowOff, colOff, nRows, nCols, result], []);

      const data = result.get();
      // Block from (1,1) to (2,2):
      // [6, 7]
      // [10, 11]
      expect(data[0]).toBeCloseTo(6.0, 5);
      expect(data[1]).toBeCloseTo(7.0, 5);
      expect(data[2]).toBeCloseTo(10.0, 5);
      expect(data[3]).toBeCloseTo(11.0, 5);

      m.free();
      rowOff.free();
      colOff.free();
      nRows.free();
      nCols.free();
      result.free();
    });

    it('should extract a block from top-left corner', () => {
      // 3x3 matrix
      // [1, 2, 3]
      // [4, 5, 6]
      // [7, 8, 9]
      const m = new WebGLMemory(gl, 9);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      m.setWidth(3);
      m.setHeight(3);

      const rowOff = new WebGLMemory(gl, 1);
      rowOff.set(new Float32Array([0]));
      const colOff = new WebGLMemory(gl, 1);
      colOff.set(new Float32Array([0]));
      const nRows = new WebGLMemory(gl, 1);
      nRows.set(new Float32Array([2]));
      const nCols = new WebGLMemory(gl, 1);
      nCols.set(new Float32Array([2]));

      const result = new WebGLMemory(gl, 4);
      result.setWidth(2);
      result.setHeight(2);

      const kernel = getKernel('matrix_block');
      kernel.executeFn(gl, device, [m, rowOff, colOff, nRows, nCols, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(1.0, 5);
      expect(data[1]).toBeCloseTo(2.0, 5);
      expect(data[2]).toBeCloseTo(4.0, 5);
      expect(data[3]).toBeCloseTo(5.0, 5);

      m.free();
      rowOff.free();
      colOff.free();
      nRows.free();
      nCols.free();
      result.free();
    });

    it('should extract a single row block', () => {
      // 4x3 matrix
      // [1, 2, 3]
      // [4, 5, 6]
      // [7, 8, 9]
      // [10, 11, 12]
      const m = new WebGLMemory(gl, 12);
      m.set(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
      m.setWidth(4);
      m.setHeight(3);

      const rowOff = new WebGLMemory(gl, 1);
      rowOff.set(new Float32Array([2])); // start at row 2
      const colOff = new WebGLMemory(gl, 1);
      colOff.set(new Float32Array([0]));
      const nRows = new WebGLMemory(gl, 1);
      nRows.set(new Float32Array([1])); // 1 row
      const nCols = new WebGLMemory(gl, 1);
      nCols.set(new Float32Array([3])); // full width

      const result = new WebGLMemory(gl, 3);
      result.setWidth(1);
      result.setHeight(3);

      const kernel = getKernel('matrix_block');
      kernel.executeFn(gl, device, [m, rowOff, colOff, nRows, nCols, result], []);

      const data = result.get();
      expect(data[0]).toBeCloseTo(7.0, 5);
      expect(data[1]).toBeCloseTo(8.0, 5);
      expect(data[2]).toBeCloseTo(9.0, 5);

      m.free();
      rowOff.free();
      colOff.free();
      nRows.free();
      nCols.free();
      result.free();
    });
  });
});
