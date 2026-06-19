"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTrainer = void 0;
class AbstractTrainer {
    constructor(network, optimizer, costFunction) {
        this.regularization = 1e-4;
        this.iterations = 1000;
        this.learningRate = 0.001;
        this.verbose = true;
        this.verboseStep = 1;
        this.stepCallback = (data) => undefined;
        this.network = network;
        this.optimizer = optimizer;
        this.costFunction = costFunction;
    }
    setRegularization(regularization) {
        this.regularization = regularization;
        return this;
    }
    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }
    setLearningRate(learningRate) {
        this.learningRate = learningRate;
        return this;
    }
    setVerbose(verbose) {
        this.verbose = verbose;
        return this;
    }
    setVerboseStep(verboseStep) {
        this.verboseStep = verboseStep;
        return this;
    }
    setStepCallback(stepCallback) {
        this.stepCallback = stepCallback;
        return this;
    }
    cost(predictions, correctOutput) {
        const miniBatchSize = correctOutput.cols();
        let cost = this.costFunction.loss(correctOutput, predictions);
        if (this.regularization > 0) {
            let penalty = 0;
            this.network.getLayers().forEach((layer) => {
                const p = layer.penalty();
                if (typeof p === "number") {
                    penalty += p;
                }
                else {
                    penalty += p.get()[0];
                    p.destroy();
                }
            });
            cost += (this.regularization / (2 * miniBatchSize)) * penalty;
        }
        let correctPredictions = 0;
        for (let i = 0; i < miniBatchSize; i += 1) {
            const predictionCol = predictions.col(i);
            const outputCol = correctOutput.col(i);
            const predictionMax = predictionCol.maxCoeff();
            const outputMax = outputCol.maxCoeff();
            if (predictionMax === outputMax) {
                correctPredictions++;
            }
            predictionCol.destroy();
            outputCol.destroy();
        }
        const accuracy = (correctPredictions / miniBatchSize) * 100.0;
        return {
            cost,
            accuracy,
        };
    }
}
exports.AbstractTrainer = AbstractTrainer;
