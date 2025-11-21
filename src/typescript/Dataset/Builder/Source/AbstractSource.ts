import { Dataset } from "../../Dataset";

export abstract class AbstractSource {
  abstract parse(): Dataset;
}
