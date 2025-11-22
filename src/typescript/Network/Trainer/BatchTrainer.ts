import { AbstractTrainer } from "./AbstractTrainer";
import { Dataset } from "../../Dataset";
import { round } from "../../Math";
import { AbstractOptimizer } from "./Optimizer/AbstractOptimizer";
import { Network } from "../index";
import { AbstractCost } from "./Cost/AbstractCost";

export class BatchTrainer extends AbstractTrainer {
  private _batchSize: number = 100;
  constructor(network: Network, optimizer: AbstractOptimizer, costFunction: AbstractCost) {
    super(network, optimizer, costFunction);
  }

  public setBatchSize(size: number) {
    this._batchSize = size;
    return this;
  }

  train(inputDataset: Dataset, outputDataset: Dataset): AbstractTrainer {
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

        console.log(
          `Iteration: ${i + 1} | Cost: ${round(currentResult.cost, 5)} | Accuracy: ${round(
            currentResult.accuracy,
            2,
          )}% | Time: ${(endTime - startTime) / 1000} s.`,
        );

        this.stepCallback({
          iteration: i,
        });

        startTime = new Date().getTime();
      }
    }

    return this;
  }
}
