"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurelinLayer = void 0;
const types_1 = require("../../types");
const AbstractLayer1D_1 = require("./AbstractLayer1D");
class PurelinLayer extends AbstractLayer1D_1.AbstractLayer1D {
    activation(m) {
        return m;
    }
    getType() {
        return types_1.LayerType.purelin;
    }
    derivative(delta) {
        return delta.calcSync((calc) => {
            return calc.setZeros().add(1.0);
        });
    }
}
exports.PurelinLayer = PurelinLayer;
