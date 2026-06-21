import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { CalcMatrix2D } from "../../../Math";
import { Layers } from "../../../types";
import { RNNLayer } from "../RNN";

export class BackpropagationRNN extends AbstractBackPropagation {
  propagate(
    input: Array<CalcMatrix2D>,
    numberOfExamples: number,
    layer: RNNLayer,
    sigma: Array<CalcMatrix2D>,
    isLastLayer: boolean,
  ): Array<CalcMatrix2D> {
    const result: Array<CalcMatrix2D> = [];

    for (let t = input.length - 1; t >= 0; --t) {
      let dANext = new CalcMatrix2D(layer.aCache[0].rows(), layer.aCache[0].cols()).allocate().setZeros();

      const dy = sigma[t].subtract(input[t]);

      const dWya = layer.dWya.clone();
      layer.dWya.replace(dWya.add(dy.dot(layer.aCache[t + 1])));

      const dby = layer.dby.clone();
      layer.dby.replace(dby.add(dy));

      const da = layer.Wya.transpose().dot(dy).add(dANext);
      const dza = da.multiply(layer.aCache[t + 1].pow(2).minusOne());

      const dWaa = layer.dWaa.clone();
      layer.dWaa.replace(dWaa.add(dza.dot(layer.aCache[t + 1].transpose())))

      const dWax = layer.dWax.clone();
      layer.dWax.replace(dWax.add(dza.dot(input[t])));

      const dba = layer.dba.clone();
      layer.dba.replace(dba.add(dza));

      dANext.replace(layer.Waa.transpose().dot(dza));

      result.push(dANext);
    }

    return result;
  }
}
