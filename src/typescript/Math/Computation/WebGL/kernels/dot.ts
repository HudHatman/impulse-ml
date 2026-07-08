import { registerKernel } from '../kernelRegistry';
import { executeKernel } from '../executeKernel';
import { WebGLMemory } from '../WebGLMemory';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * Fragment shader for matrix multiplication C = A × B.
 * A is (M×K), B is (K×N), result C is (M×N).
 * Each output pixel computes: sum(A[row][k] * B[k][col]) for k=0..K-1.
 */
const ALGEBRA_DOT_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform sampler2D u_input1;
uniform float u_texWidthA;
uniform float u_texHeightA;
uniform float u_texWidthB;
uniform float u_texHeightB;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_M;
uniform float u_K;
uniform float u_N;
uniform float u_count;
varying vec2 v_texCoord;

vec2 indexToCoord(float idx, float texW, float texH) {
  float y = floor(idx / texW);
  float x = idx - y * texW;
  return vec2((x + 0.5) / texW, (y + 0.5) / texH);
}

void main() {
  float x = floor(v_texCoord.x * u_texWidth);
  float y = floor(v_texCoord.y * u_texHeight);
  float outIndex = y * u_texWidth + x;
  if (outIndex >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float row = floor(outIndex / u_N);
  float col = outIndex - row * u_N;

  float sum = 0.0;
  for (float k = 0.0; k < 4096.0; k += 1.0) {
    if (k >= u_K) break;
    float aIdx = row * u_K + k;
    vec2 aCoord = indexToCoord(aIdx, u_texWidthA, u_texHeightA);
    float aVal = texture2D(u_input0, aCoord).r;
    float bIdx = k * u_N + col;
    vec2 bCoord = indexToCoord(bIdx, u_texWidthB, u_texHeightB);
    float bVal = texture2D(u_input1, bCoord).r;
    sum += aVal * bVal;
  }
  gl_FragColor = vec4(sum, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_dot: inputs = [A, B, result], result is inputs[2].
 * Matrix multiplication C = A × B.
 * A has logical dimensions (M rows × K cols), B is (K rows × N cols),
 * result C is (M rows × N cols).
 *
 * In WebGLMemory: width = rows, height = cols.
 */
const dotFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const A = inputs[0];
  const B = inputs[1];
  const result = inputs[2];

  const M = A.width;   // rows of A
  const K = A.height;  // cols of A (= rows of B)
  const N = B.height;  // cols of B

  const program = device.getShaderCache().getOrCompile('algebra_dot', ALGEBRA_DOT_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidthA: A.texWidth,
    u_texHeightA: A.texHeight,
    u_texWidthB: B.texWidth,
    u_texHeightB: B.texHeight,
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_M: M,
    u_K: K,
    u_N: N,
    u_count: result.count,
  };

  executeKernel(device, program, [A, B], result, uniforms);
};

/**
 * Fragment shader for row-wise sum.
 * For matrix M (rows × cols), compute sum of each row → column vector (rows × 1).
 * Each output pixel i sums all elements in row i of the input.
 */
const ALGEBRA_ROWWISE_SUM_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_matrixCols;
varying vec2 v_texCoord;

vec2 indexToCoord(float idx, float texW, float texH) {
  float y = floor(idx / texW);
  float x = idx - y * texW;
  return vec2((x + 0.5) / texW, (y + 0.5) / texH);
}

void main() {
  float x = floor(v_texCoord.x * u_texWidth);
  float y = floor(v_texCoord.y * u_texHeight);
  float outIndex = y * u_texWidth + x;
  if (outIndex >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float row = outIndex;
  float sum = 0.0;
  for (float c = 0.0; c < 4096.0; c += 1.0) {
    if (c >= u_matrixCols) break;
    float inputIndex = row * u_matrixCols + c;
    vec2 coord = indexToCoord(inputIndex, u_inputTexWidth, u_inputTexHeight);
    sum += texture2D(u_input0, coord).r;
  }
  gl_FragColor = vec4(sum, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_rowwise_sum: inputs = [m, result], result is inputs[1].
 * Computes the sum of each row of m into a column vector (rows × 1).
 *
 * m has logical dimensions (rows × cols) where width = rows, height = cols.
 */
const rowwiseSumFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const result = inputs[1];

  const matrixCols = m.height; // logical columns of input

  const program = device.getShaderCache().getOrCompile('algebra_rowwise_sum', ALGEBRA_ROWWISE_SUM_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
    u_inputTexWidth: m.texWidth,
    u_inputTexHeight: m.texHeight,
    u_matrixCols: matrixCols,
  };

  executeKernel(device, program, [m], result, uniforms);
};

/**
 * Fragment shader for forward propagation: result = W × input + b.
 * Combines dot product and bias addition in a single shader pass.
 *
 * W is (M×K), input is (K×N), b is (M×1), result is (M×N).
 * Each output pixel at (row, col) = sum(W[row][k] * input[k][col]) + b[row].
 */
const ALGEBRA_FORWARD_PROPAGATION_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform sampler2D u_input1;
uniform sampler2D u_input2;
uniform float u_texWidthW;
uniform float u_texHeightW;
uniform float u_texWidthInput;
uniform float u_texHeightInput;
uniform float u_texWidthB;
uniform float u_texHeightB;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_M;
uniform float u_K;
uniform float u_N;
uniform float u_count;
varying vec2 v_texCoord;

vec2 indexToCoord(float idx, float texW, float texH) {
  float y = floor(idx / texW);
  float x = idx - y * texW;
  return vec2((x + 0.5) / texW, (y + 0.5) / texH);
}

void main() {
  float x = floor(v_texCoord.x * u_texWidth);
  float y = floor(v_texCoord.y * u_texHeight);
  float outIndex = y * u_texWidth + x;
  if (outIndex >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float row = floor(outIndex / u_N);
  float col = outIndex - row * u_N;

  // Compute dot product: sum(W[row][k] * input[k][col])
  float sum = 0.0;
  for (float k = 0.0; k < 4096.0; k += 1.0) {
    if (k >= u_K) break;
    float wIdx = row * u_K + k;
    vec2 wCoord = indexToCoord(wIdx, u_texWidthW, u_texHeightW);
    float wVal = texture2D(u_input0, wCoord).r;
    float inputIdx = k * u_N + col;
    vec2 inputCoord = indexToCoord(inputIdx, u_texWidthInput, u_texHeightInput);
    float inputVal = texture2D(u_input1, inputCoord).r;
    sum += wVal * inputVal;
  }

  // Add bias: b[row] (b is a column vector, one value per row)
  float bIdx = row;
  vec2 bCoord = indexToCoord(bIdx, u_texWidthB, u_texHeightB);
  float bVal = texture2D(u_input2, bCoord).r;
  sum += bVal;

  gl_FragColor = vec4(sum, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_forward_propagation: inputs = [W, input, b, result], result is inputs[3].
 * Computes result = W × input + b in a single shader pass.
 *
 * W is (M×K), input is (K×N), b is (M×1), result is (M×N).
 * In WebGLMemory: width = rows, height = cols.
 */
const forwardPropagationFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const W = inputs[0];
  const input = inputs[1];
  const b = inputs[2];
  const result = inputs[3];

  const M = W.width;     // rows of W
  const K = W.height;    // cols of W (= rows of input)
  const N = input.height; // cols of input

  const program = device.getShaderCache().getOrCompile('algebra_forward_propagation', ALGEBRA_FORWARD_PROPAGATION_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidthW: W.texWidth,
    u_texHeightW: W.texHeight,
    u_texWidthInput: input.texWidth,
    u_texHeightInput: input.texHeight,
    u_texWidthB: b.texWidth,
    u_texHeightB: b.texHeight,
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_M: M,
    u_K: K,
    u_N: N,
    u_count: result.count,
  };

  executeKernel(device, program, [W, input, b], result, uniforms);
};

// Register all dot product and related kernels
registerKernel('algebra_dot', { executeFn: dotFn });
registerKernel('algebra_rowwise_sum', { executeFn: rowwiseSumFn });
registerKernel('algebra_forward_propagation', { executeFn: forwardPropagationFn });
