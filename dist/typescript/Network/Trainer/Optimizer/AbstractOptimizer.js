"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractOptimizer = void 0;
class AbstractOptimizer {
    constructor() {
        this.batchSize = 0;
        this.t = 0;
        this.learningRate = 0;
    }
    setBatchSize(batchSize) {
        this.batchSize = batchSize;
        return this;
    }
    setT(t) {
        this.t = t;
        return this;
    }
    setLearningRate(learningRate) {
        this.learningRate = learningRate;
        return this;
    }
}
exports.AbstractOptimizer = AbstractOptimizer;
