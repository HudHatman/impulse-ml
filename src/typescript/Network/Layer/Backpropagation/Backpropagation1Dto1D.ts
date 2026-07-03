import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { Calc, CalcMatrix2D } from "../../../Math";
import { Layers } from "../../../types";

export class Backpropagation1Dto1D extends AbstractBackPropagation {
  propagate(
    input: CalcMatrix2D,
    numberOfExamples: number,
    layer: Layers,
    sigma: CalcMatrix2D,
    isLastLayer: boolean,
  ): CalcMatrix2D {
    const previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;

    return Calc.instance(({subtract, multiply, dot, transpose, divide, rowwiseSum}) => {
      let dZ: CalcMatrix2D;

      if (isLastLayer) {
        dZ = subtract(layer.A, sigma)
      } else {
        dZ = multiply(sigma, layer.derivative(layer.Z))
      }

      layer.gW.replace(divide(dot(dZ, transpose(previousActivations)), numberOfExamples));
      layer.gb.replace(divide(rowwiseSum(dZ), numberOfExamples));

      const dA_prev = dot(transpose(layer.W), dZ);

      dZ.destroy();

      return dA_prev;
    })
  }
}
