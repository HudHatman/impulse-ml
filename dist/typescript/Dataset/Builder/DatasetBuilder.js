"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetBuilder = void 0;
class DatasetBuilder {
    static fromSource(sourcePromise, params = {}) {
        return new Promise((resolve) => {
            sourcePromise.then((source) => {
                const dataset = source.parse();
                resolve(dataset);
            });
        });
    }
}
exports.DatasetBuilder = DatasetBuilder;
