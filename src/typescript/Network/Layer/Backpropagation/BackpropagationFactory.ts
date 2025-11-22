import { Layers } from "../../../types";
import { Backpropagation1Dto1D } from "./Backpropagation1Dto1D";
import { AbstractBackPropagation } from "./AbstractBackpropagation";

export class BackpropagationFactory {
  static create(previousLayer: Layers, layer: Layers): AbstractBackPropagation | null {
    return new Backpropagation1Dto1D(layer, previousLayer);
  }
}
