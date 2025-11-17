import { Dataset } from "../index";
import { AbstractSource } from "./Source/AbstractSource";

interface ParametersInterface {
  transpose?: boolean;
}

export class DatasetBuilder {
  static fromSource(sourcePromise: Promise<AbstractSource>, params: ParametersInterface = {}): Promise<Dataset> {
    return new Promise((resolve) => {
      sourcePromise.then((source) => {
        const matrix = source.parse();
        const numberOfExamples = matrix.rows();
        const exampleSize = matrix.cols();

        const dataset = new Dataset(exampleSize, numberOfExamples, matrix);
        resolve(dataset);
      });
    });
  }
}
