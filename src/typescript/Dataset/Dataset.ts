import { CalcMatrix2D } from "../Math";

export class Dataset {
  public data: CalcMatrix2D | null = null;

  constructor(data: CalcMatrix2D | null = null) {
    this.data = data;
  }

  static fromMatrix(m: CalcMatrix2D): Dataset {
    return new Dataset(m);
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
