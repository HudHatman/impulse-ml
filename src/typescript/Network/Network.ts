import { Dimension, Layers } from "../types";
import { CalcMatrix2D } from "../Math";
import * as fs from "fs";

class Network {
  private readonly dimensions: Dimension | null = null;
  private size = 0;
  private layers: Layers[] = [];

  constructor(dimensions: Dimension) {
    this.dimensions = dimensions;
  }

  addLayer(layer: Layers): Network {
    this.size++;
    this.layers.push(layer);

    return this;
  }

  getLayers(): Layers[] {
    return this.layers;
  }

  getLastLayer(): Layers {
    return this.layers[this.layers.length - 1];
  }

  forward(input: CalcMatrix2D): CalcMatrix2D {
    let output = input;

    this.layers.forEach((layer: Layers) => {
      output = layer.forward(output);
    });

    return output;
  }

  backward(X: CalcMatrix2D, regularization: number, sigma: CalcMatrix2D): void {
    const m = X.cols();
    let currentSigma = sigma;

    for (let i = this.layers.length - 1; i >= 0; i -= 1) {
      const layer = this.layers[i];
      const isLastLayer = i === this.layers.length - 1;
      currentSigma = layer.getBackPropagation().propagate(X, m, regularization, layer, currentSigma, isLastLayer);
    }
  }

  save(path: string): Promise<string> {
    const resultJSON = {
      dimensions: this.dimensions,
      layers: [],
    };

    this.layers.forEach((layer: Layers) => {
      resultJSON.layers.push({
        type: layer.getType(),
        size: layer.getSize(),
        weights: {
          W: { data: [...layer.W.get()], rows: layer.W.rows(), cols: layer.W.cols() },
          b: { data: [...layer.b.get()], rows: layer.b.rows(), cols: layer.b.cols() },
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

export { Network };
export default Network;
