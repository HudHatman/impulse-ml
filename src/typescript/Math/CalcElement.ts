import { getDevice } from "./Computation";
import { Calc } from "./Calc";

export class CalcElement {
  private _dims: Array<number> = [];
  protected _allocated = false;
  protected _memory: any = null;
  protected _device: any = null;

  constructor(width = 1, height = 1, depth = 1) {
    this._dims = [width, height, depth];
    this._device = getDevice();
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
    if (!this._allocated) {
      this._memory = this._device.alloc(this.count());
      this._memory.setWidth(this.rows());
      this._memory.setHeight(this.cols());
      this._memory.setDepth(this.depth());
      this._allocated = true;
    }

    return this;
  }

  public set(arr: Array<any>) {
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

  private getCalcSandbox(async = false) {
    return {

    };
  }

  public getMemory() {
    return this._memory;
  }

  [Symbol.dispose]() {
    this._memory.free();
  }

  public destroy() {
    if (this._allocated) {
      this._memory.free();
      this._dims = [0, 0, 0];
      this._allocated = false;
    }
  }

  public copyFrom(other: CalcElement) {
    this.destroy();
    this._dims = other.dims();
    this.allocate();
    this._memory.setWidth(other.rows());
    this._memory.setHeight(other.cols());
    this._memory.setDepth(other.depth());
    this._memory.copyFrom(other.getMemory());
    this._dims = other.dims();
    return this;
  }

  public replace(other: CalcElement) {
    if (this.rows() !== other.rows() || this.cols() !== other.cols() || this.depth() !== other.depth()) {
      this.destroy();
      this.copyFrom(other);
    } else {
      this._memory.copyFrom(other.getMemory());
    }
    other.destroy();
    return this;
  }
}

export class CalcScalar extends CalcElement {
  constructor() {
    super(1);
  }

  public isScalar() {
    return true;
  }
}
