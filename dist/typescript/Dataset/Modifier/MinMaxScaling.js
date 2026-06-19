"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinMaxScalingDatasetModifier = void 0;
const AbstractModifier_1 = require("./AbstractModifier");
class MinMaxScalingDatasetModifier extends AbstractModifier_1.AbstractModifier {
    apply(dataset) {
        dataset.data.replace(dataset.data.minMax());
        return dataset;
    }
}
exports.MinMaxScalingDatasetModifier = MinMaxScalingDatasetModifier;
