import { CalcElement } from "./CalcElement";
import { CalcColVector } from "./CalcColVector";

export class CalcRowVector extends CalcElement {
  constructor(rows = 1) {
    super(rows);
  }

  public isRowVector() {
    return true;
  }

  public transpose() {
    const result = CalcColVector.fromMemory(this.getMemory().clone(), this.rows());
    return result;
  }
}
