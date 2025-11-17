import { AbstractCost } from "./AbstractCost";
import { CalcMatrix2D } from "../../../Math";
import { AbstractLayer } from "../../Layer/AbstractLayer";

export class MeanSquaredErrorCost extends AbstractCost {
  loss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D): number {
    const miniBatchSize = correctOutput.cols();
    const error = predictions.subtract(correctOutput);
    const cost = error.pow(2).sum().get()[0];
    return cost / (2 * miniBatchSize);
  }

  derivative(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, lastLayer: AbstractLayer): CalcMatrix2D {
    return predictions.subtract(correctOutput);
  }
}
