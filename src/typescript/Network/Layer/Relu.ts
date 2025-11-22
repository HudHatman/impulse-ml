import { CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class ReluLayer extends AbstractLayer1D {
  private readonly alpha = 0.01;

  activation(m: CalcMatrix2D): CalcMatrix2D {
    return m.calcSync((calc) => {
      return calc.leakyRelu(this.alpha);
    });
  }

  getType(): LayerType {
    return LayerType.relu;
  }

  derivative(delta: CalcMatrix2D) {
    return delta.calcSync((calc) => {
      return calc.leakyReluBackpropagation(this.alpha);
    });
  }
}

export { ReluLayer };
