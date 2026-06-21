import { CalcMatrix2D } from "../Math";

export class DatasetVocabulary {
  public vocabularySize = 0;
  public dataSize = 0;
  public data: string = "";
  public chars: string[];
  protected _examples: Array<Array<CalcMatrix2D>> = [];

  constructor(str: string) {
    this.data = str.toLowerCase();
    const chars = [...new Set(this.data.split("").sort())];

    this.chars = chars;
    this.dataSize = this.data.length;
    this.vocabularySize = chars.length;
  }

  getVocabularySize(): number {
    return this.vocabularySize;
  }

  getCharsLength(): number {
    return this.chars.length;
  }

  getCharIndices(): Object {
    const result = {};
    this.chars.forEach((char, i) => {
      result[char] = i;
    });
    return result;
  }

  buildData(tx: number = 40, stride: number = 3) {
    const X = [];
    const Y = [];

    for (let i = 0; i < this.data.length - tx; i += stride) {
      X.push(this.data.substr(i, tx));
      Y.push(this.data[i + tx]);
    }

    return [X, Y];
  }

  vectorization(X: string[], Y: string[], nx: number = 40): [CalcMatrix2D[], CalcMatrix2D] {
    const m = X.length;
    const x = new Array(m);
    const chars = this.getCharIndices();
    const y = new CalcMatrix2D(m, this.chars.length).setZeros();
    let xIndex = 0;
    let rowIndex = 0;

    X.forEach((sentence: string, _m) => {
      x[_m] = new CalcMatrix2D(sentence.length, this.chars.length).setZeros();
      sentence.split("").forEach((char, t) => {
        x[_m].data[t][chars[char]] = 1;
        rowIndex++;
      });
      xIndex++;
      rowIndex = 0;

      y.data[_m][chars[Y[_m]]] = 1;
    });

    return [x, y];
  }

  getChars(): string[] {
    return this.chars;
  }

  getExamples(): Array<CalcMatrix2D> {
    if (this._examples.length > 0) {
      return this._examples;
    }

    const examples = this.data
      .replace(/\n+/, "\n")
      .split("\n")
      .map((example: string) => {
        return example + "\n";
      });
    const result: Array<Array<CalcMatrix2D>> = [];

    examples.forEach((example, index) => {
      let data: Array<CalcMatrix2D> = [];
      example.split("").forEach((ch, row) => {
        const newArr: Array<number> = new Array(this.chars.length).fill(0);
        newArr[[this.getCharIndices()[ch]]] = 1;
        data[row] = (new CalcMatrix2D(1, this.chars.length)).allocate().set(newArr);
      });
      result[index] = data;
    })

    return this._examples = result;
  }
}
