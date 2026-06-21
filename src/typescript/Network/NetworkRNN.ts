import { Dimension, Layers } from "../types";
import { CalcMatrix2D } from "../Math";
import * as fs from "fs";

class NetworkRNN {
  private readonly dimensions: Dimension | null = null;
  private size = 0;
  private layers: Layers[] = [];

  constructor(dimensions: Dimension) {
    this.dimensions = dimensions;
  }

  addLayer(layer: Layers): NetworkRNN {
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
}

export { NetworkRNN };
export default NetworkRNN;
