import { CalcElement, CalcScalar } from "./CalcElement";
import { getDevice } from "./Computation";
import { CalcMatrix2D } from "./CalcMatrix2D";

export class Calc {
  private _result: Array<CalcElement> | null = null;
  private _params: Array<CalcElement> | null = null;

  public static get() {
    return new Calc();
  }

  public setResult(result: Array<CalcElement>) {
    this._result = result;
    return this;
  }

  public setParams(params: Array<CalcElement>) {
    this._params = params;
    return this;
  }

  public execSync(module: string, kernel: string) {
    this.exec(module, kernel)(this._params, this._result);
    return this;
  }

  /**
   * Note: This function is not truly asynchronous. The underlying native addon
   * does not support asynchronous execution.
   */
  public execAsync(module: string, kernel: string): Promise<Calc> {
    return new Promise((resolve) => {
      this.exec(
        module,
        kernel,
        true,
      )(this._params, this._result).then(() => {
        resolve(this);
      });
    });
  }

  private exec(module: string, kernel: string, async = false) {
    try {
      const device = getDevice();
      const m = device.loadModule(module);
      const fn = m.loadFunction(kernel);

      return (input: Array<CalcElement> | null = null, output: Array<CalcElement> | null = null) => {
        return fn.execute(
          (input || []).map((m) => m.getMemory()),
          (output || []).map((m) => m.getMemory()),
          async,
        );
      };
    } catch (e) {
      console.error(e);
      return () => {};
    }
  }

  public static instance(fn) {
    const props = {
      clone: (m) => {
        return m.clone();
      },
      newInstance: (width = 1, height = 1) => {
        const result = new CalcMatrix2D(width, height).allocate();
        return result;
      },
      forwardPropagation: (input, W, b) => {
        let result = new CalcMatrix2D(W.rows(), input.cols()).allocate();
        new Calc().exec("algebra", "algebra_forward_propagation", false)([W, input, b, result]);

        return result;
      },
      sum: (m) => {
        const result = new CalcScalar().allocate().set([0]);
        new Calc().exec("algebra", "algebra_sum", false)([m, result]);

        return result;
      },
      pow: (m: CalcMatrix2D, pow: number) => {
        new Calc().exec("algebra", "algebra_pow", false)([m, new CalcScalar().allocate().set([pow])]);

        return m;
      },
      setZeros: (m: CalcMatrix2D) => {
        new Calc().exec("matrix", "matrix_set_zeros", false)([m]);

        return m;
      },
      setRandom: (m: CalcMatrix2D, number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        new Calc().exec("matrix", "matrix_set_random", false)([m, nb]);

        return m;
      },
      add: (m: CalcMatrix2D, n: CalcMatrix2D | number) => {
        if (typeof n === "number") {
          const num = new CalcScalar().allocate().set([n]);
          new Calc().exec("algebra", "algebra_add_number", false)([m, num]);
          return m;
        } else {
          if (m.rows() !== n.rows() || m.cols() !== n.cols()) {
            throw new Error("Add - dimension error");
          }
          new Calc().exec("algebra", "algebra_add_matrix", false)([m, n]);
          return m;
        }
      },
      leakyRelu: (m: CalcMatrix2D, alpha: number) => {
        new Calc().exec("algebra", "algebra_leaky_relu", false)([m, new CalcScalar().allocate().set([alpha])]);

        return m;
      },
      leakyReluBackPropagation: (m: CalcMatrix2D, alpha: number) => {
        new Calc().exec(
          "algebra",
          "algebra_leaky_reluBackpropagation",
          false,
        )([m, new CalcScalar().allocate().set([alpha])]);

        return m;
      },
      subtract(m: CalcMatrix2D, num: CalcMatrix2D | number) {
        const result = new CalcMatrix2D(m.rows(), m.cols()).allocate();
        new Calc().exec("algebra", "algebra_subtract", false)([m, num, result]);
        return result;
      },
      multiply: (m: CalcMatrix2D, n: CalcMatrix2D | number) => {
        const result = new CalcMatrix2D(m.rows(), m.cols()).allocate();

        if (typeof n === "number") {
          const _n = new CalcScalar().allocate().set([n]);
          new Calc().exec("algebra", "algebra_multiply_number", false)([m, _n, result]);
        } else {
          if (m.rows() !== n.rows() || m.cols() !== n.cols()) {
            throw new Error("Multiply - dimension error");
          }
          new Calc().exec("algebra", "algebra_multiply", false)([m, n, result]);
        }

        return result;
      },
      rowwiseSum: (m: CalcMatrix2D) => {
        const result = new CalcMatrix2D(m.rows(), 1).allocate();
        new Calc().exec("algebra", "algebra_rowwise_sum", false)([m, result]);
        return result;
      },
      transpose(m: CalcMatrix2D) {
        const result = new CalcMatrix2D(m.cols(), m.rows()).allocate();
        new Calc().exec("matrix", "matrix_transpose", false)([m, result]);
        return result;
      },
      divide: (m: CalcMatrix2D, nOrNumber: number | CalcMatrix2D) => {
        if (typeof nOrNumber === "number") {
          const num = new CalcScalar().allocate().set([nOrNumber]);
          new Calc().exec("algebra", "algebra_divide_number", false)([m, num]);
          return m;
        } else {
          if (m.rows() !== nOrNumber.rows() || m.cols() !== nOrNumber.cols()) {
            throw new Error("Divide - dimension error");
          }
          new Calc().exec("algebra", "algebra_divide_matrix", false)([m, nOrNumber]);
          return m;
        }
      },
      dot: (m: CalcMatrix2D, n: CalcMatrix2D) => {
        const result = new CalcMatrix2D(m.rows(), n.cols()).allocate();
        new Calc().exec("algebra", "algebra_dot", false)([m, n, result]);
        return result;
      },
      softmax: (m: CalcMatrix2D) => {
        new Calc().exec("algebra", "algebra_softmax", false)([m]);
        return m;
      },
      row(m: CalcMatrix2D, index: number): CalcMatrix2D {
        const result = new CalcMatrix2D(1, m.cols()).allocate();
        new Calc().exec(
          "matrix",
          "matrix_row",
          false,
        )([m, new CalcScalar().allocate().set(new Float64Array([index])), result]);
        return result;
      },
      col(m: CalcMatrix2D, index: Number): CalcMatrix2D {
        const result = new CalcMatrix2D(m.rows(), 1).allocate();
        new Calc().exec(
          "matrix",
          "matrix_col",
          false,
        )([m, new CalcScalar().allocate().set(new Float64Array([index])), result]);
        return result;
      },
      maxCoeff: (m: CalcMatrix2D) => {
        const result = new CalcScalar().allocate();
        new Calc().exec("algebra", "algebra_max_coeff", false)([m, result]);
        return result;
      },
      block(m: CalcMatrix2D, rowOffset: number, colOffset: number, numRows: number, numCols: number): CalcMatrix2D {
        const result = new CalcMatrix2D(numRows, numCols).allocate();
        const _rowOffset = new CalcScalar().allocate().set([rowOffset]);
        const _colOffset = new CalcScalar().allocate().set([colOffset]);
        const _numRows = new CalcScalar().allocate().set([numRows]);
        const _numCols = new CalcScalar().allocate().set([numCols]);
        new Calc().exec("matrix", "matrix_block", false)([m, _rowOffset, _colOffset, _numRows, _numCols, result]);
        return result;
      },
      crossEntropyLoss: (correctOutput: CalcMatrix2D, predictions: CalcMatrix2D, epsilon: number) => {
        const _epsilon = new CalcScalar().allocate().set([epsilon]);
        const result = new CalcScalar().allocate();
        new Calc().exec(
          "algebra",
          "algebra_cross_entropy_loss",
          false,
        )([correctOutput, predictions, _epsilon], [result]);
        return result;
      },
      adamOptimize: (
        W: CalcMatrix2D,
        b: CalcMatrix2D,
        gW: CalcMatrix2D,
        gb: CalcMatrix2D,
        vW: CalcMatrix2D,
        vb: CalcMatrix2D,
        sW: CalcMatrix2D,
        sb: CalcMatrix2D,
        learningRate: number,
        beta1: number,
        beta2: number,
        epsilon: number,
        t: number,
      ): {
        W: CalcMatrix2D;
        b: CalcMatrix2D;
        vW: CalcMatrix2D;
        vb: CalcMatrix2D;
        sW: CalcMatrix2D;
        sb: CalcMatrix2D;
      } => {
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
        new Calc().exec(
          "algebra",
          "algebra_adam_optimize",
          false,
        )(
          [W, b, gW, gb, vW, vb, sW, sb, _learningRate, _beta1, _beta2, _epsilon, _t], // Inputs
          [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB], // Outputs
        );

        return [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB];
      },
      setMin: (m: CalcMatrix2D, number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(m.rows(), m.cols()).allocate();
        new Calc().exec("matrix", "matrix_set_min", false)([m, nb, result]);
        return result;
      },
      setMax: (m: CalcMatrix2D, number: number) => {
        const nb = new CalcScalar().allocate().set([number]);
        const result = new CalcMatrix2D(m.rows(), m.cols()).allocate();
        new Calc().exec("matrix", "matrix_set_max", false)([m, nb, result]);
        return result;
      },
    };

    return fn(props);
  }
}
