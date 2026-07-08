import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/activation';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('activation kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('algebra_leaky_relu', () => {
    it('should leave positive values unchanged and scale negative values by alpha', () => {
      const m = new WebGLMemory(gl, 6);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([2.0, -3.0, 0.5, -1.0, 4.0, -0.5]));
      alphaScalar.set(new Float32Array([0.01]));

      const kernel = getKernel('algebra_leaky_relu');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(2.0, 5);      // positive: unchanged
      expect(result[1]).toBeCloseTo(-0.03, 5);    // negative: -3.0 * 0.01
      expect(result[2]).toBeCloseTo(0.5, 5);      // positive: unchanged
      expect(result[3]).toBeCloseTo(-0.01, 5);    // negative: -1.0 * 0.01
      expect(result[4]).toBeCloseTo(4.0, 5);      // positive: unchanged
      expect(result[5]).toBeCloseTo(-0.005, 5);   // negative: -0.5 * 0.01

      m.free();
      alphaScalar.free();
    });

    it('should handle zero values (step(0.0, 0.0) = 1.0, so zero stays zero)', () => {
      const m = new WebGLMemory(gl, 3);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([0.0, 1.0, -1.0]));
      alphaScalar.set(new Float32Array([0.01]));

      const kernel = getKernel('algebra_leaky_relu');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      // step(0.0, 0.0) = 1.0 in GLSL, so mix(alpha*0, 0, 1) = 0
      expect(result[0]).toBeCloseTo(0.0, 5);
      expect(result[1]).toBeCloseTo(1.0, 5);
      expect(result[2]).toBeCloseTo(-0.01, 5);

      m.free();
      alphaScalar.free();
    });

    it('should work with larger alpha value', () => {
      const m = new WebGLMemory(gl, 4);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([3.0, -2.0, -4.0, 1.0]));
      alphaScalar.set(new Float32Array([0.2]));

      const kernel = getKernel('algebra_leaky_relu');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(3.0, 5);     // positive: unchanged
      expect(result[1]).toBeCloseTo(-0.4, 5);    // -2.0 * 0.2
      expect(result[2]).toBeCloseTo(-0.8, 5);    // -4.0 * 0.2
      expect(result[3]).toBeCloseTo(1.0, 5);     // positive: unchanged

      m.free();
      alphaScalar.free();
    });
  });

  describe('algebra_leaky_reluBackpropagation', () => {
    it('should output 1.0 for positive values and alpha for negative values', () => {
      const m = new WebGLMemory(gl, 6);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([2.0, -3.0, 0.5, -1.0, 4.0, -0.5]));
      alphaScalar.set(new Float32Array([0.01]));

      const kernel = getKernel('algebra_leaky_reluBackpropagation');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(1.0, 5);    // positive → 1.0
      expect(result[1]).toBeCloseTo(0.01, 5);   // negative → alpha
      expect(result[2]).toBeCloseTo(1.0, 5);    // positive → 1.0
      expect(result[3]).toBeCloseTo(0.01, 5);   // negative → alpha
      expect(result[4]).toBeCloseTo(1.0, 5);    // positive → 1.0
      expect(result[5]).toBeCloseTo(0.01, 5);   // negative → alpha

      m.free();
      alphaScalar.free();
    });

    it('should handle zero values (step(0.0, 0.0) = 1.0, so zero → 1.0)', () => {
      const m = new WebGLMemory(gl, 3);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([0.0, 1.0, -1.0]));
      alphaScalar.set(new Float32Array([0.01]));

      const kernel = getKernel('algebra_leaky_reluBackpropagation');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      // step(0.0, 0.0) = 1.0 in GLSL, so mix(alpha, 1.0, 1.0) = 1.0
      expect(result[0]).toBeCloseTo(1.0, 5);
      expect(result[1]).toBeCloseTo(1.0, 5);
      expect(result[2]).toBeCloseTo(0.01, 5);

      m.free();
      alphaScalar.free();
    });

    it('should work with different alpha value', () => {
      const m = new WebGLMemory(gl, 4);
      const alphaScalar = new WebGLMemory(gl, 1);
      m.set(new Float32Array([3.0, -2.0, -4.0, 1.0]));
      alphaScalar.set(new Float32Array([0.2]));

      const kernel = getKernel('algebra_leaky_reluBackpropagation');
      kernel.executeFn(gl, device, [m, alphaScalar], []);

      const result = m.get();
      expect(result[0]).toBeCloseTo(1.0, 5);    // positive → 1.0
      expect(result[1]).toBeCloseTo(0.2, 5);    // negative → alpha
      expect(result[2]).toBeCloseTo(0.2, 5);    // negative → alpha
      expect(result[3]).toBeCloseTo(1.0, 5);    // positive → 1.0

      m.free();
      alphaScalar.free();
    });
  });

  describe('algebra_softmax', () => {
    it('should produce column values that sum to 1.0', () => {
      // 3 rows, 2 cols → width=3, height=2
      // Data layout (row-major): [r0c0, r0c1, r1c0, r1c1, r2c0, r2c1]
      const m = new WebGLMemory(gl, 6);
      m.setWidth(3);
      m.setHeight(2);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]));

      const kernel = getKernel('algebra_softmax');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();

      // Column 0: indices 0, 2, 4 (values were 1, 3, 5)
      const col0Sum = result[0] + result[2] + result[4];
      expect(col0Sum).toBeCloseTo(1.0, 5);

      // Column 1: indices 1, 3, 5 (values were 2, 4, 6)
      const col1Sum = result[1] + result[3] + result[5];
      expect(col1Sum).toBeCloseTo(1.0, 5);

      m.free();
    });

    it('should produce all values in [0, 1] range', () => {
      const m = new WebGLMemory(gl, 6);
      m.setWidth(3);
      m.setHeight(2);
      m.set(new Float32Array([-1.0, 0.0, 1.0, 2.0, -2.0, 3.0]));

      const kernel = getKernel('algebra_softmax');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();

      for (let i = 0; i < 6; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(0.0);
        expect(result[i]).toBeLessThanOrEqual(1.0);
      }

      m.free();
    });

    it('should handle single-column matrix', () => {
      // 4 rows, 1 col → width=4, height=1
      const m = new WebGLMemory(gl, 4);
      m.setWidth(4);
      m.setHeight(1);
      m.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));

      const kernel = getKernel('algebra_softmax');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();

      // Single column: all values in the only column sum to 1
      const sum = result[0] + result[1] + result[2] + result[3];
      expect(sum).toBeCloseTo(1.0, 5);

      // Larger input values should get larger softmax outputs
      expect(result[3]).toBeGreaterThan(result[2]);
      expect(result[2]).toBeGreaterThan(result[1]);
      expect(result[1]).toBeGreaterThan(result[0]);

      m.free();
    });

    it('should handle equal values (uniform distribution)', () => {
      // 3 rows, 1 col
      const m = new WebGLMemory(gl, 3);
      m.setWidth(3);
      m.setHeight(1);
      m.set(new Float32Array([5.0, 5.0, 5.0]));

      const kernel = getKernel('algebra_softmax');
      kernel.executeFn(gl, device, [m], []);

      const result = m.get();

      // All equal inputs → uniform 1/3
      expect(result[0]).toBeCloseTo(1.0 / 3.0, 5);
      expect(result[1]).toBeCloseTo(1.0 / 3.0, 5);
      expect(result[2]).toBeCloseTo(1.0 / 3.0, 5);

      m.free();
    });
  });
});
