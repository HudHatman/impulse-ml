"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossEntropyCost = void 0;
const AbstractCost_1 = require("./AbstractCost");
const Math_1 = require("../../../Math");
const types_1 = require("../../../types");
class CrossEntropyCost extends AbstractCost_1.AbstractCost {
    constructor() {
        super(...arguments);
        this.epsilon = 1e-8;
    }
    loss(correctOutput, predictions) {
        // Delegate to the static instance to avoid allocating a throwaway CalcMatrix2D.
        return Math_1.CalcMatrix2D.getStaticInstance().crossEntropyLoss(correctOutput, predictions, this.epsilon);
    }
    derivative(correctOutput, predictions, lastLayer) {
        if (lastLayer.getType() === types_1.LayerType.softmax) {
            // For Softmax, we compute dZ directly — no intermediate allocation beyond the result.
            return predictions.subtract(correctOutput);
        }
        // For other layers (like Sigmoid), we calculate dA.
        return Math_1.CalcMatrix2D.getStaticInstance().crossEntropyDerivative(correctOutput, predictions, this.epsilon);
    }
}
exports.CrossEntropyCost = CrossEntropyCost;
