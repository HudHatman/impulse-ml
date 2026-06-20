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
      dZ = sigma.multiply(layer.derivative(layer.Z));
    }

    layer.gW.replace(dZ.dot(previousActivations.transpose()).divide(numberOfExamples));
    layer.gb.replace(dZ.rowwiseSum().divide(numberOfExamples));

    const dA_prev = layer.W.transpose().dot(dZ);

    dZ.destroy();

    return dA_prev;
  }
}
