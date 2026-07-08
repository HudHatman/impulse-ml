import { WebGLDevice } from './WebGLDevice';
import { WebGLFunction } from './WebGLFunction';
import { getKernel } from './kernelRegistry';

/**
 * Represents a loaded module (e.g., "algebra", "matrix") on the WebGL device.
 * Routes kernel function lookups to the device's shader cache and kernel registry.
 */
export class WebGLModule {
  private device: WebGLDevice;
  private moduleName: string;

  constructor(device: WebGLDevice, moduleName: string) {
    this.device = device;
    this.moduleName = moduleName;
  }

  /**
   * Loads a kernel function by name from the kernel registry.
   * The kernel name should match the full name (e.g., "algebra_add_matrix").
   */
  loadFunction(kernelName: string): WebGLFunction {
    const entry = getKernel(kernelName);
    return new WebGLFunction(this.device, kernelName, entry.executeFn);
  }

  getDevice(): WebGLDevice {
    return this.device;
  }

  getModuleName(): string {
    return this.moduleName;
  }
}
