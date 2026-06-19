"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerGradientDescent = void 0;
const AbstractOptimizer_1 = require("./AbstractOptimizer");
class OptimizerGradientDescent extends AbstractOptimizer_1.AbstractOptimizer {
    optimize(layer) {
        this.gradientDescent(layer, this.learningRate);
    }
    gradientDescent(layer, learningRate) {
        // Compute intermediates, replace layer weights in-place, then destroy intermediates.
        const deltaW = layer.gW.multiply(learningRate);
        const deltaB = layer.gb.multiply(learningRate);
        layer.W.replace(layer.W.subtract(deltaW));
        layer.b.replace(layer.b.subtract(deltaB));
        deltaW.destroy();
        deltaB.destroy();
    }
}
exports.OptimizerGradientDescent = OptimizerGradientDescent;
