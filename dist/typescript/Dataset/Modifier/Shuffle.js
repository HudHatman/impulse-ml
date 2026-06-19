"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShuffleDatasetModifier = void 0;
const AbstractModifier_1 = require("./AbstractModifier");
class ShuffleDatasetModifier extends AbstractModifier_1.AbstractModifier {
    apply(dataset) {
        // TODO: implement shuffle logic
        return dataset;
    }
}
exports.ShuffleDatasetModifier = ShuffleDatasetModifier;
