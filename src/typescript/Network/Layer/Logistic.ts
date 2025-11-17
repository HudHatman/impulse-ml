import { CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class LogisticLayer extends AbstractLayer1D {
  activation(m: CalcMatrix2D): CalcMatrix2D {
    return m.logisticForwardPropagation();
  }

  getType(): LayerType {
    return LayerType.logistic;
  }

  derivative(delta: CalcMatrix2D): CalcMatrix2D {
    return delta.logisticBackwardPropagation();
  }
}

export { LogisticLayer };
