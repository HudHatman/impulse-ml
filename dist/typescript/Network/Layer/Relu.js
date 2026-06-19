"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReluLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class ReluLayer extends AbstractLayer1D_1.AbstractLayer1D {
    constructor() {
        super(...arguments);
        this.alpha = 0.01;
    }
    activation(m) {
        return m.calcSync((calc) => {
            return calc.leakyRelu(this.alpha);
        });
    }
    getType() {
        return types_1.LayerType.relu;
    }
    derivative(delta) {
        return delta.calcSync((calc) => {
            return calc.leakyReluBackpropagation(this.alpha);
        });
    }
}
exports.ReluLayer = ReluLayer;
