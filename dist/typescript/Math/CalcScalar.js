"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcScalar = void 0;
const CalcElement_1 = require("./CalcElement");
class CalcScalar extends CalcElement_1.CalcElement {
    constructor() {
        super(1);
    }
    isScalar() {
        return true;
    }
}
exports.CalcScalar = CalcScalar;
