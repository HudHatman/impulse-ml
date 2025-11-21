import { AbstractSource } from "./AbstractSource";
import { CalcMatrix2D } from "../../../Math";
import * as csvtojson from "csvtojson";
import { Dataset } from "../../Dataset";

export class SourceCSV extends AbstractSource {
  protected data: number[][] | string[][] | null = null;

  constructor(data: number[][] | string[][]) {
    super();
    this.data = data;
  }

  static fromLocalFile(path: string): Promise<SourceCSV> {
    return new Promise((resolve) => {
      csvtojson({
        noheader: true,
        trim: true,
        output: "csv",
      })
        .fromFile(path)
        .then((arr) => {
          resolve(new SourceCSV(arr));
        });
    });
  }

  parse(): Dataset {
    const numberOfExamples = this.data.length;
    const exampleSize = this.data[0]?.length;

    if (typeof numberOfExamples !== "undefined" && typeof exampleSize !== "undefined") {
      let data = [];
      for (let i = 0; i < numberOfExamples; i += 1) {
        this.data[i].forEach((value) => {
          data.push(Number(value))
        });
      }
      return Dataset.fromMatrix(new CalcMatrix2D(exampleSize, numberOfExamples).allocate().set(new Float64Array(data)));
    }

    return null;
  }
}
