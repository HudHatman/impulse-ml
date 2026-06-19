"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerAdagrad = void 0;
const AbstractOptimizer_1 = require("./AbstractOptimizer");
const Math_1 = require("../../../Math/");
class OptimizerAdagrad extends AbstractOptimizer_1.AbstractOptimizer {
    constructor() {
        super(...arguments);
        this.epsilon = 1e-8;
    }
    optimize(layer) {
        this.adagrad(layer, this.learningRate);
    }
    adagrad(layer, learningRate) {
        // Delegate the entire Adagrad update to a single C++ kernel call,
        // eliminating the chain of JS-side intermediate CalcMatrix2D allocations.
        const updatedMatrices = Math_1.CalcMatrix2D.runAdagradOptimizer(layer.W, layer.b, layer.gW, layer.gb, layer.dW, layer.db, learningRate, this.epsilon);
        layer.W.replace(updatedMatrices.W);
        layer.b.replace(updatedMatrices.b);
        layer.dW.replace(updatedMatrices.dW);
        layer.db.replace(updatedMatrices.db);
    }
}
exports.OptimizerAdagrad = OptimizerAdagrad;
