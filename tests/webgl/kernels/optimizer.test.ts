import { WebGLDevice } from '../../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLMemory } from '../../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import '../../../src/typescript/Math/Computation/WebGL/kernels/optimizer';
import { getKernel } from '../../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('optimizer kernels', () => {
  let device: WebGLDevice;
  let gl: WebGLRenderingContext;

  beforeAll(() => {
    device = new WebGLDevice();
    gl = device.getGL();
  });

  afterAll(() => {
    device.destroy();
  });

  describe('algebra_cross_entropy_loss', () => {
    it('should compute cross-entropy loss for known inputs', () => {
      // correctOutput = [1, 0, 0] (one-hot), predictions = [0.7, 0.2, 0.1]
      // loss = -(1*log(0.7) + 0*log(0.2) + 0*log(0.1)) = -log(0.7) ≈ 0.35667
      const correctOutput = new WebGLMemory(gl, 3);
      const predictions = new WebGLMemory(gl, 3);
      const epsilonScalar = new WebGLMemory(gl, 1);
      const result = new WebGLMemory(gl, 1);

      correctOutput.set(new Float32Array([1.0, 0.0, 0.0]));
      predictions.set(new Float32Array([0.7, 0.2, 0.1]));
      epsilonScalar.set(new Float32Array([1e-7]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_cross_entropy_loss');
      kernel.executeFn(gl, device, [correctOutput, predictions, epsilonScalar], [result]);

      const data = result.get();
      const expected = -Math.log(0.7);
      expect(data[0]).toBeCloseTo(expected, 4);

      correctOutput.free();
      predictions.free();
      epsilonScalar.free();
      result.free();
    });

    it('should clip predictions at epsilon to prevent log(0)', () => {
      // correctOutput = [1, 0], predictions = [0.0, 1.0], epsilon = 1e-7
      // loss = -(1*log(max(0.0, 1e-7))) = -log(1e-7) ≈ 16.1181
      const correctOutput = new WebGLMemory(gl, 2);
      const predictions = new WebGLMemory(gl, 2);
      const epsilonScalar = new WebGLMemory(gl, 1);
      const result = new WebGLMemory(gl, 1);

      correctOutput.set(new Float32Array([1.0, 0.0]));
      predictions.set(new Float32Array([0.0, 1.0]));
      epsilonScalar.set(new Float32Array([1e-7]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_cross_entropy_loss');
      kernel.executeFn(gl, device, [correctOutput, predictions, epsilonScalar], [result]);

      const data = result.get();
      const expected = -Math.log(1e-7);
      expect(data[0]).toBeCloseTo(expected, 2);

      correctOutput.free();
      predictions.free();
      epsilonScalar.free();
      result.free();
    });

    it('should handle multi-class cross-entropy', () => {
      // correctOutput = [0, 1, 0, 0], predictions = [0.1, 0.6, 0.2, 0.1]
      // loss = -(0*log(0.1) + 1*log(0.6) + 0*log(0.2) + 0*log(0.1)) = -log(0.6) ≈ 0.5108
      const correctOutput = new WebGLMemory(gl, 4);
      const predictions = new WebGLMemory(gl, 4);
      const epsilonScalar = new WebGLMemory(gl, 1);
      const result = new WebGLMemory(gl, 1);

      correctOutput.set(new Float32Array([0.0, 1.0, 0.0, 0.0]));
      predictions.set(new Float32Array([0.1, 0.6, 0.2, 0.1]));
      epsilonScalar.set(new Float32Array([1e-7]));
      result.set(new Float32Array([0.0]));

      const kernel = getKernel('algebra_cross_entropy_loss');
      kernel.executeFn(gl, device, [correctOutput, predictions, epsilonScalar], [result]);

      const data = result.get();
      const expected = -Math.log(0.6);
      expect(data[0]).toBeCloseTo(expected, 4);

      correctOutput.free();
      predictions.free();
      epsilonScalar.free();
      result.free();
    });
  });

  describe('algebra_adam_optimize', () => {
    it('should perform one Adam update step with known gradients', () => {
      // Setup: 2-element weight vector, 1-element bias
      // W = [0.5, -0.3], b = [0.1]
      // gW = [0.1, -0.2], gb = [0.05]
      // vW = [0, 0], vb = [0] (first moment)
      // sW = [0, 0], sb = [0] (second moment)
      // lr = 0.001, beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8, t = 1

      const W = new WebGLMemory(gl, 2);
      const b = new WebGLMemory(gl, 1);
      const gW = new WebGLMemory(gl, 2);
      const gb = new WebGLMemory(gl, 1);
      const vW = new WebGLMemory(gl, 2);
      const vb = new WebGLMemory(gl, 1);
      const sW = new WebGLMemory(gl, 2);
      const sb = new WebGLMemory(gl, 1);
      const lrScalar = new WebGLMemory(gl, 1);
      const beta1Scalar = new WebGLMemory(gl, 1);
      const beta2Scalar = new WebGLMemory(gl, 1);
      const epsilonScalar = new WebGLMemory(gl, 1);
      const tScalar = new WebGLMemory(gl, 1);

      W.set(new Float32Array([0.5, -0.3]));
      b.set(new Float32Array([0.1]));
      gW.set(new Float32Array([0.1, -0.2]));
      gb.set(new Float32Array([0.05]));
      vW.set(new Float32Array([0.0, 0.0]));
      vb.set(new Float32Array([0.0]));
      sW.set(new Float32Array([0.0, 0.0]));
      sb.set(new Float32Array([0.0]));
      lrScalar.set(new Float32Array([0.001]));
      beta1Scalar.set(new Float32Array([0.9]));
      beta2Scalar.set(new Float32Array([0.999]));
      epsilonScalar.set(new Float32Array([1e-8]));
      tScalar.set(new Float32Array([1.0]));

      // Allocate output buffers
      const updatedW = new WebGLMemory(gl, 2);
      const updatedB = new WebGLMemory(gl, 1);
      const updatedVW = new WebGLMemory(gl, 2);
      const updatedVB = new WebGLMemory(gl, 1);
      const updatedSW = new WebGLMemory(gl, 2);
      const updatedSB = new WebGLMemory(gl, 1);

      const kernel = getKernel('algebra_adam_optimize');
      kernel.executeFn(
        gl, device,
        [W, b, gW, gb, vW, vb, sW, sb, lrScalar, beta1Scalar, beta2Scalar, epsilonScalar, tScalar],
        [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB]
      );

      // Compute expected values manually
      const beta1 = 0.9;
      const beta2 = 0.999;
      const lr = 0.001;
      const eps = 1e-8;
      const t = 1;

      const beta1Correction = 1 / (1 - Math.pow(beta1, t)); // 1/(1-0.9) = 10
      const beta2Correction = 1 / (1 - Math.pow(beta2, t)); // 1/(1-0.999) = 1000

      // Expected vW
      const expectedVW0 = 0.9 * 0 + 0.1 * 0.1;   // 0.01
      const expectedVW1 = 0.9 * 0 + 0.1 * (-0.2); // -0.02
      // Expected sW
      const expectedSW0 = 0.999 * 0 + 0.001 * 0.1 * 0.1;     // 0.00001
      const expectedSW1 = 0.999 * 0 + 0.001 * (-0.2) * (-0.2); // 0.00004
      // Expected W
      const expectedW0 = 0.5 - lr * (expectedVW0 * beta1Correction) / (Math.sqrt(expectedSW0 * beta2Correction) + eps);
      const expectedW1 = -0.3 - lr * (expectedVW1 * beta1Correction) / (Math.sqrt(expectedSW1 * beta2Correction) + eps);

      // Expected vb
      const expectedVB0 = 0.9 * 0 + 0.1 * 0.05; // 0.005
      // Expected sb
      const expectedSB0 = 0.999 * 0 + 0.001 * 0.05 * 0.05; // 0.0000025
      // Expected b
      const expectedB0 = 0.1 - lr * (expectedVB0 * beta1Correction) / (Math.sqrt(expectedSB0 * beta2Correction) + eps);

      // Verify updated weights
      const wData = updatedW.get();
      expect(wData[0]).toBeCloseTo(expectedW0, 4);
      expect(wData[1]).toBeCloseTo(expectedW1, 4);

      // Verify updated bias
      const bData = updatedB.get();
      expect(bData[0]).toBeCloseTo(expectedB0, 4);

      // Verify updated first moments
      const vWData = updatedVW.get();
      expect(vWData[0]).toBeCloseTo(expectedVW0, 5);
      expect(vWData[1]).toBeCloseTo(expectedVW1, 5);

      const vBData = updatedVB.get();
      expect(vBData[0]).toBeCloseTo(expectedVB0, 5);

      // Verify updated second moments
      const sWData = updatedSW.get();
      expect(sWData[0]).toBeCloseTo(expectedSW0, 6);
      expect(sWData[1]).toBeCloseTo(expectedSW1, 6);

      const sBData = updatedSB.get();
      expect(sBData[0]).toBeCloseTo(expectedSB0, 7);

      // Cleanup
      W.free(); b.free(); gW.free(); gb.free();
      vW.free(); vb.free(); sW.free(); sb.free();
      lrScalar.free(); beta1Scalar.free(); beta2Scalar.free();
      epsilonScalar.free(); tScalar.free();
      updatedW.free(); updatedB.free();
      updatedVW.free(); updatedVB.free();
      updatedSW.free(); updatedSB.free();
    });

    it('should perform correct second Adam step (t=2) with non-zero moments', () => {
      // Second step: starting with non-zero moment estimates from step 1
      const W = new WebGLMemory(gl, 2);
      const b = new WebGLMemory(gl, 1);
      const gW = new WebGLMemory(gl, 2);
      const gb = new WebGLMemory(gl, 1);
      const vW = new WebGLMemory(gl, 2);
      const vb = new WebGLMemory(gl, 1);
      const sW = new WebGLMemory(gl, 2);
      const sb = new WebGLMemory(gl, 1);
      const lrScalar = new WebGLMemory(gl, 1);
      const beta1Scalar = new WebGLMemory(gl, 1);
      const beta2Scalar = new WebGLMemory(gl, 1);
      const epsilonScalar = new WebGLMemory(gl, 1);
      const tScalar = new WebGLMemory(gl, 1);

      // Values from after first step (approximately)
      W.set(new Float32Array([0.499, -0.299]));
      b.set(new Float32Array([0.099]));
      gW.set(new Float32Array([0.05, -0.1]));
      gb.set(new Float32Array([0.02]));
      vW.set(new Float32Array([0.01, -0.02]));
      vb.set(new Float32Array([0.005]));
      sW.set(new Float32Array([0.00001, 0.00004]));
      sb.set(new Float32Array([0.0000025]));
      lrScalar.set(new Float32Array([0.001]));
      beta1Scalar.set(new Float32Array([0.9]));
      beta2Scalar.set(new Float32Array([0.999]));
      epsilonScalar.set(new Float32Array([1e-8]));
      tScalar.set(new Float32Array([2.0]));

      const updatedW = new WebGLMemory(gl, 2);
      const updatedB = new WebGLMemory(gl, 1);
      const updatedVW = new WebGLMemory(gl, 2);
      const updatedVB = new WebGLMemory(gl, 1);
      const updatedSW = new WebGLMemory(gl, 2);
      const updatedSB = new WebGLMemory(gl, 1);

      const kernel = getKernel('algebra_adam_optimize');
      kernel.executeFn(
        gl, device,
        [W, b, gW, gb, vW, vb, sW, sb, lrScalar, beta1Scalar, beta2Scalar, epsilonScalar, tScalar],
        [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB]
      );

      // Compute expected for t=2
      const beta1 = 0.9;
      const beta2 = 0.999;
      const lr = 0.001;
      const eps = 1e-8;
      const t = 2;

      const beta1Correction = 1 / (1 - Math.pow(beta1, t)); // 1/(1-0.81) ≈ 5.263
      const beta2Correction = 1 / (1 - Math.pow(beta2, t)); // 1/(1-0.998001) ≈ 500.25

      // Expected vW for t=2
      const expectedVW0 = beta1 * 0.01 + (1 - beta1) * 0.05;   // 0.9*0.01 + 0.1*0.05 = 0.014
      const expectedVW1 = beta1 * (-0.02) + (1 - beta1) * (-0.1); // 0.9*(-0.02) + 0.1*(-0.1) = -0.028
      // Expected sW for t=2
      const expectedSW0 = beta2 * 0.00001 + (1 - beta2) * 0.05 * 0.05;
      const expectedSW1 = beta2 * 0.00004 + (1 - beta2) * 0.1 * 0.1;

      const expectedW0 = 0.499 - lr * (expectedVW0 * beta1Correction) / (Math.sqrt(expectedSW0 * beta2Correction) + eps);
      const expectedW1 = -0.299 - lr * (expectedVW1 * beta1Correction) / (Math.sqrt(expectedSW1 * beta2Correction) + eps);

      const wData = updatedW.get();
      expect(wData[0]).toBeCloseTo(expectedW0, 3);
      expect(wData[1]).toBeCloseTo(expectedW1, 3);

      const vWData = updatedVW.get();
      expect(vWData[0]).toBeCloseTo(expectedVW0, 5);
      expect(vWData[1]).toBeCloseTo(expectedVW1, 5);

      // Cleanup
      W.free(); b.free(); gW.free(); gb.free();
      vW.free(); vb.free(); sW.free(); sb.free();
      lrScalar.free(); beta1Scalar.free(); beta2Scalar.free();
      epsilonScalar.free(); tScalar.free();
      updatedW.free(); updatedB.free();
      updatedVW.free(); updatedVB.free();
      updatedSW.free(); updatedSB.free();
    });
  });
});
