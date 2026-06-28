import { Dimension, Layers } from "../types";
import { CalcMatrix2D } from "../Math";
import * as fs from "fs";
import { RNNLayer } from "./Layer";
import { DatasetVocabulary } from "../Dataset/DatasetVocabulary";
import { AbstractNetwork } from "./AbstractNetwork";

class NetworkRNN extends AbstractNetwork {
  forward(input: Array<CalcMatrix2D>): Array<CalcMatrix2D> {
    let output = input;

    this.layers.forEach((layer: Layers) => {
      output = layer.forward(output);
    });

    return output;
  }

  backward(X: Array<CalcMatrix2D>, sigma: Array<CalcMatrix2D>, regularization = 0): void {
    const m = 1;
    let currentSigma = sigma;

    for (let i = this.layers.length - 1; i >= 0; i -= 1) {
      const layer = this.layers[i];
      const isLastLayer = i === this.layers.length - 1;
      currentSigma = layer.getBackPropagation().propagate(X, m, layer, currentSigma, isLastLayer);
    }
  }

  sample(inputDataset: DatasetVocabulary, maxSize = 50) {
    const x = new CalcMatrix2D(inputDataset.getCharsLength(), 1).allocate().setZeros();
    const a = new CalcMatrix2D(this.layers[0].Waa.dims()[0], 1).allocate().setRandom(1);
    let count = 0;
    let generated = "";

    while (count < maxSize) {
      a.replace(this.layers[0].Waa.dot(a).add(this.layers[0].Wax.dot(x)).add(this.layers[0].ba).tanh());
      const z = this.layers[0].Wya.dot(a).add(this.layers[0].by);
      const p = z.softmax();

      const char = inputDataset.getChars()[p.maxCoeff().get()[0]];
      generated += char;

      count += 1;
    }

    return generated;
  }

  save(path: string): Promise<string> {
    const resultJSON = {
      dimensions: this.dimensions,
      layers: [],
    };

    this.layers.forEach((layer: RNNLayer) => {
      resultJSON.layers.push({
        type: layer.getType(),
        size: layer.getSize(),
        weights: {
          Wax: { data: [...layer.Wax.get()], rows: layer.Wax.rows(), cols: layer.Wax.cols() },
          Waa: { data: [...layer.Waa.get()], rows: layer.Waa.rows(), cols: layer.Waa.cols() },
          Wya: { data: [...layer.Wya.get()], rows: layer.Wya.rows(), cols: layer.Wya.cols() },
          ba: { data: [...layer.ba.get()], rows: layer.ba.rows(), cols: layer.ba.cols() },
          by: { data: [...layer.by.get()], rows: layer.by.rows(), cols: layer.by.cols() },
        },
      });
    });

    const result = JSON.stringify(resultJSON);

    return new Promise((resolve, reject) => {
      fs.writeFile(path, result, (err) => {
        if (err) {
          console.error(err);
          reject();
        }
        resolve(result);
      });
    });
  }
}

export { NetworkRNN };
export default NetworkRNN;
