"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataset = void 0;
class Dataset {
    constructor(data = null) {
        this.data = null;
        this.data = data;
    }
    static fromMatrix(m) {
        return new Dataset(m);
    }
    exampleAt(index) {
        return this.data.col(index);
    }
    getNumberOfExamples() {
        return this.data.cols();
    }
    getExampleSize() {
        return this.data.rows();
    }
    getBatch(offset, batchSize) {
        return this.data.block(0, offset, this.getExampleSize(), batchSize);
    }
}
exports.Dataset = Dataset;
