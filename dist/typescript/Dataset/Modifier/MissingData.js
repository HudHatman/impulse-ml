"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingDataDatasetModifier = void 0;
const AbstractModifier_1 = require("./AbstractModifier");
class MissingDataDatasetModifier extends AbstractModifier_1.AbstractModifier {
    constructor() {
        super(...arguments);
        this.modificationType = "mean";
    }
    apply(dataset) {
        const rowsToFill = [];
        let correctExamplesCount = 0;
        let sum = 0;
        let valueToFill = 0;
        for (let exampleIndex = 0; exampleIndex < dataset.getNumberOfExamples(); exampleIndex += 1) {
            const example = dataset.exampleAt(exampleIndex);
            const exampleData = example.get();
            for (let row = 0; row < dataset.getExampleSize(); row += 1) {
                if (isNaN(exampleData[row]) || typeof exampleData[row] !== "number") {
                    rowsToFill.push({
                        row,
                        col: exampleIndex,
                    });
                }
                else {
                    sum += exampleData[row];
                    correctExamplesCount++;
                }
            }
            example.destroy();
        }
        if (this.modificationType === "mean") {
            valueToFill = sum / correctExamplesCount;
        }
        rowsToFill.forEach(({ row, col }) => {
            const data = dataset.data.get();
            data[col * dataset.getExampleSize() + row] = valueToFill;
            dataset.data.set(Array.from(data));
        });
        return dataset;
    }
    setModificationType(type) {
        this.modificationType = type;
        return this;
    }
}
exports.MissingDataDatasetModifier = MissingDataDatasetModifier;
