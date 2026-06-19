"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitDatasetModifier = void 0;
const AbstractModifier_1 = require("./AbstractModifier");
class SplitDatasetModifier extends AbstractModifier_1.AbstractModifier {
    apply(dataset) {
        // TODO: implement split logic
        return [dataset];
    }
}
exports.SplitDatasetModifier = SplitDatasetModifier;
