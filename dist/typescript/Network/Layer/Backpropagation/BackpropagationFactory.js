"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackpropagationFactory = void 0;
const Backpropagation1Dto1D_1 = require("./Backpropagation1Dto1D");
class BackpropagationFactory {
    static create(previousLayer, layer) {
        return new Backpropagation1Dto1D_1.Backpropagation1Dto1D(layer, previousLayer);
    }
}
exports.BackpropagationFactory = BackpropagationFactory;
