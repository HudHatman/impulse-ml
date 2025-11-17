import { Calc } from "./Calc";
import { CalcScalar } from "./CalcScalar";
import { CalcColVector } from "./CalcColVector";
import { CalcRowVector } from "./CalcRowVector";
import { CalcMatrix2D } from "./CalcMatrix2D";
import { CalcMatrix3D } from "./CalcMatrix3D";

const round = (num: number, decimalPlaces: number): number => {
  return Math.round((num + 2.23e-16) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

export { Calc, CalcScalar, CalcMatrix2D, CalcColVector, CalcRowVector, CalcMatrix3D, round };
export default { Calc, CalcScalar, CalcMatrix2D, CalcColVector, CalcRowVector, CalcMatrix3D, round };
