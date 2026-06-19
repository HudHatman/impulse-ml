"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backpropagation1Dto1D = void 0;
const AbstractBackpropagation_1 = require("./AbstractBackpropagation");
const types_1 = require("../../../types");
class Backpropagation1Dto1D extends AbstractBackpropagation_1.AbstractBackPropagation {
    propagate(input, numberOfExamples, regularization, layer, sigma, isLastLayer) {
        let dZ = sigma;
        if (isLastLayer && layer.getType() !== types_1.LayerType.softmax) {
            dZ.replace(sigma.multiply(layer.derivative(layer.Z)));
        }
        const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
        const [gW, gb, dA_prev] = dZ.backwardPropagation(layer.W, previousActivations, regularization, numberOfExamples);
        layer.gW.replace(gW);
        layer.gb.replace(gb);
        return dA_prev;
    }
}
exports.Backpropagation1Dto1D = Backpropagation1Dto1D;
