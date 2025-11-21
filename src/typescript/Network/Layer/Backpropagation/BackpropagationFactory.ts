import { Layers } from "../../../types";
import { Backpropagation1Dto1D } from "./Backpropagation1Dto1D";
import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { LSTM } from "../LSTM";
import { BackpropagationLSTM } from "./BackpropagationLSTM";
import { CalcMatrix2D } from "../../../Math";

export class BackpropagationFactory {
  static create(previousLayer: Layers, layer: Layers): AbstractBackPropagation | null {
    if (layer instanceof LSTM) {
      const dH = new CalcMatrix2D(layer.getHeight(), 1).setZeros();
      const dC = new CalcMatrix2D(layer.getHeight(), 1).setZeros();
      return new BackpropagationLSTM(layer, dH, dC);
    }

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
