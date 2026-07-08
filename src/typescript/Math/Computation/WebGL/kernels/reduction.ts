import { registerKernel } from '../kernelRegistry';
import { executeKernel } from '../executeKernel';
import { WebGLMemory } from '../WebGLMemory';
import { WebGLDevice } from '../WebGLDevice';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * Fragment shader for sum reduction pass.
 * Each output pixel reads a pair of adjacent elements from the input
 * and writes their sum.
 */
const REDUCTION_SUM_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_inputCount;
uniform float u_texWidth;
uniform float u_texHeight;
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
  float outIdx = y * u_texWidth + x;
  if (outIdx >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float leftIdx = outIdx * 2.0;
  float rightIdx = leftIdx + 1.0;

  float left = texture2D(u_input0, indexToCoord(leftIdx, u_inputTexWidth, u_inputTexHeight)).r;
  float right = 0.0;
  if (rightIdx < u_inputCount) {
    right = texture2D(u_input0, indexToCoord(rightIdx, u_inputTexWidth, u_inputTexHeight)).r;
  }
  gl_FragColor = vec4(left + right, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for max reduction pass.
 * Each output pixel reads a pair of adjacent elements from the input
 * and writes the maximum of the two.
 */
const REDUCTION_MAX_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_inputCount;
uniform float u_texWidth;
uniform float u_texHeight;
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
  float outIdx = y * u_texWidth + x;
  if (outIdx >= u_count) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float leftIdx = outIdx * 2.0;
  float rightIdx = leftIdx + 1.0;

  float left = texture2D(u_input0, indexToCoord(leftIdx, u_inputTexWidth, u_inputTexHeight)).r;
  float right = -1.0e38;
  if (rightIdx < u_inputCount) {
    right = texture2D(u_input0, indexToCoord(rightIdx, u_inputTexWidth, u_inputTexHeight)).r;
  }
  gl_FragColor = vec4(max(left, right), 0.0, 0.0, 1.0);
}
`;

/**
 * Performs a multi-pass reduction on GPU data.
 * Each pass halves the element count by combining adjacent pairs
 * until a single element remains.
 *
 * @param device - The WebGL device
 * @param input - The input memory buffer to reduce
 * @param outputScalar - The 1-element output buffer for the result
 * @param programKey - Cache key for the shader program
 * @param shaderSource - GLSL fragment shader source for the reduction operation
 */
function performReduction(
  device: WebGLDevice,
  input: WebGLMemory,
  outputScalar: WebGLMemory,
  programKey: string,
  shaderSource: string
): void {
  const gl = device.getGL();
  let current = input;
  let currentCount = input.count;

  while (currentCount > 1) {
    const nextCount = Math.ceil(currentCount / 2);
    const temp = new WebGLMemory(gl, nextCount);

    const program = device.getShaderCache().getOrCompile(programKey, shaderSource);

    const uniforms: Record<string, number> = {
      u_inputTexWidth: current.texWidth,
      u_inputTexHeight: current.texHeight,
      u_inputCount: currentCount,
      u_texWidth: temp.texWidth,
      u_texHeight: temp.texHeight,
      u_count: nextCount,
    };

    executeKernel(device, program, [current], temp, uniforms);

    if (current !== input) current.free();
    current = temp;
    currentCount = nextCount;
  }

  // Copy the single result to the output scalar
  outputScalar.set(current.get());
  if (current !== input) current.free();
}

/**
 * algebra_sum: inputs = [m, result]
 * Computes the sum of all elements in m and stores it in result (1-element).
 */
const sumFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const result = inputs[1];
  performReduction(device, m, result, 'reduction_sum', REDUCTION_SUM_SOURCE);
};

/**
 * algebra_max_coeff: inputs = [m, result]
 * Finds the maximum element in m and stores it in result (1-element).
 */
const maxCoeffFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const result = inputs[1];
  performReduction(device, m, result, 'reduction_max', REDUCTION_MAX_SOURCE);
};

// Register reduction kernels
registerKernel('algebra_sum', { executeFn: sumFn });
registerKernel('algebra_max_coeff', { executeFn: maxCoeffFn });
