import { registerKernel } from '../kernelRegistry';
import { executeKernel } from '../executeKernel';
import { WebGLMemory } from '../WebGLMemory';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * Fragment shader for element-wise addition of two matrices.
 * Reads from u_input0 and u_input1 at the same texCoord, outputs their sum.
 */
const ALGEBRA_ADD_MATRIX_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, v_texCoord).r;
  gl_FragColor = vec4(a + b, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for adding a scalar to every element of a matrix.
 * u_input0 is the matrix, u_input1 is a single-element texture (scalar).
 * The scalar is sampled at (0.5, 0.5) to read the center of the 1x1 texture.
 */
const ALGEBRA_ADD_NUMBER_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  gl_FragColor = vec4(a + b, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_add_matrix: inputs = [m, n], m is modified in-place (m = m + n).
 *
 * Since WebGL cannot read from and write to the same texture simultaneously,
 * we render to a temporary texture, then copy the result back to inputs[0].
 */
const addMatrixFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const n = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_add_matrix', ALGEBRA_ADD_MATRIX_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, n], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

/**
 * algebra_add_number: inputs = [m, scalar], m is modified in-place (m = m + scalar).
 *
 * scalar is a 1-element WebGLMemory texture. The shader reads it at (0.5, 0.5).
 */
const addNumberFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_add_number', ALGEBRA_ADD_NUMBER_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, scalar], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

registerKernel('algebra_add_matrix', { executeFn: addMatrixFn });
registerKernel('algebra_add_number', { executeFn: addNumberFn });

/**
 * Fragment shader for element-wise subtraction of two matrices.
 * Reads from u_input0 and u_input1 at the same texCoord, outputs a - b.
 */
const ALGEBRA_SUBTRACT_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, v_texCoord).r;
  gl_FragColor = vec4(a - b, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for element-wise multiplication of two matrices.
 * Reads from u_input0 and u_input1 at the same texCoord, outputs a * b.
 */
const ALGEBRA_MULTIPLY_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, v_texCoord).r;
  gl_FragColor = vec4(a * b, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for multiplying every element of a matrix by a scalar.
 * u_input0 is the matrix, u_input1 is a single-element texture (scalar).
 * The scalar is sampled at (0.5, 0.5) to read the center of the 1x1 texture.
 */
const ALGEBRA_MULTIPLY_NUMBER_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  gl_FragColor = vec4(a * b, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_subtract: inputs = [m, n, result_dest], result_dest gets m - n.
 *
 * The output is written to inputs[2] (native convention where the last input is the destination).
 */
const subtractFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const n = inputs[1];
  const result = inputs[2]; // output is the last element of inputs (native convention)

  const program = device.getShaderCache().getOrCompile('algebra_subtract', ALGEBRA_SUBTRACT_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
  };

  executeKernel(device, program, [m, n], result, uniforms);
};

/**
 * algebra_multiply: inputs = [m, n, result_dest], result_dest gets m * n element-wise.
 *
 * The output is written to inputs[2] (native convention where the last input is the destination).
 */
const multiplyFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const n = inputs[1];
  const result = inputs[2]; // output is the last element of inputs (native convention)

  const program = device.getShaderCache().getOrCompile('algebra_multiply', ALGEBRA_MULTIPLY_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
  };

  executeKernel(device, program, [m, n], result, uniforms);
};

/**
 * algebra_multiply_number: inputs = [m, scalar, result_dest], result_dest gets m * scalar.
 *
 * scalar is a 1-element WebGLMemory texture. The shader reads it at (0.5, 0.5).
 * The output is written to inputs[2] (native convention).
 */
const multiplyNumberFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];
  const result = inputs[2]; // output is the last element of inputs (native convention)

  const program = device.getShaderCache().getOrCompile('algebra_multiply_number', ALGEBRA_MULTIPLY_NUMBER_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
  };

  executeKernel(device, program, [m, scalar], result, uniforms);
};

registerKernel('algebra_subtract', { executeFn: subtractFn });
registerKernel('algebra_multiply', { executeFn: multiplyFn });
registerKernel('algebra_multiply_number', { executeFn: multiplyNumberFn });

/**
 * Fragment shader for element-wise division of two matrices.
 * Reads from u_input0 and u_input1 at the same texCoord, outputs a / b.
 */
const ALGEBRA_DIVIDE_MATRIX_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, v_texCoord).r;
  gl_FragColor = vec4(a / b, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for dividing every element of a matrix by a scalar.
 * u_input0 is the matrix, u_input1 is a single-element texture (scalar).
 * The scalar is sampled at (0.5, 0.5) to read the center of the 1x1 texture.
 */
const ALGEBRA_DIVIDE_NUMBER_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  gl_FragColor = vec4(a / b, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for raising every element of a matrix to a power.
 * u_input0 is the matrix, u_input1 is a single-element texture (exponent scalar).
 * Uses sign(a) * pow(abs(a), b) to handle negative base values for integer exponents.
 */
const ALGEBRA_POW_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  float result = sign(a) * pow(abs(a), b);
  gl_FragColor = vec4(result, 0.0, 0.0, 1.0);
}
`;

/**
 * algebra_divide_matrix: inputs = [m, n], m is modified in-place (m = m / n).
 *
 * Since WebGL cannot read from and write to the same texture simultaneously,
 * we render to a temporary texture, then copy the result back to inputs[0].
 */
const divideMatrixFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const n = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_divide_matrix', ALGEBRA_DIVIDE_MATRIX_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, n], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

/**
 * algebra_divide_number: inputs = [m, scalar], m is modified in-place (m = m / scalar).
 *
 * scalar is a 1-element WebGLMemory texture. The shader reads it at (0.5, 0.5).
 */
const divideNumberFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_divide_number', ALGEBRA_DIVIDE_NUMBER_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, scalar], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

/**
 * algebra_pow: inputs = [m, scalar], m is modified in-place (m = pow(m, scalar)).
 *
 * scalar is a 1-element WebGLMemory texture (the exponent). The shader reads it at (0.5, 0.5).
 */
const powFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];

  // Create temporary output texture with the same size as m
  const temp = new WebGLMemory(gl, m.count);

  const program = device.getShaderCache().getOrCompile('algebra_pow', ALGEBRA_POW_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: m.texWidth,
    u_texHeight: m.texHeight,
    u_count: m.count,
  };

  executeKernel(device, program, [m, scalar], temp, uniforms);

  // Copy result back to m (in-place semantics)
  m.set(temp.get());
  temp.free();
};

registerKernel('algebra_divide_matrix', { executeFn: divideMatrixFn });
registerKernel('algebra_divide_number', { executeFn: divideNumberFn });
registerKernel('algebra_pow', { executeFn: powFn });

/**
 * Fragment shader for clamping each element to be at least a minimum value.
 * u_input0 is the matrix, u_input1 is a single-element texture (min threshold scalar).
 * result = max(element, threshold) — values below threshold are raised to threshold.
 */
const MATRIX_SET_MIN_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  float result = max(a, b);
  gl_FragColor = vec4(result, 0.0, 0.0, 1.0);
}
`;

/**
 * Fragment shader for clamping each element to be at most a maximum value.
 * u_input0 is the matrix, u_input1 is a single-element texture (max threshold scalar).
 * result = min(element, threshold) — values above threshold are lowered to threshold.
 */
const MATRIX_SET_MAX_SOURCE = `
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
  float a = texture2D(u_input0, v_texCoord).r;
  float b = texture2D(u_input1, vec2(0.5, 0.5)).r;
  float result = min(a, b);
  gl_FragColor = vec4(result, 0.0, 0.0, 1.0);
}
`;

/**
 * matrix_set_min: inputs = [m, scalar, result_dest], result_dest gets max(m[i], scalar).
 *
 * Clamps values below the threshold — each element becomes at least the scalar value.
 * The output is written to inputs[2] (native convention where the last input is the destination).
 */
const setMinFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];
  const result = inputs[2]; // output is the last element of inputs (native convention)

  const program = device.getShaderCache().getOrCompile('matrix_set_min', MATRIX_SET_MIN_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
  };

  executeKernel(device, program, [m, scalar], result, uniforms);
};

/**
 * matrix_set_max: inputs = [m, scalar, result_dest], result_dest gets min(m[i], scalar).
 *
 * Clamps values above the threshold — each element becomes at most the scalar value.
 * The output is written to inputs[2] (native convention where the last input is the destination).
 */
const setMaxFn: KernelExecuteFn = (gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];
  const result = inputs[2]; // output is the last element of inputs (native convention)

  const program = device.getShaderCache().getOrCompile('matrix_set_max', MATRIX_SET_MAX_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
  };

  executeKernel(device, program, [m, scalar], result, uniforms);
};

registerKernel('matrix_set_min', { executeFn: setMinFn });
registerKernel('matrix_set_max', { executeFn: setMaxFn });
