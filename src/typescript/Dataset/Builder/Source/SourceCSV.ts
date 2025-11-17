import { AbstractSource } from "./AbstractSource";
import { CalcMatrix2D } from "../../../Math";
import * as csvtojson from "csvtojson";

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
        output: "csv",
      })
        .fromFile(path)
        .then((arr) => {
          resolve(new SourceCSV(arr));
        });
    });
  }

  parse(): CalcMatrix2D {
    const numberOfExamples = this.data.length;
    const exampleSize = this.data[0]?.length;

    if (typeof numberOfExamples !== "undefined" && typeof exampleSize !== "undefined") {
      let data = [];
      for (let i = 0; i < numberOfExamples; i += 1) {
        const newData = [];
        this.data[i].forEach((value, index) => {
          newData.push(Number(value));
        });
        data = [...data, ...newData];
      }
      return new CalcMatrix2D(numberOfExamples, exampleSize).allocate().set(new Float64Array(data));
    }

    return new CalcMatrix2D(0, 0);
  }
}
