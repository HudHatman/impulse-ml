import { WebGLDevice } from './WebGLDevice';
import { WebGLMemory } from './WebGLMemory';

/** Function signature for kernel execution logic */
export type KernelExecuteFn = (
  gl: WebGLRenderingContext,
  device: WebGLDevice,
  inputs: WebGLMemory[],
  outputs: WebGLMemory[]
) => void;

/**
 * Represents a loaded kernel function ready for execution.
 */
export class WebGLFunction {
  private device: WebGLDevice;
  private kernelName: string;
  private executeFn: KernelExecuteFn;

  constructor(device: WebGLDevice, kernelName: string, executeFn: KernelExecuteFn) {
    this.device = device;
    this.kernelName = kernelName;
    this.executeFn = executeFn;
  }

  /**
   * Executes the kernel function.
   * The execute method signature matches the native device interface:
   *   execute(inputs: Memory[], outputs: Memory[], async: boolean)
   * For WebGL, async wraps in Promise.resolve() since GL is synchronous.
   */
  execute(inputs: WebGLMemory[], outputs: WebGLMemory[], async: boolean = false): void | Promise<void> {
    const gl = this.device.getGL();
    this.executeFn(gl, this.device, inputs, outputs);

    if (async) {
      return Promise.resolve();
    }
  }

  getKernelName(): string {
    return this.kernelName;
  }
}
