"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcColVector = void 0;
const CalcElement_1 = require("./CalcElement");
class CalcColVector extends CalcElement_1.CalcElement {
    constructor(cols = 1) {
        super(1, cols);
    }
    isColVector() {
        return true;
    }
    static fromMemory(memory, cols) {
        const result = new CalcColVector(cols);
        result._memory = memory;
        result._allocated = true;
        return result;
    }
}
exports.CalcColVector = CalcColVector;
