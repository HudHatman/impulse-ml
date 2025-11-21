import { AbstractBackPropagation } from "./AbstractBackpropagation";
import { LSTM } from "../LSTM";
import { CalcMatrix2D } from "../../../Math";
//import { Sigmoid } from "../../Activation";

class BackpropagationLSTM extends AbstractBackPropagation {
    /*private readonly activation = new Sigmoid();

    constructor(layer: LSTM, private dH: CalcMatrix2D, private dC: CalcMatrix2D) {
        super(layer, null);
    }

    backward(dZ: CalcMatrix2D): void {
        const layer = this.layer as LSTM;

        const dH_next = dZ.copy();
        const dC_next = this.dC.copy();

        const dH = dH_next.add(this.dH);
        const dC = dC_next.add(dH.elementMultiply(layer.ot).elementMultiply(this.activation.backward(layer.C)));

        const dot = dH.elementMultiply(this.activation.forward(layer.C)).elementMultiply(this.activation.backward(layer.ot));
        const dcct = dC.elementMultiply(layer.it).elementMultiply(this.activation.backward(layer.cct));
        const dit = dC.elementMultiply(layer.cct).elementMultiply(this.activation.backward(layer.it));
        const dft = dC.elementMultiply(layer.C_prev).elementMultiply(this.activation.backward(layer.ft));

        const dWf = dft.multiply(layer.combined.transpose());
        const dWi = dit.multiply(layer.combined.transpose());
        const dWc = dcct.multiply(layer.combined.transpose());
        const dWo = dot.multiply(layer.combined.transpose());

        const dbf = dft;
        const dbi = dit;
        const dbc = dcct;
        const dbo = dot;

        const dCombined = layer.Wf.transpose().multiply(dft)
            .add(layer.Wi.transpose().multiply(dit))
            .add(layer.Wc.transpose().multiply(dcct))
            .add(layer.Wo.transpose().multiply(dot));

        const dH_prev = dCombined.slice(0, layer.H_prev.rows, 0, layer.H_prev.cols);
        const dX = dCombined.slice(layer.H_prev.rows, dCombined.rows, 0, dCombined.cols);

        this.dC = dC.elementMultiply(layer.ft);
        this.dH = dH_prev;

        // Update weights and biases
        layer.Wf = layer.Wf.subtract(dWf.multiply(this.learningRate));
        layer.Wi = layer.Wi.subtract(dWi.multiply(this.learningRate));
        layer.Wc = layer.Wc.subtract(dWc.multiply(this.learningRate));
        layer.Wo = layer.Wo.subtract(dWo.multiply(this.learningRate));

        layer.bf = layer.bf.subtract(dbf.multiply(this.learningRate));
        layer.bi = layer.bi.subtract(dbi.multiply(this.learningRate));
        layer.bc = layer.bc.subtract(dbc.multiply(this.learningRate));
        layer.bo = layer.bo.subtract(dbo.multiply(this.learningRate));

        this.dZ = dX;
    }*/
}

export { BackpropagationLSTM };
