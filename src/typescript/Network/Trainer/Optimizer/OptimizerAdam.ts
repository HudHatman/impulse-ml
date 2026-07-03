import { AbstractOptimizer } from "./AbstractOptimizer";
import { Layers } from "../../../types";
import { Calc, CalcMatrix2D } from "../../../Math/";

export class OptimizerAdam extends AbstractOptimizer {
  private readonly beta1 = 0.9;
  private readonly beta2 = 0.999;
  private readonly epsilon = 1e-8;

  optimize(layer: Layers): void {
    const { W, b, gW, gb, vW, vb, sW, sb } = layer;
    const { learningRate, beta1, beta2, epsilon, t } = this;

    const [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB] = Calc.instance(({adamOptimize}) => {
      return adamOptimize(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
    })

    layer.W.replace(updatedW);
    layer.b.replace(updatedB);
    layer.vW.replace(updatedVW);
    layer.vb.replace(updatedVB);
    layer.sW.replace(updatedSW);
    layer.sb.replace(updatedSB);
  }
}
