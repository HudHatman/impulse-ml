"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcElement = void 0;
const Computation_1 = require("./Computation");
const CalcScalar_1 = require("./CalcScalar");
const Calc_1 = require("./Calc");
class CalcElement {
    constructor(width = 1, height = 1, depth = 1) {
        this._dims = [];
        this._allocated = false;
        this._memory = null;
        this._device = null;
        // Cached sandbox objects to avoid recreating closures on every calcSync/calcAsync call
        this._syncSandbox = null;
        this._asyncSandbox = null;
        this._dims = [width, height, depth];
        this._device = (0, Computation_1.getDevice)();
    }
    dims() {
        return this._dims;
    }
    rows() {
        return this._dims[0];
    }
    cols() {
        return this._dims[1];
    }
    depth() {
        return this._dims[2];
    }
    count() {
        const [width, height, depth] = this._dims;
        return width * height * depth;
    }
    resize(width = 1, height = 1, depth = 1) {
        this._dims = [width, height, depth];
        // Invalidate sandbox cache — dimensions changed, closures capture stale dims
        this._syncSandbox = null;
        this._asyncSandbox = null;
        this.allocate();
        return this;
    }
    allocate() {
        if (!this._allocated) {
            this._memory = this._device.alloc(this.count());
            this._memory.setWidth(this.rows());
            this._memory.setHeight(this.cols());
            this._memory.setDepth(this.depth());
            this._allocated = true;
        }
        return this;
    }
    set(arr) {
        this._memory.set(new Float64Array(arr));
        return this;
    }
    get() {
        return this._memory.get();
    }
    isScalar() {
        return false;
    }
    isRowVector() {
        return false;
    }
    isColVector() {
        return false;
    }
    isMatrix2D() {
        return false;
    }
    isMatrix3D() {
        return false;
    }
    setZeros() {
        return this.calcSync((calc) => {
            return calc.setZeros();
        });
    }
    setRandom(number) {
        return this.calcSync((calc) => {
            return calc.setRandom(number);
        });
    }
    setMax(number) {
        return this.calcSync((calc) => {
            return calc.setMax(number);
        });
    }
    setMin(number) {
        return this.calcSync((calc) => {
            return calc.setMin(number);
        });
    }
    reluBackpropagation() {
        return this.calcSync((calc) => {
            return calc.reluBackpropagation();
        });
    }
    pow(number) {
        return this.calcSync((calc) => {
            return calc.pow(number);
        });
    }
    sum() {
        return this.calcSync((calc) => {
            return calc.sum();
        });
    }
    reluForwardPropagation() {
        return this.calcSync((calc) => {
            return calc.reluForwardPropagation();
        });
    }
    getCalcSandbox(async = false) {
        return {
            sum: () => {
                const result = new CalcScalar_1.CalcScalar().allocate();
                return this._call("algebra", "algebra_sum", async)([this, result])(result);
            },
            setZeros: () => {
                return this._call("matrix", "matrix_set_zeros", async)([this])(this);
            },
            setRandom: (number) => {
                const nb = new CalcScalar_1.CalcScalar().allocate().set([number]);
                return this._call("matrix", "matrix_set_random", async)([this, nb])(this);
            },
        };
    }
    _call(module, kernel, async) {
        return (params, result) => {
            const calc = Calc_1.Calc.get().setResult(result).setParams(params);
            return (result) => {
                if (async) {
                    return new Promise((resolve) => {
                        calc.execAsync(module, kernel).then(() => {
                            resolve(result);
                        });
                    });
                }
                else {
                    calc.execSync(module, kernel);
                    return result;
                }
            };
        };
    }
    calcSync(callback) {
        if (!this._syncSandbox) {
            this._syncSandbox = this.getCalcSandbox(false);
        }
        return callback(this._syncSandbox);
    }
    calcAsync(callback) {
        return new Promise((resolve, reject) => {
            try {
                if (!this._asyncSandbox) {
                    this._asyncSandbox = this.getCalcSandbox(true);
                }
                const result = callback(this._asyncSandbox);
                resolve(result);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getMemory() {
        return this._memory;
    }
    [Symbol.dispose]() {
        this._memory.free();
        this._syncSandbox = null;
        this._asyncSandbox = null;
    }
    destroy() {
        if (this._memory) {
            this._memory.free();
        }
        this._dims = [0, 0, 0];
        this._allocated = false;
        this._syncSandbox = null;
        this._asyncSandbox = null;
    }
    copyFrom(other) {
        if (this._allocated) {
            this.destroy();
        }
        this._dims = other.dims();
        this.allocate();
        this._memory.setWidth(other.rows());
        this._memory.setHeight(other.cols());
        this._memory.setDepth(other.depth());
        this._memory.copyFrom(other.getMemory());
        this._dims = other.dims();
        this._syncSandbox = null;
        this._asyncSandbox = null;
        return this;
    }
    replace(other) {
        if (this.rows() !== other.rows() || this.cols() !== other.cols() || this.depth() !== other.depth()) {
            this.destroy();
            this.copyFrom(other);
        }
        else {
            this._memory.copyFrom(other.getMemory());
        }
        other.destroy();
        return this;
    }
}
exports.CalcElement = CalcElement;
