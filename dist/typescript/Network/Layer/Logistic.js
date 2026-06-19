"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class LogisticLayer extends AbstractLayer1D_1.AbstractLayer1D {
    activation(m) {
        return m.logisticForwardPropagation();
    }
    getType() {
        return types_1.LayerType.logistic;
    }
    derivative(delta) {
        return delta.logisticBackwardPropagation();
    }
}
exports.LogisticLayer = LogisticLayer;
