"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcMatrix3D = void 0;
const CalcElement_1 = require("./CalcElement");
class CalcMatrix3D extends CalcElement_1.CalcElement {
    constructor(rows = 1, cols = 1, depth = 1) {
        super(rows, cols, depth);
    }
    isMatrix3D() {
        return true;
    }
}
exports.CalcMatrix3D = CalcMatrix3D;
