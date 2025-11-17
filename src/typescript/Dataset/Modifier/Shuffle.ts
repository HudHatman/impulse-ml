import { AbstractModifier } from "./AbstractModifier";
import { Dataset } from "../Dataset";
import { CalcMatrix2D } from "../../Math/CalcMatrix2D";

export class ShuffleDatasetModifier extends AbstractModifier {
  /*public sortList: number[] = [];

  constructor(dataset: Dataset) {
    super(dataset);
  }

  apply(dataset: Dataset): Dataset {
    return dataset;
    let index = 0;
    const data = Matrix.from(
      dataset.data.transpose().data.sort((exampleA: number[], exampleB: number[]) => {
        if (typeof this.sortList[index] === "undefined") {
          // first run
          this.sortList[index] = Math.random() - 0.5;
        }
        index += 1;
        return this.sortList[index - 1];
      })
    ).transpose().data;
    return new Dataset(dataset.getExampleSize(), dataset.getNumberOfExamples(), data);
}*/
}
