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
    return this.data.col(index);
  }

  getNumberOfExamples(): number {
    return this.data.cols();
  }

  getExampleSize(): number {
    return this.data.rows();
  }

  getBatch(offset: number, batchSize: number): CalcMatrix2D {
    return this.data.block(0, offset, this.getExampleSize(), batchSize);
  }
}
