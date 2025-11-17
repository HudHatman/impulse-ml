import nodenative from './node-native-memory.cjs'

console.log("CUDA driver version: ", nodenative.cudaDriverVersion());
console.log("CUDA device count: ", nodenative.cudaDeviceCount());

console.log(nodenative)

const gpu = new nodenative.Device.GPU(0);
console.log("Device GPU: ", gpu);

const input = new Float64Array([1, 2, 3, 4, 5]);
const output = new Float64Array([0]);

const memoryAllocResultInput = gpu.alloc(input.length).set(input);
console.log("memoryAllocResultInput", memoryAllocResultInput)

const memoryAllocResultOutput = gpu.alloc(output.length).set(output);
console.log("memoryAllocResultOutput", memoryAllocResultOutput)
const moduleTest = gpu.loadModule("test");
const moduleTestFunction = moduleTest.loadFunction("testFunction");
console.log(moduleTest, moduleTestFunction);
moduleTestFunction.execute(memoryAllocResultInput, memoryAllocResultOutput);
console.log(memoryAllocResultOutput.get())
