import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { CalcMatrix2D } from "../../../Math";
import { Layers } from "../../../types";
import { LayerType } from "../../../types";

export class Backpropagation1Dto1D extends AbstractBackPropagation {
  propagate(
    input: CalcMatrix2D,
    numberOfExamples: number,
    regularization: number,
    layer: Layers,
    sigma: CalcMatrix2D,
    isLastLayer: boolean,
  ): CalcMatrix2D {
    let dZ = sigma;

    if (isLastLayer && layer.getType() !== LayerType.softmax) {
      dZ.replace(sigma.multiply(layer.derivative(layer.Z)));
    }

    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
    const [gW, gb, dA_prev] = dZ.backwardPropagation(layer.W, previousActivations, regularization, numberOfExamples);

    layer.gW.replace(gW);
    layer.gb.replace(gb);

    return dA_prev;
  }
}
