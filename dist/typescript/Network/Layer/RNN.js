"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNNLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class RNNLayer extends AbstractLayer1D_1.AbstractLayer1D {
    activation(m) {
        return m.tanh();
    }
    getType() {
        return types_1.LayerType.rnn;
    }
    derivative(sigma) {
        return sigma.tanhDerivative();
    }
}
exports.RNNLayer = RNNLayer;
