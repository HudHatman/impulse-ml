"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLayer = void 0;
class AbstractLayer {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.previousLayer = null;
        this.backPropagation = null;
    }
    setBackPropagation(backPropagation) {
        this.backPropagation = backPropagation;
        return this;
    }
    getBackPropagation() {
        return this.backPropagation;
    }
    setWidth(value) {
        this.width = value;
        return this;
    }
    getWidth() {
        return this.width;
    }
    setHeight(value) {
        this.height = value;
        return this;
    }
    getHeight() {
        return this.height;
    }
    setDepth(value) {
        this.depth = value;
        return this;
    }
    getDepth() {
        return this.depth;
    }
    transition(previousLayer) {
        this.previousLayer = previousLayer;
        return this;
    }
}
exports.AbstractLayer = AbstractLayer;
