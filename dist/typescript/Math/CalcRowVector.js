"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcRowVector = void 0;
const CalcElement_1 = require("./CalcElement");
const CalcColVector_1 = require("./CalcColVector");
class CalcRowVector extends CalcElement_1.CalcElement {
    constructor(rows = 1) {
        super(rows);
    }
    isRowVector() {
        return true;
    }
    transpose() {
        const result = CalcColVector_1.CalcColVector.fromMemory(this.getMemory().clone(), this.rows());
        return result;
    }
}
exports.CalcRowVector = CalcRowVector;
