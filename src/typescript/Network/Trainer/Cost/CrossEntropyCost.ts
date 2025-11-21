import { AbstractCost } from "./AbstractCost";
import { CalcMatrix2D } from "../../../Math";
import { AbstractLayer } from "../../Layer";
import { LayerType} from "../../../types";

export class CrossEntropyCost extends AbstractCost {
  private readonly epsilon = 1e-8;

  loss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D): number {
    const miniBatchSize = correctOutput.cols();
    const logPredictions = predictions.add(this.epsilon).log();
    const cost = correctOutput.multiply(logPredictions).sum().get()[0];
    return -cost / miniBatchSize;
  }

  derivative(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, lastLayer: AbstractLayer): CalcMatrix2D {
    if (lastLayer.getType() === LayerType.softmax) {
      // For Softmax, we compute dZ directly
      return predictions.subtract(correctOutput);
    }

    // For other layers (like Sigmoid), we calculate dA
    const denominator = predictions.multiply(predictions.minusOne()).add(this.epsilon);
    const dA = predictions.subtract(correctOutput).divide(denominator).multiply(-1);
    
    return dA;
  }
}
