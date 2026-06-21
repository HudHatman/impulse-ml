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
    let dANext = new CalcMatrix2D(layer.aCache[0].rows(), layer.aCache[0].cols()).allocate().setZeros();

    for (let t = input.length - 1; t >= 0; --t) {

      const dy = sigma[t].subtract(input[t]);

      const dWya = layer.dWya.clone();
      layer.dWya.replace(dWya.add(dy.dot(layer.aCache[t + 1])));

      const dby = layer.dby.clone();
      layer.dby.replace(dby.add(dy));

      const da = layer.Wya.transpose().dot(dy).add(dANext);
      const dza = da.multiply(layer.aCache[t].pow(2).minusOne());

      const dWaa = layer.dWaa.clone();
      layer.dWaa.replace(dWaa.add(dza.dot(layer.aCache[t].transpose())))

      const dWax = layer.dWax.clone();
      layer.dWax.replace(dWax.add(dza.dot(input[t])));

      const dba = layer.dba.clone();
      layer.dba.replace(dba.add(dza));

      dANext.replace(layer.Waa.transpose().dot(dza));

      layer.dWax.replace(layer.dWax.setMin(5).setMax(5));
      layer.dWya.replace(layer.dWya.setMin(5).setMax(5));
      layer.dWaa.replace(layer.dWaa.setMin(5).setMax(5));
      layer.dba.replace(layer.dba.setMin(5).setMax(5));
      layer.dby.replace(layer.dby.setMin(5).setMax(5));

      result.push(dANext);
    }

    return result;
  }
}
