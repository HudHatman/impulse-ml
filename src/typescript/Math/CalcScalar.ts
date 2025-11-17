import { CalcElement } from "./CalcElement";

export class CalcScalar extends CalcElement {
  constructor() {
    super(1);
  }

  public isScalar() {
    return true;
  }
}
