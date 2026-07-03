import { Calc, CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class ReluLayer extends AbstractLayer1D {
  private readonly alpha = 0.01;

  activation(Z: CalcMatrix2D): CalcMatrix2D {
    return Calc.instance(({leakyRelu, clone}) => {
      return leakyRelu(clone(Z));
    })
  }

  getType(): LayerType {
    return LayerType.relu;
  }

  derivative(delta: CalcMatrix2D) {
    return Calc.instance(({leakyReluBackPropagation, clone}) => {
      return leakyReluBackPropagation(clone(delta), this.alpha);
    })
  }
}

export { ReluLayer };
