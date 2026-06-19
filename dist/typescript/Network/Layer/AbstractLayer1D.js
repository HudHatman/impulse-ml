"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLayer1D = void 0;
const AbstractLayer_1 = require("./AbstractLayer");
const Math_1 = require("../../Math");
class AbstractLayer1D extends AbstractLayer_1.AbstractLayer {
    constructor() {
        super();
        this.depth = 1;
        this.W = new Math_1.CalcMatrix2D();
        this.b = new Math_1.CalcMatrix2D();
        this.A = new Math_1.CalcMatrix2D();
        this.Z = new Math_1.CalcMatrix2D();
        this.gW = new Math_1.CalcMatrix2D();
        this.gb = new Math_1.CalcMatrix2D();
        this.vW = new Math_1.CalcMatrix2D();
        this.vb = new Math_1.CalcMatrix2D();
        this.sW = new Math_1.CalcMatrix2D();
        this.sb = new Math_1.CalcMatrix2D();
        this.dW = new Math_1.CalcMatrix2D();
        this.db = new Math_1.CalcMatrix2D();
    }
    configure() {
        this.W.resize(this.getHeight(), this.getWidth());
        this.W.setRandom(Math.sqrt(6 / this.getWidth()));
        this.b.resize(this.getHeight(), 1).setZeros().add(1.0);
        this.gW.resize(this.getHeight(), this.getWidth());
        this.gW.setZeros();
        this.gb.resize(this.getHeight(), 1);
        this.gb.setZeros();
        this.sW.resize(this.getHeight(), this.getWidth());
        this.sW.setZeros();
        this.sb.resize(this.getHeight(), 1);
        this.sb.setZeros();
        this.vW.resize(this.getHeight(), this.getWidth());
        this.vW.setZeros();
        this.vb.resize(this.getHeight(), 1);
        this.vb.setZeros();
        this.dW.resize(this.getHeight(), this.getWidth());
        this.dW.setZeros();
        this.db.resize(this.getHeight(), 1);
        this.db.setZeros();
    }
    forward(input) {
        this.Z.replace(input.forwardPropagation(this.W, this.b));
        this.A.replace(this.activation(this.Z));
        return this.A;
    }
    is1D() {
        return true;
    }
    is3D() {
        return false;
    }
    transition(previousLayer) {
        if (previousLayer.is1D()) {
            this.setWidth(previousLayer.getSize());
        }
        else if (previousLayer.is3D()) {
            this.setWidth(previousLayer.getOutputWidth() * previousLayer.getOutputHeight() * previousLayer.getOutputDepth());
        }
        super.transition(previousLayer);
        return this;
    }
    setSize(value) {
        this.setHeight(value);
        return this;
    }
    getSize() {
        return this.height;
    }
    getOutputWidth() {
        return this.width;
    }
    getOutputHeight() {
        return this.height;
    }
    getOutputDepth() {
        return 1;
    }
    penalty() {
        return this.W.pow(2).sum();
    }
}
exports.AbstractLayer1D = AbstractLayer1D;
