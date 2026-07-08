import { setDevice, getDevice, WebGLDevice } from '../../src/typescript/Math/Computation';

describe('WebGL Integration', () => {
  let device: WebGLDevice;

  beforeEach(() => {
    device = new WebGLDevice(64, 64);
    setDevice(device);
  });

  afterEach(() => {
    device.destroy();
    // Reset device to null so getDevice() will lazy-load native next time
    setDevice(null as any);
  });

  it('should register WebGLDevice via setDevice and retrieve via getDevice', () => {
    const retrieved = getDevice();
    expect(retrieved).toBe(device);
  });

  it('should allocate memory via getDevice().alloc()', () => {
    const mem = getDevice().alloc(6);
    expect(mem).toBeDefined();

    mem.set(new Float32Array([1, 2, 3, 4, 5, 6]));
    const result = mem.get();
    expect(result.length).toBe(6);
    expect(result[0]).toBeCloseTo(1, 5);
    expect(result[5]).toBeCloseTo(6, 5);

    mem.free();
  });

  it('should load module and function via device.loadModule().loadFunction()', () => {
    const mod = device.loadModule('algebra');
    expect(mod).toBeDefined();

    const fn = mod.loadFunction('algebra_add_matrix');
    expect(fn).toBeDefined();
  });

  it('should execute algebra_add_matrix through the full device interface chain', () => {
    // Full chain: setDevice → getDevice → loadModule → loadFunction → execute
    const dev = getDevice();

    // Allocate two input matrices
    // algebra_add_matrix modifies inputs[0] in-place: m = m + n
    const inputA = dev.alloc(4);
    inputA.set(new Float32Array([1.0, 2.0, 3.0, 4.0]));
    inputA.setWidth(2);
    inputA.setHeight(2);

    const inputB = dev.alloc(4);
    inputB.set(new Float32Array([10.0, 20.0, 30.0, 40.0]));
    inputB.setWidth(2);
    inputB.setHeight(2);

    // Execute kernel: algebra_add_matrix adds n into m (m = m + n, modifies inputs[0])
    const fn = dev.loadModule('algebra').loadFunction('algebra_add_matrix');
    fn.execute([inputA, inputB], [], false);

    const result = inputA.get();
    expect(result[0]).toBeCloseTo(11.0, 3);
    expect(result[1]).toBeCloseTo(22.0, 3);
    expect(result[2]).toBeCloseTo(33.0, 3);
    expect(result[3]).toBeCloseTo(44.0, 3);

    inputA.free();
    inputB.free();
  });

  it('should execute matrix operations through setDevice/getDevice flow', () => {
    const dev = getDevice();

    // Test matrix_set_zeros
    const mem = dev.alloc(4);
    mem.set(new Float32Array([5, 6, 7, 8]));
    mem.setWidth(2);
    mem.setHeight(2);

    const setZerosFn = dev.loadModule('matrix').loadFunction('matrix_set_zeros');
    setZerosFn.execute([mem], [mem], false);

    const zeros = mem.get();
    for (let i = 0; i < zeros.length; i++) {
      expect(zeros[i]).toBe(0);
    }

    mem.free();
  });

  it('should support the full workflow: alloc, set, execute kernel, read result', () => {
    const dev = getDevice();

    // Create matrices for multiplication (dot product)
    // A = 2x3 matrix: [[1,2,3],[4,5,6]]
    const A = dev.alloc(6);
    A.set(new Float32Array([1, 2, 3, 4, 5, 6]));
    A.setWidth(2);
    A.setHeight(3);

    // B = 3x2 matrix: [[7,8],[9,10],[11,12]]
    const B = dev.alloc(6);
    B.set(new Float32Array([7, 8, 9, 10, 11, 12]));
    B.setWidth(3);
    B.setHeight(2);

    // Result = 2x2 matrix
    const C = dev.alloc(4);
    C.setWidth(2);
    C.setHeight(2);

    const dotFn = dev.loadModule('algebra').loadFunction('algebra_dot');
    dotFn.execute([A, B, C], [C], false);

    const result = C.get();
    // C[0,0] = 1*7 + 2*9 + 3*11 = 7 + 18 + 33 = 58
    // C[0,1] = 1*8 + 2*10 + 3*12 = 8 + 20 + 36 = 64
    // C[1,0] = 4*7 + 5*9 + 6*11 = 28 + 45 + 66 = 139
    // C[1,1] = 4*8 + 5*10 + 6*12 = 32 + 50 + 72 = 154
    expect(result[0]).toBeCloseTo(58, 0);
    expect(result[1]).toBeCloseTo(64, 0);
    expect(result[2]).toBeCloseTo(139, 0);
    expect(result[3]).toBeCloseTo(154, 0);

    A.free();
    B.free();
    C.free();
  });
});
