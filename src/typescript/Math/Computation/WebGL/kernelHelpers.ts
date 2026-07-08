import { WebGLDevice } from './WebGLDevice';
import { WebGLMemory } from './WebGLMemory';
import { executeKernel } from './executeKernel';
import { registerKernel } from './kernelRegistry';
import { KernelExecuteFn } from './WebGLFunction';

/**
 * Creates and registers an element-wise kernel that operates on 2 input textures.
 * The fragment shader must use u_input0, u_input1 and write result to gl_FragColor.r.
 * Standard uniforms set: u_texWidth, u_texHeight, u_count.
 */
export function registerElementwiseKernel(
  kernelName: string,
  fragmentSource: string,
  options: {
    /** Whether the operation is in-place on the first input (output = inputs[0]) */
    inPlace?: boolean;
    /** Number of input textures expected */
    inputCount?: number;
  } = {}
): void {
  const { inPlace = false, inputCount = 2 } = options;

  const executeFn: KernelExecuteFn = (gl, device, inputs, outputs) => {
    const output = inPlace ? inputs[0] : (outputs.length > 0 ? outputs[0] : inputs[inputs.length - 1]);
    const program = device.getShaderCache().getOrCompile(kernelName, fragmentSource);

    const uniforms: Record<string, number> = {
      u_texWidth: output.texWidth,
      u_texHeight: output.texHeight,
      u_count: output.count,
    };

    executeKernel(device, program, inputs.slice(0, inputCount), output, uniforms);
  };

  registerKernel(kernelName, { executeFn });
}

/**
 * Creates and registers a kernel with a custom execution function.
 * Use this for kernels that don't follow the standard element-wise pattern
 * (e.g., reductions, dot product, adam optimizer).
 */
export function registerCustomKernel(
  kernelName: string,
  executeFn: KernelExecuteFn
): void {
  registerKernel(kernelName, { executeFn });
}
