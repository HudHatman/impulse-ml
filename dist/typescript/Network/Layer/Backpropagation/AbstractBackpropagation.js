"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBackPropagation = void 0;
class AbstractBackPropagation {
    constructor(layer, previousLayer) {
        this.layer = null;
        this.previousLayer = null;
        this.layer = layer;
        this.previousLayer = previousLayer;
    }
}
exports.AbstractBackPropagation = AbstractBackPropagation;
