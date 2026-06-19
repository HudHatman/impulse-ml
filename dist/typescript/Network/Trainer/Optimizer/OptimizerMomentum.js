"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerMomentum = void 0;
const AbstractOptimizer_1 = require("./AbstractOptimizer");
class OptimizerMomentum extends AbstractOptimizer_1.AbstractOptimizer {
    constructor() {
        super(...arguments);
        this.beta = 0.9;
    }
    optimize(layer) {
        this.momentum(layer, this.learningRate);
    }
    setBeta(beta) {
        this.beta = beta;
        return this;
    }
    momentum(layer, learningRate) {
        // Fix: momentum uses previous vW/vb (exponential moving average of gradients),
        // not gW twice. Old code was: vW = gW*beta + gW*(1-beta) = gW (identity — no momentum).
        const newVW = layer.vW.multiply(this.beta).add(layer.gW.multiply(1 - this.beta));
        const newVb = layer.vb.multiply(this.beta).add(layer.gb.multiply(1 - this.beta));
        // Destroy the temporary multiply results that were consumed by add()
        // (add() returns a new matrix; the multiply() intermediates are now orphaned)
        layer.vW.replace(newVW);
        layer.vb.replace(newVb);
        const deltaW = layer.vW.multiply(learningRate);
        const deltaB = layer.vb.multiply(learningRate);
        layer.W.replace(layer.W.subtract(deltaW));
        layer.b.replace(layer.b.subtract(deltaB));
        deltaW.destroy();
        deltaB.destroy();
    }
}
exports.OptimizerMomentum = OptimizerMomentum;
