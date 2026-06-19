"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerAdam = void 0;
const AbstractOptimizer_1 = require("./AbstractOptimizer");
const Math_1 = require("../../../Math/");
class OptimizerAdam extends AbstractOptimizer_1.AbstractOptimizer {
    constructor() {
        super(...arguments);
        this.beta1 = 0.9;
        this.beta2 = 0.999;
        this.epsilon = 1e-8;
    }
    optimize(layer) {
        const { W, b, gW, gb, vW, vb, sW, sb } = layer;
        const { learningRate, beta1, beta2, epsilon, t } = this;
        const updatedMatrices = Math_1.CalcMatrix2D.runAdamOptimizer(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
        layer.W.replace(updatedMatrices.W);
        layer.b.replace(updatedMatrices.b);
        layer.vW.replace(updatedMatrices.vW);
        layer.vb.replace(updatedMatrices.vb);
        layer.sW.replace(updatedMatrices.sW);
        layer.sb.replace(updatedMatrices.sb);
    }
}
exports.OptimizerAdam = OptimizerAdam;
