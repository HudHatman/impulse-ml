import { registerKernel } from '../kernelRegistry';
import { executeKernel } from '../executeKernel';
import { WebGLMemory } from '../WebGLMemory';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * Fragment shader for Leaky ReLU activation.
 * For each element x: if x > 0 then x, else alpha * x.
 * Uses mix(alpha * x, x, step(0.0, x)) for branchless computation.
 * u_input0 is the matrix, u_input1 is the alpha scalar.
 */
const ALGEBRA_LEAKY_RELU_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform sampler2D u_input1;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
varying vec2 v_texCoord;

void main() {
  float x = floor(v_texCoord.x * u_texWidth);
  float y = floor(v_texCoord.y * u_texHeight);
  float index = y * u_texWidth + x;
  if (index >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float val = texture2D(u_input0, v_texCoord).r;
  float alpha = texture2D(u_input1, vec2(0.5, 0.5)).r;
  float result = mix(alpha * val, val, step(0.0, val));
  gl_FragColor = vec4(result, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for Leaky ReLU backpropagation derivative.
 * For each element x: if x > 0 then 1.0, else alpha.
 * Uses mix(alpha, 1.0, step(0.0, x)) for branchless computation.
 * u_input0 is the matrix, u_input1 is the alpha scalar.
 */
const ALGEBRA_LEAKY_RELU_BACKPROPAGATION_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform sampler2D u_input1;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
varying vec2 v_texCoord;

void main() {
  float x = floor(v_texCoord.x * u_texWidth);
  float y = floor(v_texCoord.y * u_texHeight);
  float index = y * u_texWidth + x;
  if (index >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float val = texture2D(u_input0, v_texCoord).r;
  float alpha = texture2D(u_input1, vec2(0.5, 0.5)).r;
  float result = mix(alpha, 1.0, step(0.0, val));
  gl_FragColor = vec4(result, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_leaky_relu: inputs = [m, alpha_scalar], m is modified in-place.
 *
 * Applies Leaky ReLU: f(x) = x if x > 0, alpha * x otherwise.
 * Uses temp texture for in-place semantics.
 */
const leakyReluFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const alphaScalar = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_leaky_relu', ALGEBRA_LEAKY_RELU_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, alphaScalar], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

/**
 * algebra_leaky_reluBackpropagation: inputs = [m, alpha_scalar], m is modified in-place.
 *
 * Applies Leaky ReLU derivative: f'(x) = 1.0 if x > 0, alpha otherwise.
 * Uses temp texture for in-place semantics.
 */
const leakyReluBackpropagationFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const alphaScalar = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile(
    'algebra_leaky_reluBackpropagation',
    ALGEBRA_LEAKY_RELU_BACKPROPAGATION_SOURCE
  );

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, alphaScalar], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

/**
 * algebra_softmax: inputs = [m], m is modified in-place.
 *
 * Computes column-wise softmax: for each column, exp(x_i - max_col) / sum(exp(x_i - max_col)).
 * Uses CPU readback for column-wise reduction (acceptable per design doc).
 *
 * Matrix layout: width = rows, height = cols.
 * Data is stored row-major: index = row * cols + col.
 */
const softmaxFn: KernelExecuteFn = (_gl, _device, inputs, _outputs) => {
  const m = inputs[0];
  const rows = m.width;
  const cols = m.height;
  const data = m.get();
  const result = new Float32Array(data.length);

  // Column-wise softmax
  for (let col = 0; col < cols; col++) {
    // Find max in column for numerical stability
    let max = -Infinity;
    for (let row = 0; row < rows; row++) {
      const idx = row * cols + col;
      if (data[idx] > max) max = data[idx];
    }
    // Compute exp(x - max) and sum
    let sum = 0;
    for (let row = 0; row < rows; row++) {
      const idx = row * cols + col;
      result[idx] = Math.exp(data[idx] - max);
      sum += result[idx];
    }
    // Normalize
    for (let row = 0; row < rows; row++) {
      const idx = row * cols + col;
      result[idx] /= sum;
    }
  }

  m.set(result);
};

registerKernel('algebra_leaky_relu', { executeFn: leakyReluFn });
registerKernel('algebra_leaky_reluBackpropagation', { executeFn: leakyReluBackpropagationFn });
registerKernel('algebra_softmax', { executeFn: softmaxFn });
