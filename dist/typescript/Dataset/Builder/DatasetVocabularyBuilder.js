"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetVocabularyBuilder = void 0;
const DatasetVocabulary_1 = require("../DatasetVocabulary");
class DatasetVocabularyBuilder {
    static fromSource(sourcePromise) {
        return new Promise((resolve) => {
            sourcePromise.then((_source) => {
                resolve(new DatasetVocabulary_1.DatasetVocabulary());
            });
        });
    }
}
exports.DatasetVocabularyBuilder = DatasetVocabularyBuilder;
