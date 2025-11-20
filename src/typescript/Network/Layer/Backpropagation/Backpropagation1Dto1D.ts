import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { CalcMatrix2D } from "../../../Math";
import { Layers } from "../../../types";

export class Backpropagation1Dto1D extends AbstractBackPropagation {
  propagate(
    input: CalcMatrix2D,
    numberOfExamples: number,
    regularization: number,
    layer: Layers,
    sigma: CalcMatrix2D
  ): CalcMatrix2D {
    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
    const delta = sigma.dot(previousActivations.transpose().conjugate());
    this.layer.gW = delta.divide(numberOfExamples).add(layer.W.multiply(regularization / numberOfExamples));
    this.layer.gb = sigma.rowwiseSum().divide(numberOfExamples);

    if (this.previousLayer !== null) {
      const result = this.layer.W.transpose().dot(sigma);
      return result.multiply(this.layer.previousLayer.derivative(this.layer.previousLayer.Z));
    }
    
    return new CalcMatrix2D();
  }
}
