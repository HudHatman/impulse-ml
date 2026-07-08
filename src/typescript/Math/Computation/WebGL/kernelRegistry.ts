import { KernelExecuteFn } from './WebGLFunction';

/** Registry entry for a kernel */
export interface KernelEntry {
  executeFn: KernelExecuteFn;
}

/**
 * Maps kernel names to their execution functions.
 * Kernels will be registered by subsequent tasks (5, 6, 7, 8, 9, 10).
 */
const kernelRegistry: Map<string, KernelEntry> = new Map();

/**
 * Registers a kernel with its execution function.
 */
export function registerKernel(name: string, entry: KernelEntry): void {
  kernelRegistry.set(name, entry);
}

/**
 * Retrieves a registered kernel by name.
 * @throws Error if the kernel is not registered.
 */
export function getKernel(name: string): KernelEntry {
  const entry = kernelRegistry.get(name);
  if (!entry) {
    throw new Error(`Kernel not registered: ${name}`);
  }
  return entry;
}

export { kernelRegistry };
