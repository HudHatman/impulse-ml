import { CalcMatrix2D } from "../Math";

export class Dataset {
  public exampleSize: number | null = 0;
  public numberOfExamples: number | null = 0;
  public data: CalcMatrix2D | null = null;

  constructor(exampleSize: number | null = null, numberOfExamples: number | null = null, data: CalcMatrix2D | null = null) {
    this.exampleSize = exampleSize;
    this.numberOfExamples = numberOfExamples;
    this.data = data;
  }

  static fromMatrix(m: CalcMatrix2D): Dataset {
    return new Dataset(m.rows(), m.cols(), m);
  }

  exampleAt(index: number): CalcMatrix2D {
    return this.data.row(index).transpose();
  }

  getNumberOfExamples(): number {
    return this.data.rows();
  }

  getExampleSize(): number {
    return this.data.cols();
  }

  getBatch(offset: number, batchSize: number): CalcMatrix2D {
    console.log(offset, 0, batchSize, this.data.cols())
    return this.data.block(offset, 0, batchSize, this.data.cols());
  }
}
