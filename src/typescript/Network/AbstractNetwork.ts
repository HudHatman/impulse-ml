import { Dimension, Layers } from "../types";
import { CalcMatrix2D } from "../Math";

abstract class AbstractNetwork {
  protected dimensions: Dimension | null = null;
  protected size = 0;
  protected layers: Layers[] = [];

  protected constructor(dimensions: Dimension) {
    this.configure(dimensions);
  }

  configure(dimensions: Dimension) {
    this.dimensions = dimensions;
  }

  addLayer(layer: Layers): AbstractNetwork {
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

  abstract forward(input: CalcMatrix2D | Array<CalcMatrix2D>): CalcMatrix2D | Array<CalcMatrix2D>;

  abstract backward(X: CalcMatrix2D | Array<CalcMatrix2D>, sigma: CalcMatrix2D | Array<CalcMatrix2D>, regularization: number): void;

  abstract save(path: string): Promise<string>;
}

export { AbstractNetwork };
export default AbstractNetwork;
