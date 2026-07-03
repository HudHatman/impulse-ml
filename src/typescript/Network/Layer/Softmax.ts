import { Calc, CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class SoftmaxLayer extends AbstractLayer1D {
  activation(Z: CalcMatrix2D): CalcMatrix2D {
    return Calc.instance(({softmax, clone}) => {
      return softmax(clone(Z));
    })
  }

  getType(): LayerType {
    return LayerType.softmax;
  }

  derivative(delta: CalcMatrix2D): CalcMatrix2D {
    // When CrossEntropyCost is used with Softmax, the cost function's derivative
    // already computes dZ (A - Y). We should just pass it through.
    return delta;
  }
}

export { SoftmaxLayer };
