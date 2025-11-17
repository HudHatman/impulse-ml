import { getDevice } from "./Computation";
import { CalcScalar } from "./CalcScalar";
import { Calc } from "./Calc";

export class CalcElement {
  private _dims: Array<number> = [];
  protected _allocated = false;
  protected _memory: any = null;

  constructor(width = 1, height = 1, depth = 1) {
    this._dims = [width, height, depth];
  }

  public dims(): Array<number> {
    return this._dims;
  }

  public rows(): number {
    return this._dims[0];
  }

  public cols(): number {
    return this._dims[1];
  }

  public depth(): number {
    return this._dims[2];
  }

  public count(): number {
    const [width, height, depth] = this._dims;

    return width * height * depth;
  }

  public resize(width = 1, height = 1, depth = 1) {
    this._dims = [width, height, depth];
    this.allocate();
    return this;
  }

  public allocate() {
    const device = getDevice();
    this._memory = device.alloc(this.count());
    this._memory.setWidth(this.rows());
    this._memory.setHeight(this.cols());
    this._memory.setDepth(this.depth());
    this._allocated = true;

    return this;
  }

  public set(arr: Array<number>) {
    this._memory.set(new Float64Array(arr));
    return this;
  }

  public get() {
    return this._memory.get();
  }

  public isScalar() {
    return false;
  }

  public isRowVector() {
    return false;
  }

  public isColVector() {
    return false;
  }

  public isMatrix2D() {
    return false;
  }

  public isMatrix3D() {
    return false;
  }

  public setZeros() {
    this.calcSync((calc) => {
      calc.setZeros();
    });
    return this;
  }

  public setRandom(number: number) {
    this.calcSync((calc) => {
      calc.setRandom(number);
    });
    return this;
  }

  public setMax(number: number) {
    this.calcSync((calc) => {
      calc.setMax(number);
    });
    return this;
  }

  public setMin(number: number) {
    this.calcSync((calc) => {
      calc.setMin(number);
    });
    return this;
  }

  public reluBackpropagation() {
    this.calcSync((calc) => {
      calc.reluBackpropagation();
    });
    return this;
  }
  public pow(number: number) {
    return this.calcSync((calc) => {
      return calc.pow(number);
    });
  }
  public sum() {
    return this.calcSync((calc) => {
      return calc.sum();
    });
  }
  public reluForwardPropagation() {
    this.calcSync((calc) => {
      calc.reluForwardPropagation();
    });
    return this;
  }

  private getCalcSandbox(async = false) {
    return {
      sum: () => {
        const result = new CalcScalar().allocate();
        return this._call("algebra", "algebra_sum", async)([this, result])(result);
      },
      setZeros: () => {
        return this._call("matrix", "matrix_set_zeros", async)([this])(this);
      },
      setRandom: (number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        return this._call("matrix", "matrix_set_random", async)([this, nb])(this);
      },
    };
  }

  protected _call(module: string, kernel: string, async: boolean) {
    return (params, result) => {
      const calc = Calc.get().setResult(result).setParams(params);
      return (result) => {
        if (async) {
          return new Promise((resolve) => {
            calc.execAsync(module, kernel).then(() => {
              resolve(result);
            });
          });
        } else {
          calc.execSync(module, kernel);
          return result;
        }
      };
    };
  }

  public calcSync(callback) {
    return callback(this.getCalcSandbox(false));
  }

  public calcAsync(callback) {
    return new Promise((resolve, reject) => {
      try {
        const result = callback(this.getCalcSandbox(true));
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  public getMemory() {
    return this._memory;
  }

  [Symbol.dispose]() {
    this._memory.free();
  }

  public destroy() {
    this._memory.free();
    this._dims = [0, 0, 0];
    this._allocated = false;
  }

  public copyFrom(other: CalcElement) {
    if (!this._allocated) {
      const device = getDevice();
      this._memory = device.alloc(other.count());
      this._allocated = true;
    }
    this._memory.setWidth(other.rows());
    this._memory.setHeight(other.cols());
    this._memory.setDepth(other.depth());
    this._memory.copyFrom(other.getMemory());
    this._dims = other.dims();
    return this;
  }
}
