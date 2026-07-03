import { AbstractCost } from "./AbstractCost";
import { Calc, CalcMatrix2D } from "../../../Math";

export class CrossEntropyCost extends AbstractCost {
  private readonly epsilon = 1e-8;

  loss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D): number {
    return Calc.instance(({crossEntropyLoss}) => {
      return crossEntropyLoss(correctOutput, predictions, this.epsilon);
    });
  }
}
