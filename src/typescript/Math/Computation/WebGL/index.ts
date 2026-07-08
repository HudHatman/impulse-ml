// WebGL computation backend - barrel exports
export { WebGLDevice } from './WebGLDevice';
export { WebGLModule } from './WebGLModule';
export { WebGLMemory, computeTextureDimensions } from './WebGLMemory';
export { WebGLFunction, KernelExecuteFn } from './WebGLFunction';
export { registerKernel, getKernel, kernelRegistry, KernelEntry } from './kernelRegistry';
export { executeKernel } from './executeKernel';
export { registerElementwiseKernel, registerCustomKernel } from './kernelHelpers';

// Register all kernels on import
import './kernels';
