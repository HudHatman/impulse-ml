import { AbstractModifier } from "./AbstractModifier";
import { Dataset } from "../Dataset";
import { CalcMatrix2D } from "../../Math/CalcMatrix2D";

export class SplitDatasetModifier extends AbstractModifier {
  /*protected columns: Array<number>;

  constructor(columns: Array<number>) {
    super(null);
    this.columns = columns.sort();
  }

  apply(dataset: Dataset): Array<Dataset> {
    return [];
    /*const inputData = [];
    const outputData = [];

    for (let col = 0; col < dataset.getNumberOfExamples(); col += 1) {
      const example = dataset.exampleAt(col);
      for (let row = 0, _inputIndex = 0, _outputIndex = 0; row < dataset.exampleSize; row += 1) {
        if (this.columns.includes(row)) {
          if (!inputData[_inputIndex]) {
            inputData[_inputIndex] = [];
          }
          inputData[_inputIndex][col] = example.data[row][0];
          _inputIndex += 1;
        } else {
          if (!outputData[_outputIndex]) {
            outputData[_outputIndex] = [];
          }
          outputData[_outputIndex][col] = example.data[row][0];
          _outputIndex += 1;
        }
      }
    }

    const newInputData = Matrix.from(inputData).transpose().data;
    const newOutputData = Matrix.from(outputData).transpose().data;

    const inputDataset = new Dataset(newInputData[0].length, newInputData.length, newInputData);
    const outputDataset = new Dataset(newOutputData[0].length, newOutputData.length, newOutputData);

    return [inputDataset, outputDataset];
}*/
}
