import { registerKernel } from '../kernelRegistry';
import { executeKernel } from '../executeKernel';
import { WebGLMemory } from '../WebGLMemory';
import { KernelExecuteFn } from '../WebGLFunction';

/**
 * matrix_set_zeros: inputs = [m], IN-PLACE
 * Sets all elements of the matrix to zero.
 * CPU-only implementation: uploads a zeroed Float32Array.
 */
const setZerosFn: KernelExecuteFn = (_gl, _device, inputs, _outputs) => {
  const m = inputs[0];
  m.set(new Float32Array(m.count));
};

/**
 * matrix_set_random: inputs = [m, scalar], IN-PLACE
 * Fills the matrix with random values in range [-scale, scale]
 * where scale is the scalar value. CPU implementation.
 */
const setRandomFn: KernelExecuteFn = (_gl, _device, inputs, _outputs) => {
  const m = inputs[0];
  const scalar = inputs[1];
  const scale = scalar.get()[0];
  const data = new Float32Array(m.count);
  for (let i = 0; i < m.count; i++) {
    data[i] = (Math.random() * 2 - 1) * scale;
  }
  m.set(data);
};

/**
 * Fragment shader for matrix transpose.
 * Remaps indices: output at (outRow, outCol) reads input at (outCol, outRow).
 * The output matrix has dimensions (matrixCols x matrixRows) — transposed from the input.
 */
const MATRIX_TRANSPOSE_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_matrixRows;
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
  // Output has dimensions (matrixCols rows x matrixRows cols)
  float outRow = floor(outIndex / u_matrixRows);
  float outCol = outIndex - outRow * u_matrixRows;

  // Read from input at (outCol, outRow) — swap row/col
  float inputIndex = outCol * u_matrixCols + outRow;
  vec2 inputCoord = indexToCoord(inputIndex, u_inputTexWidth, u_inputTexHeight);
  float val = texture2D(u_input0, inputCoord).r;

  gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
}
`;

/**
 * matrix_transpose: inputs = [m, result], result is inputs[1]
 * Writes transposed m into result.
 * m has logical dimensions (matrixRows x matrixCols), result is (matrixCols x matrixRows).
 */
const transposeFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const result = inputs[1];

  const matrixRows = m.width;   // logical rows of input
  const matrixCols = m.height;  // logical cols of input

  const program = device.getShaderCache().getOrCompile('matrix_transpose', MATRIX_TRANSPOSE_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
    u_inputTexWidth: m.texWidth,
    u_inputTexHeight: m.texHeight,
    u_matrixRows: matrixRows,
    u_matrixCols: matrixCols,
  };

  executeKernel(device, program, [m], result, uniforms);
};

/**
 * Fragment shader for extracting a single row from a matrix.
 * Output pixel i reads from input at (rowIndex * matrixCols + i).
 */
const MATRIX_ROW_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_rowIndex;
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
  float inputIndex = u_rowIndex * u_matrixCols + outIndex;
  vec2 inputCoord = indexToCoord(inputIndex, u_inputTexWidth, u_inputTexHeight);
  float val = texture2D(u_input0, inputCoord).r;

  gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
}
`;

/**
 * matrix_row: inputs = [m, index_scalar, result], result is inputs[2]
 * Extracts row `index` from m and writes it to result.
 */
const rowFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const indexScalar = inputs[1];
  const result = inputs[2];

  const rowIndex = indexScalar.get()[0];
  const matrixCols = m.height; // logical columns of input

  const program = device.getShaderCache().getOrCompile('matrix_row', MATRIX_ROW_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
    u_inputTexWidth: m.texWidth,
    u_inputTexHeight: m.texHeight,
    u_rowIndex: rowIndex,
    u_matrixCols: matrixCols,
  };

  executeKernel(device, program, [m], result, uniforms);
};

/**
 * Fragment shader for extracting a single column from a matrix.
 * Output pixel i reads from input at (i * matrixCols + colIndex).
 */
const MATRIX_COL_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_colIndex;
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
  float inputIndex = outIndex * u_matrixCols + u_colIndex;
  vec2 inputCoord = indexToCoord(inputIndex, u_inputTexWidth, u_inputTexHeight);
  float val = texture2D(u_input0, inputCoord).r;

  gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
}
`;

/**
 * matrix_col: inputs = [m, index_scalar, result], result is inputs[2]
 * Extracts column `index` from m and writes it to result.
 */
const colFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const indexScalar = inputs[1];
  const result = inputs[2];

  const colIndex = indexScalar.get()[0];
  const matrixCols = m.height; // logical columns of input

  const program = device.getShaderCache().getOrCompile('matrix_col', MATRIX_COL_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
    u_inputTexWidth: m.texWidth,
    u_inputTexHeight: m.texHeight,
    u_colIndex: colIndex,
    u_matrixCols: matrixCols,
  };

  executeKernel(device, program, [m], result, uniforms);
};

/**
 * Fragment shader for extracting a sub-matrix (block) from a matrix.
 * Output pixel at logical (row, col) reads from input at ((rowOff+row) * matrixCols + colOff + col).
 */
const MATRIX_BLOCK_SOURCE = `
precision highp float;
uniform sampler2D u_input0;
uniform float u_texWidth;
uniform float u_texHeight;
uniform float u_count;
uniform float u_inputTexWidth;
uniform float u_inputTexHeight;
uniform float u_rowOffset;
uniform float u_colOffset;
uniform float u_numCols;
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
  // Output is (numRows x numCols), compute logical row/col
  float outRow = floor(outIndex / u_numCols);
  float outCol = outIndex - outRow * u_numCols;

  // Read from input at ((rowOffset + outRow) * matrixCols + colOffset + outCol)
  float inputIndex = (u_rowOffset + outRow) * u_matrixCols + u_colOffset + outCol;
  vec2 inputCoord = indexToCoord(inputIndex, u_inputTexWidth, u_inputTexHeight);
  float val = texture2D(u_input0, inputCoord).r;

  gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
}
`;

/**
 * matrix_block: inputs = [m, rowOff, colOff, nRows, nCols, result], result is inputs[5]
 * Extracts a sub-matrix starting at (rowOff, colOff) with dimensions (nRows x nCols).
 */
const blockFn: KernelExecuteFn = (_gl, device, inputs, _outputs) => {
  const m = inputs[0];
  const rowOffScalar = inputs[1];
  const colOffScalar = inputs[2];
  const _nRowsScalar = inputs[3];
  const nColsScalar = inputs[4];
  const result = inputs[5];

  const rowOffset = rowOffScalar.get()[0];
  const colOffset = colOffScalar.get()[0];
  const numCols = nColsScalar.get()[0];
  const matrixCols = m.height; // logical columns of input

  const program = device.getShaderCache().getOrCompile('matrix_block', MATRIX_BLOCK_SOURCE);

  const uniforms: Record<string, number> = {
    u_texWidth: result.texWidth,
    u_texHeight: result.texHeight,
    u_count: result.count,
    u_inputTexWidth: m.texWidth,
    u_inputTexHeight: m.texHeight,
    u_rowOffset: rowOffset,
    u_colOffset: colOffset,
    u_numCols: numCols,
    u_matrixCols: matrixCols,
  };

  executeKernel(device, program, [m], result, uniforms);
};

// Register all matrix utility kernels
registerKernel('matrix_set_zeros', { executeFn: setZerosFn });
registerKernel('matrix_set_random', { executeFn: setRandomFn });
registerKernel('matrix_transpose', { executeFn: transposeFn });
registerKernel('matrix_row', { executeFn: rowFn });
registerKernel('matrix_col', { executeFn: colFn });
registerKernel('matrix_block', { executeFn: blockFn });
