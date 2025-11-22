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
      //console.log(`\n--- Backpropagation: Last Layer (${layer.getType()}) ---`);
      //console.log("sigma (A - Y):", sigma.get());
    } /* else {
      //console.log(`\n--- Backpropagation: Hidden Layer (${layer.getType()}) ---`);
      //console.log("sigma (dA_prev from next layer):", sigma.get());
    }*/

    //console.log("dZ (gradient of linear output):", dZ.get());

    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
    const [gW, gb, dA_prev] = dZ.backwardPropagation(layer.W, previousActivations, regularization, numberOfExamples);

    //console.log("gW (weight gradients):", gW.get());
    //console.log("gb (bias gradients):", gb.get());
    //console.log("dA_prev (propagating to previous layer):", dA_prev.get());

    layer.gW.replace(gW);
    layer.gb.replace(gb);

    return dA_prev;
  }
}
