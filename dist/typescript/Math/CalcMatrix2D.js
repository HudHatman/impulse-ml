"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcMatrix2D = void 0;
const CalcElement_1 = require("./CalcElement");
const CalcRowVector_1 = require("./CalcRowVector");
const CalcScalar_1 = require("./CalcScalar");
class CalcMatrix2D extends CalcElement_1.CalcElement {
    constructor(rows = 1, cols = 1) {
        super(rows, cols);
    }
    isMatrix2D() {
        return true;
    }
    row(index) {
        const result = new CalcMatrix2D(1, this.cols()).allocate();
        return this._call("matrix", "matrix_row", false)([this, new CalcScalar_1.CalcScalar().allocate().set([index]), result])(result);
    }
    col(index) {
        const result = new CalcMatrix2D(this.rows(), 1).allocate();
        return this._call("matrix", "matrix_col", false)([this, new CalcScalar_1.CalcScalar().allocate().set([index]), result])(result);
    }
    maxCoeff() {
        return this.calcSync((calc) => {
            return calc.maxCoeff();
        });
    }
    add(m) {
        return this.calcSync((calc) => {
            return calc.add(m);
        });
    }
    forwardPropagation(w, b) {
        return this.calcSync((calc) => {
            return calc.forwardPropagation(w, b);
        });
    }
    backwardPropagation(w, a_prev, regularization, num_examples) {
        return this.calcSync((calc) => {
            return calc.backwardPropagation(w, a_prev, regularization, num_examples);
        });
    }
    transpose() {
        return this.calcSync((calc) => {
            return calc.transpose();
        });
    }
    logisticForwardPropagation() {
        return this.calcSync((calc) => {
            return calc.logisticForwardPropagation();
        });
    }
    logisticBackwardPropagation() {
        return this.calcSync((calc) => {
            return calc.logisticBackwardPropagation();
        });
    }
    pow(number) {
        return this.calcSync((calc) => {
            return calc.pow(number);
        });
    }
    multiply(number) {
        return this.calcSync((calc) => {
            return calc.multiply(number);
        });
    }
    divide(mOrNumber) {
        return this.calcSync((calc) => {
            return calc.divide(mOrNumber);
        });
    }
    subtract(m) {
        return this.calcSync((calc) => {
            return calc.subtract(m);
        });
    }
    crossEntropyLoss(correctOutput, predictions, epsilon) {
        return this.calcSync((calc) => {
            return calc.crossEntropyLoss(correctOutput, predictions, epsilon);
        });
    }
    crossEntropyDerivative(correctOutput, predictions, epsilon) {
        return this.calcSync((calc) => {
            return calc.crossEntropyDerivative(correctOutput, predictions, epsilon);
        });
    }
    softmax() {
        return this.calcSync((calc) => {
            return calc.softmax();
        });
    }
    tanh() {
        return this.calcSync((calc) => {
            return calc.tanh();
        });
    }
    tanhDerivative() {
        return this.calcSync((calc) => {
            return calc.tanhDerivative();
        });
    }
    block(rowOffset, colOffset, numRows, numCols) {
        return this.calcSync((calc) => {
            return calc.block(rowOffset, colOffset, numRows, numCols);
        });
    }
    softmaxDerivative() {
        return this.calcSync((calc) => {
            return calc.softmaxDerivative();
        });
    }
    minMax() {
        return this.calcSync((calc) => {
            return calc.minMax();
        });
    }
    sqrt() {
        return this.calcSync((calc) => {
            return calc.sqrt();
        });
    }
    static getStaticInstance() {
        if (!CalcMatrix2D._staticInstance) {
            CalcMatrix2D._staticInstance = new CalcMatrix2D(1, 1).allocate();
        }
        return CalcMatrix2D._staticInstance;
    }
    static runAdamOptimizer(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t) {
        return CalcMatrix2D.getStaticInstance().calcSync((calc) => {
            return calc.adamOptimize(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
        });
    }
    static runAdagradOptimizer(W, b, gW, gb, dW, db, learningRate, epsilon) {
        return CalcMatrix2D.getStaticInstance().calcSync((calc) => {
            return calc.adagradOptimize(W, b, gW, gb, dW, db, learningRate, epsilon);
        });
    }
    getCalcSandbox(async = false) {
        const baseSandbox = super.getCalcSandbox(async);
        const that = this;
        return {
            ...baseSandbox,
            crossEntropyLoss: (correctOutput, predictions, epsilon) => {
                const _epsilon = new CalcScalar_1.CalcScalar().allocate().set([epsilon]);
                const result = new CalcScalar_1.CalcScalar().allocate();
                return that._call("algebra", "algebra_cross_entropy_loss", async)([correctOutput, predictions, _epsilon], [result])(result);
            },
            crossEntropyDerivative: (correctOutput, predictions, epsilon) => {
                const _epsilon = new CalcScalar_1.CalcScalar().allocate().set([epsilon]);
                const result = new CalcMatrix2D(correctOutput.rows(), correctOutput.cols()).allocate();
                return that._call("algebra", "algebra_cross_entropy_derivative", async)([correctOutput, predictions, _epsilon], [result])(result);
            },
            block(rowOffset, colOffset, numRows, numCols) {
                const result = new CalcMatrix2D(numRows, numCols).allocate();
                const _rowOffset = new CalcScalar_1.CalcScalar().allocate().set([rowOffset]);
                const _colOffset = new CalcScalar_1.CalcScalar().allocate().set([colOffset]);
                const _numRows = new CalcScalar_1.CalcScalar().allocate().set([numRows]);
                const _numCols = new CalcScalar_1.CalcScalar().allocate().set([numCols]);
                return that._call("matrix", "matrix_block", async)([that, _rowOffset, _colOffset, _numRows, _numCols, result])(result);
            },
            forwardPropagation: (w, b) => {
                const result = new CalcMatrix2D(w.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_forward_propagation", async)([w, this, b, result])(result);
            },
            backwardPropagation: (w, a_prev, regularization, num_examples) => {
                const gW = new CalcMatrix2D(w.rows(), w.cols()).allocate();
                const gb = new CalcMatrix2D(w.rows(), 1).allocate();
                const dA_prev = new CalcMatrix2D(a_prev.rows(), a_prev.cols()).allocate();
                const _regularization = new CalcScalar_1.CalcScalar().allocate().set([regularization]);
                const _num_examples = new CalcScalar_1.CalcScalar().allocate().set([num_examples]);
                return that._call("algebra", "algebra_backward_propagation", async)([this, w, a_prev, _regularization, _num_examples, gW, gb, dA_prev])([gW, gb, dA_prev]);
            },
            pow: (number) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_pow", async)([this, new CalcScalar_1.CalcScalar().allocate().set([number]), result])(result);
            },
            fraction: (number) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_fraction", async)([this, new CalcScalar_1.CalcScalar().allocate().set([number]), result])(result);
            },
            softmax: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_softmax", async)([this, result])(result);
            },
            sqrt: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_sqrt", async)([this, result])(result);
            },
            tanh: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_tanh", async)([this, result])(result);
            },
            tanhDerivative: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_tanh_derivative", async)([this, result])(result);
            },
            softmaxDerivative: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_softmax_derivative", async)([this, result])(result);
            },
            rowwiseSum: () => {
                const result = new CalcMatrix2D(this.rows(), 1).allocate();
                return that._call("algebra", "algebra_rowwise_sum", async)([this, result])(result);
            },
            multiply: (m) => {
                if (typeof m === "number") {
                    const _m = new CalcScalar_1.CalcScalar().allocate().set([m]);
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                    return that._call("algebra", "algebra_multiply_number", async)([this, _m, result])(result);
                }
                else {
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                    return that._call("algebra", "algebra_multiply", async)([this, m, result])(result);
                }
            },
            log: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_log", async)([this, result])(result);
            },
            divide: (mOrNumber) => {
                if (typeof mOrNumber === "number") {
                    const num = new CalcScalar_1.CalcScalar().allocate().set([mOrNumber]);
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                    return that._call("algebra", "algebra_divide_number", async)([this, num, result])(result);
                }
                else {
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                    return that._call("algebra", "algebra_divide_matrix", async)([this, mOrNumber, result])(result);
                }
            },
            dot: (m) => {
                const result = new CalcMatrix2D(this.rows(), m.cols()).allocate();
                return that._call("algebra", "algebra_dot", async)([this, m, result])(result);
            },
            add: (m) => {
                if (typeof m === "number") {
                    const num = new CalcScalar_1.CalcScalar().allocate().set([m]);
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
                    return that._call("algebra", "algebra_add_number", async)([this, num, result])(result);
                }
                else {
                    const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
                    return that._call("algebra", "algebra_add_matrix", async)([this, m, result])(result);
                }
            },
            subtract: (m) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
                return that._call("algebra", "algebra_subtract", async)([this, m, result])(result);
            },
            transpose: () => {
                const result = new CalcMatrix2D(this.cols(), this.rows()).allocate(); // Corrected dimensions for dot product result
                return that._call("matrix", "matrix_transpose", async)([this, result])(result);
            },
            logMinusOne: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
                return that._call("algebra", "algebra_log_minus_one", async)([this, result])(result);
            },
            minusOne: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
                return that._call("algebra", "algebra_minus_one", async)([this, result])(result);
            },
            logisticForwardPropagation: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_logistic_forward_propagation", async)([this, result])(result);
            },
            conjugate: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_conjugate", async)([this, result])(result);
            },
            logisticBackwardPropagation: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_logistic_backward_propagation", async)([this, result])(result);
            },
            leakyRelu: (alpha) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_leaky_relu", async)([this, new CalcScalar_1.CalcScalar().allocate().set([alpha]), result])(result);
            },
            leakyReluBackpropagation: (alpha) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_leaky_reluBackpropagation", async)([this, new CalcScalar_1.CalcScalar().allocate().set([alpha]), result])(result);
            },
            maxCoeff: () => {
                const result = new CalcScalar_1.CalcScalar().allocate();
                return that._call("algebra", "algebra_max_coeff", async)([this, result])(result);
            },
            setMin: (number) => {
                const nb = new CalcScalar_1.CalcScalar().allocate().set([number]);
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("matrix", "matrix_set_min", async)([this, nb, result])(result);
            },
            setMax: (number) => {
                const nb = new CalcScalar_1.CalcScalar().allocate().set([number]);
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("matrix", "matrix_set_max", async)([this, nb, result])(result);
            },
            min: () => {
                const result = new CalcScalar_1.CalcScalar().allocate();
                return that._call("matrix", "matrix_min", async)([this, result])(result);
            },
            max: () => {
                const result = new CalcScalar_1.CalcScalar().allocate();
                return that._call("matrix", "matrix_max", async)([this, result])(result);
            },
            minMax: () => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                return that._call("algebra", "algebra_min_max", async)([this, result])(result);
            },
            img2col: (filterSize, stride, padding) => {
                const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
                const params = new CalcRowVector_1.CalcRowVector(3).allocate().set([filterSize, stride, padding]);
                return that._call("algebra", "algebra_img2col", async)([this, params, result])(result);
            },
            adamOptimize: (W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t) => {
                // Allocate memory for the results
                const updatedW = new CalcMatrix2D(W.rows(), W.cols()).allocate();
                const updatedB = new CalcMatrix2D(b.rows(), b.cols()).allocate();
                const updatedVW = new CalcMatrix2D(vW.rows(), vW.cols()).allocate();
                const updatedVB = new CalcMatrix2D(vb.rows(), vb.cols()).allocate();
                const updatedSW = new CalcMatrix2D(sW.rows(), sW.cols()).allocate();
                const updatedSB = new CalcMatrix2D(sb.rows(), sb.cols()).allocate();
                // Create CalcScalar instances for numbers
                const _learningRate = new CalcScalar_1.CalcScalar().allocate().set([learningRate]);
                const _beta1 = new CalcScalar_1.CalcScalar().allocate().set([beta1]);
                const _beta2 = new CalcScalar_1.CalcScalar().allocate().set([beta2]);
                const _epsilon = new CalcScalar_1.CalcScalar().allocate().set([epsilon]);
                const _t = new CalcScalar_1.CalcScalar().allocate().set([t]);
                // Call the C++ function
                return that._call("algebra", "algebra_adam_optimize", async)([W, b, gW, gb, vW, vb, sW, sb, _learningRate, _beta1, _beta2, _epsilon, _t], // Inputs
                [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB])({
                    // Return object mapping
                    W: updatedW,
                    b: updatedB,
                    vW: updatedVW,
                    vb: updatedVB,
                    sW: updatedSW,
                    sb: updatedSB,
                });
            },
            adagradOptimize: (W, b, gW, gb, dW, db, learningRate, epsilon) => {
                const updatedW = new CalcMatrix2D(W.rows(), W.cols()).allocate();
                const updatedB = new CalcMatrix2D(b.rows(), b.cols()).allocate();
                const updatedDW = new CalcMatrix2D(dW.rows(), dW.cols()).allocate();
                const updatedDB = new CalcMatrix2D(db.rows(), db.cols()).allocate();
                const _learningRate = new CalcScalar_1.CalcScalar().allocate().set([learningRate]);
                const _epsilon = new CalcScalar_1.CalcScalar().allocate().set([epsilon]);
                return that._call("algebra", "algebra_adagrad_optimize", async)([W, b, gW, gb, dW, db, _learningRate, _epsilon], [updatedW, updatedB, updatedDW, updatedDB])({
                    W: updatedW,
                    b: updatedB,
                    dW: updatedDW,
                    db: updatedDB,
                });
            },
        };
    }
    clone() {
        const clone = new CalcMatrix2D(this.rows(), this.cols());
        clone.copyFrom(this);
        return clone;
    }
}
exports.CalcMatrix2D = CalcMatrix2D;
// Static method to run Adam optimizer — uses a lightweight shared instance
// instead of allocating a throwaway dummy CalcMatrix2D on every call.
CalcMatrix2D._staticInstance = null;
