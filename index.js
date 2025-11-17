const nodenative = require('./dist/impulse-math-device-ts.dev.js');
//import {CalcScalar} from "./dist/impulse-math-device-ts.dev.js";
//const { CalcScalar } = Math;
//import * as Math from "./dist/impulse-math-device-ts.dev.js";
//console.log(nodenative, Math)
const _input = new Float64Array([1,2,3,4,5,6]);
const _input2 = new Float64Array([7,8,9,10,11,12,13]);
const m1 = new nodenative.CalcMatrix2D(6, 1).allocate().set(_input);
const m2 = new nodenative.CalcMatrix2D(6, 1).allocate().set(_input2);
return
m1.calcAsync((c1) => {
  c1.add(m2).then((res) => {
    res.calcAsync((c2) => {
      c2.add(m2).then((res) => {
        console.log(res, res.get())
      })
    })
  })
})
return;
console.log(nodenative);
//const m3 = new nodenative.CalcMatrix2D(6, 1).allocate().set(_input2);
//console.log(m3.replicate(6, 6).get());
/*const m3 = new nodenative.CalcMatrix2D(1, 1).allocate();
m3.setRandom(2);
const res = m1.dot(m2);
const res2 = m3.replicate(2, 2);
console.log(res, res2.get(), res.add(res2).get());*/
//console.log(res.get(), res2.get());
//console.log(m1.dot(m2).get())

/*const m = new nodenative.CalcMatrix2D(2, 2).allocate().set(_input);
m.calcSync((calc) => {
  calc.pow(2);
});
console.log(m, m.get());
const mm = new nodenative.CalcMatrix2D(2, 2).allocate();
console.log(mm.setZeros().get())
const mmm = new nodenative.CalcMatrix2D(2, 2).allocate();
console.log(mmm.setRandom(2).get())
//console.log(m.dot(mm).get())*/
return;
const cpu = new nodenative.native.Device.CPU();
console.log("Device CPU: ", cpu);

const input = new Float64Array([1, 2, 3, 4, 5]);
const output = new Float64Array([0]);

const memoryAllocResultInput = cpu.alloc(input.length).set(input);
console.log("memoryAllocResultInput", memoryAllocResultInput, memoryAllocResultInput.get())

const memoryAllocResultOutput = cpu.alloc(output.length).set(output);
console.log("memoryAllocResultOutput", memoryAllocResultOutput)
const moduleTest = cpu.loadModule("test");
const moduleTestFunction = moduleTest.loadFunction("calculate_sum");
console.log(moduleTest, moduleTestFunction);
moduleTestFunction.execute([memoryAllocResultInput], [memoryAllocResultOutput]);
console.log(memoryAllocResultInput.get())
console.log(memoryAllocResultOutput.get())
