"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTrainer = void 0;
const AbstractTrainer_1 = require("./AbstractTrainer");
const Math_1 = require("../../Math");
class BatchTrainer extends AbstractTrainer_1.AbstractTrainer {
    constructor(network, optimizer, costFunction) {
        super(network, optimizer, costFunction);
        this._batchSize = 100;
    }
    setBatchSize(size) {
        this._batchSize = size;
        return this;
    }
    train(inputDataset, outputDataset) {
        const numberOfExamples = inputDataset.getNumberOfExamples();
        let t = 0;
        this.optimizer.setBatchSize(this._batchSize);
        this.optimizer.setLearningRate(this.learningRate);
        let startTime = new Date().getTime();
        for (let i = 0; i < this.iterations; i += 1) {
            for (let offset = 0; offset < numberOfExamples; offset += this._batchSize) {
                const input = inputDataset.getBatch(offset, Math.min(numberOfExamples - offset, this._batchSize));
                const output = outputDataset.getBatch(offset, Math.min(numberOfExamples - offset, this._batchSize));
                const predictions = this.network.forward(input);
                const sigma = this.costFunction.derivative(output, predictions, this.network.getLastLayer());
                this.network.backward(input, this.regularization, sigma);
                this.optimizer.setT(++t);
                this.network.getLayers().forEach((layer) => {
                    this.optimizer.optimize(layer);
                });
                input.destroy();
                output.destroy();
                predictions.destroy();
                sigma.destroy();
            }
            if (this.verbose && (i + 1) % this.verboseStep === 0) {
                const currentResult = this.cost(this.network.forward(inputDataset.data), outputDataset.data);
                const endTime = new Date().getTime();
                console.log(`Iteration: ${i + 1} | Cost: ${(0, Math_1.round)(currentResult.cost, 5)} | Accuracy: ${(0, Math_1.round)(currentResult.accuracy, 2)}% | Time: ${(endTime - startTime) / 1000} s.`);
                this.stepCallback({
                    iteration: i,
                });
                startTime = new Date().getTime();
            }
        }
        return this;
    }
}
exports.BatchTrainer = BatchTrainer;
