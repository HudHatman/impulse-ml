import { CalcMatrix2D } from "../../../Math";

export abstract class AbstractCost {
  abstract loss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D): number;
  abstract derivative(
    correctOutput: CalcMatrix2D,
    predictions: CalcMatrix2D,
    activationDerivative: CalcMatrix2D
  ): CalcMatrix2D;
}
