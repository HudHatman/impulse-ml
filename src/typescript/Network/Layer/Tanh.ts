import { CalcMatrix2D } from "../../Math";
import { LayerType } from "../../types";
import { AbstractLayer1D } from "./AbstractLayer1D";

class TanhLayer extends AbstractLayer1D {
  activationAsync(value: CalcMatrix2D): Promise<CalcMatrix2D> {
    throw new Error("Method not implemented.");
  }
  activation(m: CalcMatrix2D): CalcMatrix2D {
    return m.tanh();
  }

  getType(): LayerType {
    return LayerType.tanh;
  }

  derivative(sigma: CalcMatrix2D): CalcMatrix2D {
    return sigma.tanhDerivative();
  }
}

export { TanhLayer };
