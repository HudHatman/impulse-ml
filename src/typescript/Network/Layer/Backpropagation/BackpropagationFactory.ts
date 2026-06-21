import { Layers, LayerType } from "../../../types";
import { BackpropagationRNN } from "./BackpropagationRNN";
import { Backpropagation1Dto1D } from "./Backpropagation1Dto1D";
import { AbstractBackPropagation } from "./AbstractBackpropagation";

export class BackpropagationFactory {
  static create(previousLayer: Layers, layer: Layers): AbstractBackPropagation | null {
    if (layer.getType() === LayerType.rnn) {
      return new BackpropagationRNN(layer, previousLayer);
    } else {
      return new Backpropagation1Dto1D(layer, previousLayer);
    }
  }
}
