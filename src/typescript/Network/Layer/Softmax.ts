import { CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class SoftmaxLayer extends AbstractLayer1D {
  activation(m: CalcMatrix2D): CalcMatrix2D {
    return m.softmax();
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
