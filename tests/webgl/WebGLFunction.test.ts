import { WebGLDevice } from '../../src/typescript/Math/Computation/WebGL/WebGLDevice';
import { WebGLFunction, KernelExecuteFn } from '../../src/typescript/Math/Computation/WebGL/WebGLFunction';
import { WebGLModule } from '../../src/typescript/Math/Computation/WebGL/WebGLModule';
import { WebGLMemory } from '../../src/typescript/Math/Computation/WebGL/WebGLMemory';
import { registerKernel, kernelRegistry } from '../../src/typescript/Math/Computation/WebGL/kernelRegistry';

describe('WebGLFunction and Kernel Registry', () => {
  let device: WebGLDevice;

  beforeEach(() => {
    device = new WebGLDevice();
    // Clear registry between tests
    kernelRegistry.clear();
  });

  afterEach(() => {
    device.destroy();
  });

  describe('WebGLFunction', () => {
    it('should execute a kernel that writes a known value to outputs', () => {
      const executeFn: KernelExecuteFn = (gl, dev, inputs, outputs) => {
        // Simple kernel: set output[0] to a known value
        outputs[0].set(new Float32Array([42.0, 43.0, 44.0, 45.0]));
      };

      const fn = new WebGLFunction(device, 'test_kernel', executeFn);
      const output = device.alloc(4);
      fn.execute([], [output]);

      const result = output.get();
      expect(result[0]).toBeCloseTo(42.0);
      expect(result[1]).toBeCloseTo(43.0);
      expect(result[2]).toBeCloseTo(44.0);
      expect(result[3]).toBeCloseTo(45.0);

      output.free();
    });

    it('should pass inputs and outputs to the kernel function', () => {
      const executeFn: KernelExecuteFn = (gl, dev, inputs, outputs) => {
        // Kernel: copy input to output
        const data = inputs[0].get();
        outputs[0].set(data);
      };

      const fn = new WebGLFunction(device, 'copy_kernel', executeFn);
      const input = device.alloc(3);
      input.set(new Float32Array([1.0, 2.0, 3.0]));
      const output = device.alloc(3);

      fn.execute([input], [output]);

      const result = output.get();
      expect(result[0]).toBeCloseTo(1.0);
      expect(result[1]).toBeCloseTo(2.0);
      expect(result[2]).toBeCloseTo(3.0);

      input.free();
      output.free();
    });

    it('should return undefined in synchronous mode', () => {
      const executeFn: KernelExecuteFn = () => {};
      const fn = new WebGLFunction(device, 'noop', executeFn);

      const result = fn.execute([], []);
      expect(result).toBeUndefined();
    });

    it('should return a Promise in async mode', async () => {
      const executeFn: KernelExecuteFn = () => {};
      const fn = new WebGLFunction(device, 'noop_async', executeFn);

      const result = fn.execute([], [], true);
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeUndefined();
    });

    it('getKernelName() returns the kernel name', () => {
      const executeFn: KernelExecuteFn = () => {};
      const fn = new WebGLFunction(device, 'my_kernel', executeFn);
      expect(fn.getKernelName()).toBe('my_kernel');
    });
  });

  describe('kernelRegistry', () => {
    it('should register and retrieve a kernel', () => {
      const executeFn: KernelExecuteFn = () => {};
      registerKernel('test_op', { executeFn });

      const { getKernel } = require('../../src/typescript/Math/Computation/WebGL/kernelRegistry');
      const entry = getKernel('test_op');
      expect(entry.executeFn).toBe(executeFn);
    });

    it('should throw for an unregistered kernel', () => {
      const { getKernel } = require('../../src/typescript/Math/Computation/WebGL/kernelRegistry');
      expect(() => getKernel('nonexistent_kernel')).toThrow('Kernel not registered: nonexistent_kernel');
    });
  });

  describe('WebGLModule.loadFunction()', () => {
    it('should load a registered kernel and return a WebGLFunction', () => {
      const executeFn: KernelExecuteFn = (gl, dev, inputs, outputs) => {
        outputs[0].set(new Float32Array([99.0]));
      };
      registerKernel('algebra_test', { executeFn });

      const mod = device.loadModule('algebra');
      const fn = mod.loadFunction('algebra_test');

      expect(fn).toBeInstanceOf(WebGLFunction);
      expect(fn.getKernelName()).toBe('algebra_test');

      // Verify execution works end-to-end
      const output = device.alloc(1);
      fn.execute([], [output]);
      const result = output.get();
      expect(result[0]).toBeCloseTo(99.0);
      output.free();
    });

    it('should throw when loading an unregistered kernel', () => {
      const mod = device.loadModule('algebra');
      expect(() => mod.loadFunction('unknown_kernel')).toThrow('Kernel not registered: unknown_kernel');
    });

    it('should load different kernels independently', () => {
      const addFn: KernelExecuteFn = (gl, dev, inputs, outputs) => {
        outputs[0].set(new Float32Array([10.0]));
      };
      const mulFn: KernelExecuteFn = (gl, dev, inputs, outputs) => {
        outputs[0].set(new Float32Array([20.0]));
      };

      registerKernel('algebra_add', { executeFn: addFn });
      registerKernel('algebra_mul', { executeFn: mulFn });

      const mod = device.loadModule('algebra');
      const addFunc = mod.loadFunction('algebra_add');
      const mulFunc = mod.loadFunction('algebra_mul');

      const output1 = device.alloc(1);
      const output2 = device.alloc(1);

      addFunc.execute([], [output1]);
      mulFunc.execute([], [output2]);

      expect(output1.get()[0]).toBeCloseTo(10.0);
      expect(output2.get()[0]).toBeCloseTo(20.0);

      output1.free();
      output2.free();
    });
  });
});
