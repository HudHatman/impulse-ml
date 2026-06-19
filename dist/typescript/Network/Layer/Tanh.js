"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TanhLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class TanhLayer extends AbstractLayer1D_1.AbstractLayer1D {
    activation(m) {
        return m.tanh();
    }
    getType() {
        return types_1.LayerType.tanh;
    }
    derivative(sigma) {
        return sigma.tanhDerivative();
    }
}
exports.TanhLayer = TanhLayer;
