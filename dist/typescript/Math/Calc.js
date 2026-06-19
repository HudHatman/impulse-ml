"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc = void 0;
const Computation_1 = require("./Computation");
class Calc {
    constructor() {
        this._result = null;
        this._params = null;
    }
    static get() {
        return new Calc();
    }
    setResult(result) {
        this._result = result;
        return this;
    }
    setParams(params) {
        this._params = params;
        return this;
    }
    execSync(module, kernel) {
        this.exec(module, kernel)(this._params, this._result);
        return this;
    }
    /**
     * Note: This function is not truly asynchronous. The underlying native addon
     * does not support asynchronous execution.
     */
    execAsync(module, kernel) {
        return new Promise((resolve) => {
            this.exec(module, kernel, true)(this._params, this._result).then(() => {
                resolve(this);
            });
        });
    }
    exec(module, kernel, async = false) {
        try {
            const device = (0, Computation_1.getDevice)();
            const m = device.loadModule(module);
            const fn = m.loadFunction(kernel);
            return (input = null, output = null) => {
                return fn.execute((input || []).map((m) => m.getMemory()), (output || []).map((m) => m.getMemory()), async);
            };
        }
        catch (e) {
            console.error(e);
            return () => { };
        }
    }
}
exports.Calc = Calc;
