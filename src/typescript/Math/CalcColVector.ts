import { CalcElement } from "./CalcElement";

export class CalcColVector extends CalcElement {
  constructor(cols = 1) {
    super(1, cols);
  }

  public isColVector() {
    return true;
  }

  public static fromMemory(memory, cols: number) {
    const result = new CalcColVector(cols);
    result._memory = memory;
    result._allocated = true;
    return result;
  }
}
