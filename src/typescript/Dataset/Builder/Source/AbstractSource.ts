import { CalcMatrix2D } from "../../../Math/CalcMatrix2D";

export abstract class AbstractSource {
  abstract parse(): CalcMatrix2D;
}
