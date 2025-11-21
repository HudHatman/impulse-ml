import { AbstractCost } from "./AbstractCost";
import { CalcMatrix2D } from "../../../Math";
import { AbstractLayer } from "../../Layer";
import { LayerType} from "../../../types";

export class CrossEntropyCost extends AbstractCost {
  private readonly epsilon = 1e-8;

  loss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D): number {
    return new CalcMatrix2D().crossEntropyLoss(correctOutput, predictions, this.epsilon);
  }

  derivative(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, lastLayer: AbstractLayer): CalcMatrix2D {
    if (lastLayer.getType() === LayerType.softmax) {
      // For Softmax, we compute dZ directly
      return predictions.subtract(correctOutput);
    }

    // For other layers (like Sigmoid), we calculate dA
    return new CalcMatrix2D().crossEntropyDerivative(correctOutput, predictions, this.epsilon);
  }
}
