import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { CalcMatrix2D } from "../../../Math";
import { Layers } from "../../../types";

export class Backpropagation1Dto1D extends AbstractBackPropagation {
  propagate(
    input: CalcMatrix2D,
    numberOfExamples: number,
    regularization: number,
    layer: Layers,
    sigma: CalcMatrix2D,
    isLastLayer: boolean,
  ): CalcMatrix2D {
    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;

    let dZ: CalcMatrix2D;

    if (isLastLayer) {
      dZ = layer.A.subtract(sigma);
    } else {
      const dA = sigma.dot(layer.W.transpose());
      dZ = dA.multiply(layer.derivative(layer.Z));

      dA.destroy();
    }

    layer.gW.replace(dZ.dot(previousActivations.transpose()).divide(numberOfExamples));
    layer.gb.replace(dZ.rowwiseSum().divide(numberOfExamples));

    return dZ;
  }
}
