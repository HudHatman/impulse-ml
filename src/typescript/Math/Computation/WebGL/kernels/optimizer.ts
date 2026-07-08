import { registerKernel } from '../kernelRegistry';
import { WebGLMemory } from '../WebGLMemory';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * algebra_cross_entropy_loss: inputs = [correctOutput, predictions, epsilon_scalar], outputs = [result_scalar]
 *
 * Computes cross-entropy loss: -sum(y_i * log(max(p_i, epsilon)))
 * Uses CPU readback since this combines element-wise log with a full reduction to scalar.
 *
 * Input layout:
 *   inputs[0] = correctOutput (y) - one-hot or probability vector
 *   inputs[1] = predictions (p) - predicted probabilities
 *   inputs[2] = epsilon scalar - clipping threshold for numerical stability
 * Output layout:
 *   outputs[0] = result scalar - the computed loss value
 */
const crossEntropyLossFn: KernelExecuteFn = (_gl, _device, inputs, outputs) => {
  const correctOutput = inputs[0];
  const predictions = inputs[1];
  const epsilonScalar = inputs[2];
  const result = outputs[0];

  const y = correctOutput.get();
  const p = predictions.get();
  const eps = epsilonScalar.get()[0];

  let loss = 0;
  for (let i = 0; i < y.length; i++) {
    const clipped = Math.max(p[i], eps);
    loss -= y[i] * Math.log(clipped);
  }

  result.set(new Float32Array([loss]));
};

/**
 * algebra_adam_optimize: inputs = [W, b, gW, gb, vW, vb, sW, sb, lr, β1, β2, ε, t],
 *                       outputs = [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB]
 *
 * Executes one step of the Adam optimizer for both weight matrix W and bias vector b.
 * Uses CPU readback and computation due to the complex multi-step nature of Adam
 * (bias correction, moment updates, parameter updates across 6 output arrays).
 *
 * Adam update rules:
 *   v = β1 * v + (1 - β1) * g
 *   s = β2 * s + (1 - β2) * g²
 *   v_corrected = v / (1 - β1^t)
 *   s_corrected = s / (1 - β2^t)
 *   param = param - lr * v_corrected / (sqrt(s_corrected) + ε)
 */
const adamOptimizeFn: KernelExecuteFn = (_gl, _device, inputs, outputs) => {
  const W = inputs[0].get();
  const b = inputs[1].get();
  const gW = inputs[2].get();
  const gb = inputs[3].get();
  const vW = inputs[4].get();
  const vb = inputs[5].get();
  const sW = inputs[6].get();
  const sb = inputs[7].get();
  const lr = inputs[8].get()[0];
  const beta1 = inputs[9].get()[0];
  const beta2 = inputs[10].get()[0];
  const epsilon = inputs[11].get()[0];
  const t = inputs[12].get()[0];

  // Compute bias-correction factors
  const beta1CorrectionFactor = 1 / (1 - Math.pow(beta1, t));
  const beta2CorrectionFactor = 1 / (1 - Math.pow(beta2, t));

  // Update vW, sW, W
  const updatedVW = new Float32Array(vW.length);
  const updatedSW = new Float32Array(sW.length);
  const updatedW = new Float32Array(W.length);
  for (let i = 0; i < W.length; i++) {
    updatedVW[i] = beta1 * vW[i] + (1 - beta1) * gW[i];
    updatedSW[i] = beta2 * sW[i] + (1 - beta2) * gW[i] * gW[i];
    const vCorrected = updatedVW[i] * beta1CorrectionFactor;
    const sCorrected = updatedSW[i] * beta2CorrectionFactor;
    updatedW[i] = W[i] - lr * vCorrected / (Math.sqrt(sCorrected) + epsilon);
  }

  // Update vb, sb, b
  const updatedVB = new Float32Array(vb.length);
  const updatedSB = new Float32Array(sb.length);
  const updatedB = new Float32Array(b.length);
  for (let i = 0; i < b.length; i++) {
    updatedVB[i] = beta1 * vb[i] + (1 - beta1) * gb[i];
    updatedSB[i] = beta2 * sb[i] + (1 - beta2) * gb[i] * gb[i];
    const vCorrected = updatedVB[i] * beta1CorrectionFactor;
    const sCorrected = updatedSB[i] * beta2CorrectionFactor;
    updatedB[i] = b[i] - lr * vCorrected / (Math.sqrt(sCorrected) + epsilon);
  }

  // Write results to output buffers
  outputs[0].set(updatedW);
  outputs[1].set(updatedB);
  outputs[2].set(updatedVW);
  outputs[3].set(updatedVB);
  outputs[4].set(updatedSW);
  outputs[5].set(updatedSB);
};

// Register optimizer kernels
registerKernel('algebra_cross_entropy_loss', { executeFn: crossEntropyLossFn });
registerKernel('algebra_adam_optimize', { executeFn: adamOptimizeFn });
