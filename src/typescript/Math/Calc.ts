import { CalcElement } from "./CalcElement";
import { getDevice } from "./Computation";

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
}
