import { CalcElement } from "./CalcElement";

export class CalcMatrix3D extends CalcElement {
  constructor(rows = 1, cols = 1, depth = 1) {
    super(rows, cols, depth);
  }

  public isMatrix3D() {
    return true;
  }
}
