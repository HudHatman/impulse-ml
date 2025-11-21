import { Dataset } from "../index";
import { AbstractSource } from "./Source/AbstractSource";

interface ParametersInterface {
  transpose?: boolean;
}

export class DatasetBuilder {
  static fromSource(sourcePromise: Promise<AbstractSource>, params: ParametersInterface = {}): Promise<Dataset> {
    return new Promise((resolve) => {
      sourcePromise.then((source) => {
        const dataset = source.parse();
        resolve(dataset);
      });
    });
  }
}
