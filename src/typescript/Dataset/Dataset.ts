import { CalcMatrix2D } from "../Math/CalcMatrix2D";

export class Dataset {
  public exampleSize = 0;
  public numberOfExamples = 0;
  public data: CalcMatrix2D | null = null;

  constructor(exampleSize: number = null, numberOfExamples: number = null, data: CalcMatrix2D = null) {
    this.exampleSize = exampleSize;
    this.numberOfExamples = numberOfExamples;

    if (data) {
      this.data = data;
    }
  }

  static fromMatrix(m: CalcMatrix2D): Dataset {
    const instance = new Dataset(m.rows(), m.cols());
    instance.data = m;

    return instance;
  }

  exampleAt(index: number): CalcMatrix2D | null {
    return this.data.row(index).transpose();
  }

  getNumberOfExamples(): number {
    return this.data.rows();
  }

  getExampleSize(): number {
    return this.data.cols();
  }

  getBatch(offset: number, batchSize: number): Dataset {
    return this.data.block(offset, 0, batchSize, this.data.cols());
  }

  /*insertColumnAfter(column, size = 1) {
    const oldData = this.data.copy();

    this.exampleSize = this.data.rows + size;
    this.data.resize(this.data.rows + size, this.data.cols);

    for (let row = 0; row < this.data.rows; row += 1) {
      for (let col = 0; col < this.data.cols; col += 1) {
        if (row <= column) {
          this.data.data[row][col] = oldData.data[row][col];
        } else if (row > column && row <= column + size) {.tran
          this.data.data[row][col] = undefined;
        } else if (row > column + size) {
          this.data.data[row][col] = oldData.data[row - size][col];
        }
      }
    }
  }*/
}
