"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeanSquaredErrorCost = void 0;
const AbstractCost_1 = require("./AbstractCost");
class MeanSquaredErrorCost extends AbstractCost_1.AbstractCost {
    loss(correctOutput, predictions) {
        const miniBatchSize = correctOutput.cols();
        const error = predictions.subtract(correctOutput);
        const errorSq = error.pow(2);
        const cost = errorSq.sum().get()[0];
        error.destroy();
        errorSq.destroy();
        return cost / (2 * miniBatchSize);
    }
    derivative(correctOutput, predictions, lastLayer) {
        // Returns a new matrix — caller is responsible for destroy().
        return predictions.subtract(correctOutput);
    }
}
exports.MeanSquaredErrorCost = MeanSquaredErrorCost;
