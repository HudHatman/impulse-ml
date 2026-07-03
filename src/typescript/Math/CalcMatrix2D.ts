import { CalcElement, CalcScalar } from "./CalcElement";
import { CalcRowVector } from "./CalcRowVector";

export class CalcMatrix2D extends CalcElement {
  constructor(rows = 1, cols = 1) {
    super(rows, cols);
  }

  public isMatrix2D() {
    return true;
  }

  /*protected getCalcSandbox(async = false) {
    const baseSandbox = super.getCalcSandbox(async);
    const that = this;
    return {
      ...baseSandbox,
      fraction: (number: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call(
          "algebra",
          "algebra_fraction",
          async,
        )([this, new CalcScalar().allocate().set([number]), result])(result);
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
      multiply: (m: CalcMatrix2D | number) => {
        if (typeof m === "number") {
          const _m = new CalcScalar().allocate().set([m]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_multiply_number", async)([this, _m, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_multiply", async)([this, m, result])(result);
        }
      },
      log: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_log", async)([this, result])(result);
      },
      minusOne: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
        return that._call("algebra", "algebra_minus_one", async)([this, result])(result);
      },
      logisticForwardPropagation: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_logistic_forward_propagation", async)([this, result])(result);
      },
      logisticBackwardPropagation: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_logistic_backward_propagation", async)([this, result])(result);
      },
      min: () => {
        const result = new CalcScalar().allocate();
        return that._call("matrix", "matrix_min", async)([this, result])(result);
      },
      max: () => {
        const result = new CalcScalar().allocate();
        return that._call("matrix", "matrix_max", async)([this, result])(result);
      },
      minMax: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_min_max", async)([this, result])(result);
      },
      img2col: (filterSize, stride, padding) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        const params = new CalcRowVector(3).allocate().set([filterSize, stride, padding]);
        return that._call("algebra", "algebra_img2col", async)([this, params, result])(result);
      },
    };
  }*/

  public clone() {
    const clone = new CalcMatrix2D(this.rows(), this.cols());
    clone.copyFrom(this);
    return clone;
  }
}
