"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftmaxLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class SoftmaxLayer extends AbstractLayer1D_1.AbstractLayer1D {
    activation(m) {
        return m.softmax();
    }
    getType() {
        return types_1.LayerType.softmax;
    }
    derivative(delta) {
        // When CrossEntropyCost is used with Softmax, the cost function's derivative
        // already computes dZ (A - Y). We should just pass it through.
        return delta;
    }
}
exports.SoftmaxLayer = SoftmaxLayer;
