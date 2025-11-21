import { AbstractOptimizer } from "./AbstractOptimizer";
import { Layers } from "../../../types";
import { CalcMatrix2D } from "../../../Math/";

export class OptimizerAdam extends AbstractOptimizer {
  private readonly beta1 = 0.9;
  private readonly beta2 = 0.999;
  private readonly epsilon = 1e-8;

  optimize(layer: Layers): void {
    const { W, b, gW, gb, vW, vb, sW, sb } = layer;
    const { learningRate, beta1, beta2, epsilon, t } = this;

    const updatedMatrices = CalcMatrix2D.runAdamOptimizer(
      W, b, gW, gb, vW, vb, sW, sb,
      learningRate, beta1, beta2, epsilon, t
    );

    layer.W.replace(updatedMatrices.W);
    layer.b.replace(updatedMatrices.b);
    layer.vW.replace(updatedMatrices.vW);
    layer.vb.replace(updatedMatrices.vb);
    layer.sW.replace(updatedMatrices.sW);
    layer.sb.replace(updatedMatrices.sb);
  }
}
