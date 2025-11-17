import { CalcElement } from "./CalcElement";
import { CalcRowVector } from "./CalcRowVector";
import { CalcScalar } from "./CalcScalar";

export class CalcMatrix2D extends CalcElement {
  constructor(rows = 1, cols = 1) {
    super(rows, cols);
  }

  public isMatrix2D() {
    return true;
  }

  public row(index: Number): CalcMatrix2D {
    const result = new CalcMatrix2D(1, this.cols()).allocate();
    return this._call(
      "matrix",
      "matrix_row",
      false
    )([this, new CalcScalar().allocate().set(new Float64Array([index])), result])(result);
  }

  public col(index: Number): CalcMatrix2D {
    const result = new CalcMatrix2D(this.rows(), 1).allocate();
    return this._call(
      "matrix",
      "matrix_col",
      false
    )([this, new CalcScalar().allocate().set(new Float64Array([index])), result])(result);
  }

  public maxCoeff(): number {
    return this.calcSync((calc) => {
      return calc.maxCoeff();
    });
  }

  public dot(m: CalcMatrix2D) {
    return this.calcSync((calc) => {
      return calc.dot(m);
    });
  }

  public add(m: CalcMatrix2D) {
    return this.calcSync((calc) => {
      return calc.add(m);
    });
  }

  public replicate(rows: number, cols: number) {
    return this.calcSync((calc) => {
      return calc.replicate(rows, cols);
    });
  }

  public transpose(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.transpose();
    });
  }

  public logisticForwardPropagation(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.logisticForwardPropagation();
    });
  }

  public logisticBackwardPropagation(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.logisticBackwardPropagation();
    });
  }

  public pow(number: number): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.pow(number);
    });
  }

  public log(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.log();
    });
  }

  public multiply(number: number | CalcMatrix2D): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.multiply(number);
    });
  }
  public minusOne(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.minusOne();
    });
  }
  public conjugate(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.conjugate();
    });
  }
  public divide(mOrNumber: number | CalcMatrix2D): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.divide(mOrNumber);
    });
  }
  public subtract(m: CalcMatrix2D): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.subtract(m);
    });
  }
  public rowwiseSum(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.rowwiseSum();
    });
  }
  public softmax(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.softmax();
    });
  }
  public fraction(num: number): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.fraction(num);
    });
  }
  public tanh(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.tanh();
    });
  }
  public tanhDerivative(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.tanhDerivative();
    });
  }
  public logMinusOne(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.logMinusOne();
    });
  }
  public sqrt(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.sqrt();
    });
  }
  public block(offset: number, batch: number, start: number, end: number): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.block(offset, batch, start, end);
    });
  }
  public softmaxDerivative(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.softmaxDerivative();
    });
  }
  public min(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.min();
    });
  }
  public max(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.max();
    });
  }
  public minMax(): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.minMax();
    });
  }

  protected getCalcSandbox(async = false) {
    const baseSandbox = super.getCalcSandbox(async);
    const that = this;
    return {
      ...baseSandbox,
      block(offset: number, batch: number, start: number, end: number): CalcMatrix2D {
        const result = new CalcMatrix2D(end - start, batch).allocate();
        const _offset = new CalcScalar().allocate().set([offset]);
        const _batch = new CalcScalar().allocate().set([batch]);
        const _start = new CalcScalar().allocate().set([start]);
        const _end = new CalcScalar().allocate().set([end]);
        return that._call("matrix", "matrix_block", async)([that, _offset, _batch, _start, _end, result])(result);
      },
      pow: (number: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_pow", async)([that, new CalcScalar().allocate().set([number]), result])(
          result
        );
      },
      fraction: (number: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call(
          "algebra",
          "algebra_fraction",
          async
        )([that, new CalcScalar().allocate().set([number]), result])(result);
      },
      softmax: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_softmax", async)([that, result])(result);
      },
      sqrt: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_sqrt", async)([that, result])(result);
      },
      tanh: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_tanh", async)([that, result])(result);
      },
      tanhDerivative: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_tanh_derivative", async)([that, result])(result);
      },
      softmaxDerivative: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_softmax_derivative", async)([that, result])(result);
      },
      rowwiseSum: () => {
        const result = new CalcMatrix2D(this.rows(), 1).allocate();
        return that._call("algebra", "algebra_rowwise_sum", async)([that, result])(result);
      },
      multiply: (m: CalcMatrix2D | number) => {
        if (typeof m === "number") {
          const _m = new CalcScalar().allocate().set([m]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_multiply_number", async)([that, _m, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_multiply", async)([that, m, result])(result);
        }
      },
      log: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_log", async)([that, result])(result);
      },
      divide: (mOrNumber: number | CalcMatrix2D) => {
        if (typeof mOrNumber === "number") {
          const num = new CalcScalar().allocate().set([mOrNumber]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_divide_number", async)([that, num, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_divide_matrix", async)([that, mOrNumber, result])(result);
        }
      },
      dot: (m: CalcMatrix2D) => {
        const result = new CalcMatrix2D(this.rows(), m.cols()).allocate();
        return that._call("algebra", "algebra_dot", async)([that, m, result])(result);
      },
      add: (m: CalcMatrix2D | number) => {
        if (typeof m === "number") {
          const num = new CalcScalar().allocate().set([m]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_add_number", async)([that, num, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_add_matrix", async)([that, m, result])(result);
        }
      },
      subtract: (m: CalcMatrix2D) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
        return that._call("algebra", "algebra_subtract", async)([that, m, result])(result);
      },
      transpose: () => {
        const result = new CalcMatrix2D(this.cols(), this.rows()).allocate(); // Corrected dimensions for dot product result
        return that._call("matrix", "matrix_transpose", async)([that, result])(result);
      },
      logMinusOne: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
        return that._call("algebra", "algebra_log_minus_one", async)([that, result])(result);
      },
      minusOne: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
        return that._call("algebra", "algebra_minus_one", async)([that, result])(result);
      },
      replicate: (rows: number, cols: number) => {
        const _rows = this.rows() * rows;
        const _cols = this.cols() * cols;
        const result = new CalcMatrix2D(_rows, _cols).allocate();
        const __rows = new CalcScalar().allocate().set([rows]);
        const __cols = new CalcScalar().allocate().set([cols]);
        return that._call("algebra", "algebra_replicate_matrix", async)([that, __rows, __cols, result])(result);
      },
      logisticForwardPropagation: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_logistic_forward_propagation", async)([that, result])(result);
      },
      conjugate: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_conjugate", async)([that, result])(result);
      },
      logisticBackwardPropagation: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_logistic_backward_propagation", async)([that, result])(result);
      },
      reluBackpropagation: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_reluBackpropagation", async)([that, result])(result);
      },
      maxCoeff: () => {
        const result = new CalcScalar().allocate();
        return that._call("algebra", "algebra_max_coeff", async)([that, result])(result);
      },
      setMin: (number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("matrix", "matrix_set_min", async)([that, nb, result])(result);
      },
      setMax: (number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("matrix", "matrix_set_max", async)([that, nb, result])(result);
      },
      min: () => {
        const result = new CalcScalar().allocate();
        return that._call("matrix", "matrix_min", async)([that, result])(result);
      },
      max: () => {
        const result = new CalcScalar().allocate();
        return that._call("matrix", "matrix_max", async)([that, result])(result);
      },
      minMax: () => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_min_max", async)([that, result])(result);
      },
      img2col: (filterSize, stride, padding) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        const params = new CalcRowVector(3).allocate().set([filterSize, stride, padding]);
        return that._call("algebra", "algebra_img2col", async)([that, params, result])(result);
      },
    };
  }

  public clone() {
    const clone = new CalcMatrix2D(this.rows(), this.cols());
    clone.copyFrom(this);
    return clone;
  }
}
