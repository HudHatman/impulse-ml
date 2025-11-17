import { Layers } from "../../../types";
import { Backpropagation1Dto1D } from "./Backpropagation1Dto1D";
import { AbstractBackPropagation } from "./AbstractBackpropagation";

export class BackpropagationFactory {
  static create(previousLayer: Layers, layer: Layers): AbstractBackPropagation | null {
    if (previousLayer) {
      if (previousLayer.is1D()) {
        return new Backpropagation1Dto1D(layer, previousLayer);
      }
    } else {
      if (layer.is1D()) {
        return new Backpropagation1Dto1D(layer, previousLayer);
      }
    }

    return null;
  }
}
