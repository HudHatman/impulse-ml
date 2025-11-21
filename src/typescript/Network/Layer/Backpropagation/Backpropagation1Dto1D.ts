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
    let dZ: CalcMatrix2D;

    // If this is the last layer and it's Softmax, then sigma is already dZ
    if (isLastLayer && layer.getType() === LayerType.softmax) {
      dZ = sigma;
    } else {
      // Otherwise, sigma is dA, and we need to compute dZ
      dZ = sigma.multiply(layer.derivative(layer.Z));
    }

    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;

    // Calculate gradients for weights and biases
    this.layer.gW = dZ
      .dot(previousActivations.transpose())
      .divide(numberOfExamples)
      .add(this.layer.W.multiply(regularization / numberOfExamples));
    this.layer.gb = dZ.rowwiseSum().divide(numberOfExamples);

    // Calculate dA for the previous layer to continue the chain
    const dA_prev = this.layer.W.transpose().dot(dZ);

    return dA_prev;
  }
}
