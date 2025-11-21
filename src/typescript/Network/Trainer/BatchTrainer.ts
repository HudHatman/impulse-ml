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
    const numberOfExamples = inputDataset.data.rows();
    let t = 0;

    this.optimizer.setBatchSize(this._batchSize);
    this.optimizer.setLearningRate(this.learningRate);

    for (let i = 0; i < this.iterations; i += 1) {
      const startTime = new Date().getTime();

      for (let batch = 0, offset = 0; batch < numberOfExamples; offset += this._batchSize) {
        console.log(offset, Math.min(this._batchSize, numberOfExamples - offset))
        const input = inputDataset.getBatch(offset, this._batchSize);
        const output = outputDataset.getBatch(offset, this._batchSize);

        const predictions = this.network.forward(input);
        const sigma = this.costFunction.derivative(output, predictions, this.network.getLastLayer());

        this.network.backward(input, this.regularization, sigma);

        this.optimizer.setT(++t);

        this.network.getLayers().forEach((layer) => {
          this.optimizer.optimize(layer);
        })

        if (this.verbose && (i + 1) % this.verboseStep === 0) {
          const currentResult = this.cost(predictions, output);
          const endTime = new Date().getTime();

          console.log(
            `Iteration: ${i + 1} | Cost: ${round(currentResult.cost, 5)} | Accuracy: ${round(
              currentResult.accuracy,
              2
            )}% | Time: ${(endTime - startTime) / 1000} s.`
          );
        }

        input.destroy();
        output.destroy();
        predictions.destroy()
        sigma.destroy();
      }

      this.stepCallback({
        iteration: i,
      });
    }

    return this;
  }
}
