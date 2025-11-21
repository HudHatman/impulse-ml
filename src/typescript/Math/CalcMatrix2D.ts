import { CalcElement } from "./CalcElement";
import { CalcRowVector } from "./CalcRowVector";
import { CalcScalar } from "./CalcScalar";
import { Calc } from "./Calc";

export class CalcMatrix2D extends CalcElement {
  constructor(rows = 1, cols = 1) {
    super(rows, cols);
  }

  public isMatrix2D() {
    return true;
  }

  public row(index: number): CalcMatrix2D {
    const result = new CalcMatrix2D(1, this.cols()).allocate();
    return this._call(
      "matrix",
      "matrix_row",
      false,
    )([this, new CalcScalar().allocate().set(new Float64Array([index])), result])(result);
  }

  public col(index: Number): CalcMatrix2D {
    const result = new CalcMatrix2D(this.rows(), 1).allocate();
    return this._call(
      "matrix",
      "matrix_col",
      false,
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

  public forwardPropagation(w: CalcMatrix2D, b: CalcMatrix2D): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.forwardPropagation(w, b);
    });
  }

  public backwardPropagation(w: CalcMatrix2D, a_prev: CalcMatrix2D, regularization: number, num_examples: number): [CalcMatrix2D, CalcMatrix2D, CalcMatrix2D] {
    return this.calcSync((calc) => {
      return calc.backwardPropagation(w, a_prev, regularization, num_examples);
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

  public crossEntropyLoss(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, epsilon: number): number {
      return this.calcSync((calc) => {
          return calc.crossEntropyLoss(correctOutput, predictions, epsilon);
      });
  }

  public crossEntropyDerivative(correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, epsilon: number): CalcMatrix2D {
      return this.calcSync((calc) => {
          return calc.crossEntropyDerivative(correctOutput, predictions, epsilon);
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
  public block(rowOffset: number, colOffset: number, numRows: number, numCols: number): CalcMatrix2D {
    return this.calcSync((calc) => {
      return calc.block(rowOffset, colOffset, numRows, numCols);
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

  // Static method to run Adam optimizer
  public static runAdamOptimizer(
    W: CalcMatrix2D, b: CalcMatrix2D,
    gW: CalcMatrix2D, gb: CalcMatrix2D,
    vW: CalcMatrix2D, vb: CalcMatrix2D,
    sW: CalcMatrix2D, sb: CalcMatrix2D,
    learningRate: number, beta1: number, beta2: number, epsilon: number, t: number
  ): { W: CalcMatrix2D, b: CalcMatrix2D, vW: CalcMatrix2D, vb: CalcMatrix2D, sW: CalcMatrix2D, sb: CalcMatrix2D } {
    // Create a dummy CalcMatrix2D instance to access calcSync
    const dummy = new CalcMatrix2D(1, 1);
    return dummy.calcSync((calc) => {
      // Call the sandbox version of adamOptimize
      return calc.adamOptimize(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
    });
  }

  protected getCalcSandbox(async = false) {
    const baseSandbox = super.getCalcSandbox(async);
    const that = this;
    return {
      ...baseSandbox,
      crossEntropyLoss: (correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, epsilon: number) => {
        const _epsilon = new CalcScalar().allocate().set([epsilon]);
        const result = new CalcScalar().allocate();
        return that._call("algebra", "algebra_cross_entropy_loss", async)([correctOutput, predictions, _epsilon], [result])(result.get()[0]);
      },
      crossEntropyDerivative: (correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, epsilon: number) => {
          const _epsilon = new CalcScalar().allocate().set([epsilon]);
          const result = new CalcMatrix2D(correctOutput.rows(), correctOutput.cols()).allocate();
          return that._call("algebra", "algebra_cross_entropy_derivative", async)([correctOutput, predictions, _epsilon], [result])(result);
      },
      block(rowOffset: number, colOffset: number, numRows: number, numCols: number): CalcMatrix2D {
        console.log(rowOffset, colOffset, numRows, numCols);
        process.exit();
        const result = new CalcMatrix2D(Math.min(numRows, that.rows() - rowOffset), numCols).allocate();
        const _rowOffset = new CalcScalar().allocate().set([rowOffset]);
        const _colOffset = new CalcScalar().allocate().set([colOffset]);
        const _numRows = new CalcScalar().allocate().set([numRows]);
        const _numCols = new CalcScalar().allocate().set([numCols]);
        return that._call("matrix", "matrix_block", async)([this, _rowOffset, _colOffset, _numRows, _numCols, result])(result);
      },
      forwardPropagation: (w: CalcMatrix2D, b: CalcMatrix2D) => {
        const result = new CalcMatrix2D(w.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_forward_propagation", async)([w, this, b, result])(result);
      },
      backwardPropagation: (w: CalcMatrix2D, a_prev: CalcMatrix2D, regularization: number, num_examples: number) => {
        const gW = new CalcMatrix2D(w.rows(), w.cols()).allocate();
        const gb = new CalcMatrix2D(w.rows(), 1).allocate();
        const dA_prev = new CalcMatrix2D(a_prev.rows(), a_prev.cols()).allocate();
        const _regularization = new CalcScalar().allocate().set([regularization]);
        const _num_examples = new CalcScalar().allocate().set([num_examples]);

        return that._call("algebra", "algebra_backward_propagation", async)([this, w, a_prev, _regularization, _num_examples, gW, gb, dA_prev])([gW, gb, dA_prev]);
      },
      pow: (number: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_pow", async)([this, new CalcScalar().allocate().set([number]), result])(
          result,
        );
      },
      fraction: (number: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call(
          "algebra",
          "algebra_fraction",
          async,
        )([this, new CalcScalar().allocate().set([number]), result])(result);
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
      divide: (mOrNumber: number | CalcMatrix2D) => {
        if (typeof mOrNumber === "number") {
          const num = new CalcScalar().allocate().set([mOrNumber]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_divide_number", async)([this, num, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
          return that._call("algebra", "algebra_divide_matrix", async)([this, mOrNumber, result])(result);
        }
      },
      dot: (m: CalcMatrix2D) => {
        const result = new CalcMatrix2D(this.rows(), m.cols()).allocate();
        return that._call("algebra", "algebra_dot", async)([this, m, result])(result);
      },
      add: (m: CalcMatrix2D | number) => {
        if (typeof m === "number") {
          const num = new CalcScalar().allocate().set([m]);
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_add_number", async)([this, num, result])(result);
        } else {
          const result = new CalcMatrix2D(this.rows(), this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_add_matrix", async)([this, m, result])(result);
        }
      },
      subtract: (m: CalcMatrix2D) => {
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
      leakyRelu: (alpha: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_leaky_relu", async)([this, new CalcScalar().allocate().set([alpha]), result])(result);
      },
      leakyReluBackpropagation: (alpha: number) => {
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("algebra", "algebra_leaky_reluBackpropagation", async)([this, new CalcScalar().allocate().set([alpha]),  result])(result);
      },
      maxCoeff: () => {
        const result = new CalcScalar().allocate();
        return that._call("algebra", "algebra_max_coeff", async)([this, result])(result);
      },
      setMin: (number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("matrix", "matrix_set_min", async)([this, nb, result])(result);
      },
      setMax: (number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(this.rows(), this.cols()).allocate();
        return that._call("matrix", "matrix_set_max", async)([this, nb, result])(result);
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
      adamOptimize: (
        W: CalcMatrix2D, b: CalcMatrix2D,
        gW: CalcMatrix2D, gb: CalcMatrix2D,
        vW: CalcMatrix2D, vb: CalcMatrix2D,
        sW: CalcMatrix2D, sb: CalcMatrix2D,
        learningRate: number, beta1: number, beta2: number, epsilon: number, t: number
      ): { W: CalcMatrix2D, b: CalcMatrix2D, vW: CalcMatrix2D, vb: CalcMatrix2D, sW: CalcMatrix2D, sb: CalcMatrix2D } => {
        // Allocate memory for the results
        const updatedW = new CalcMatrix2D(W.rows(), W.cols()).allocate();
        const updatedB = new CalcMatrix2D(b.rows(), b.cols()).allocate();
        const updatedVW = new CalcMatrix2D(vW.rows(), vW.cols()).allocate();
        const updatedVB = new CalcMatrix2D(vb.rows(), vb.cols()).allocate();
        const updatedSW = new CalcMatrix2D(sW.rows(), sW.cols()).allocate();
        const updatedSB = new CalcMatrix2D(sb.rows(), sb.cols()).allocate();

        // Create CalcScalar instances for numbers
        const _learningRate = new CalcScalar().allocate().set([learningRate]);
        const _beta1 = new CalcScalar().allocate().set([beta1]);
        const _beta2 = new CalcScalar().allocate().set([beta2]);
        const _epsilon = new CalcScalar().allocate().set([epsilon]);
        const _t = new CalcScalar().allocate().set([t]);

        // Call the C++ function
        return that._call("algebra", "algebra_adam_optimize", async)(
          [W, b, gW, gb, vW, vb, sW, sb, _learningRate, _beta1, _beta2, _epsilon, _t], // Inputs
          [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB] // Outputs
        )({ // Return object mapping
          W: updatedW, b: updatedB,
          vW: updatedVW, vb: updatedVB,
          sW: updatedSW, sb: updatedSB
        });
      },
    };
  }

  public clone() {
    const clone = new CalcMatrix2D(this.rows(), this.cols());
    clone.copyFrom(this);
    return clone;
  }
}
