import { AbstractLayer1D } from "./AbstractLayer1D";
import { CalcMatrix2D } from "../../Math";
import { Sigmoid } from "../Activation";

class LSTM extends AbstractLayer1D {
    private readonly activation = new Sigmoid();

    // Gates
    private Wf: CalcMatrix2D; // Forget gate weights
    private Wi: CalcMatrix2D; // Input gate weights
    private Wc: CalcMatrix2D; // Candidate gate weights
    private Wo: CalcMatrix2D; // Output gate weights

    private bf: CalcMatrix2D; // Forget gate biases
    private bi: CalcMatrix2D; // Input gate biases
    private bc: CalcMatrix2D; // Candidate gate biases
    private bo: CalcMatrix2D; // Output gate biases

    // Cell state
    private C: CalcMatrix2D;
    private H: CalcMatrix2D;

    constructor() {
        super();
        this.Wf = new CalcMatrix2D();
        this.Wi = new CalcMatrix2D();
        this.Wc = new CalcMatrix2D();
        this.Wo = new CalcMatrix2D();
        this.bf = new CalcMatrix2D();
        this.bi = new CalcMatrix2D();
        this.bc = new CalcMatrix2D();
        this.bo = new CalcMatrix2D();
        this.C = new CalcMatrix2D();
        this.H = new CalcMatrix2D();
    }

    configure(): void {
        super.configure();
        const hiddenSize = this.getHeight();
        const inputSize = this.getWidth();

        this.Wf.resize(hiddenSize, hiddenSize + inputSize).setRandom(Math.sqrt(6 / (hiddenSize + inputSize)));
        this.Wi.resize(hiddenSize, hiddenSize + inputSize).setRandom(Math.sqrt(6 / (hiddenSize + inputSize)));
        this.Wc.resize(hiddenSize, hiddenSize + inputSize).setRandom(Math.sqrt(6 / (hiddenSize + inputSize)));
        this.Wo.resize(hiddenSize, hiddenSize + inputSize).setRandom(Math.sqrt(6 / (hiddenSize + inputSize)));

        this.bf.resize(hiddenSize, 1).setZeros();
        this.bi.resize(hiddenSize, 1).setZeros();
        this.bc.resize(hiddenSize, 1).setZeros();
        this.bo.resize(hiddenSize, 1).setZeros();

        this.C.resize(hiddenSize, 1).setZeros();
        this.H.resize(hiddenSize, 1).setZeros();
    }

    forward(input: CalcMatrix2D): CalcMatrix2D {
        const combined = this.H.concat(input, 'vertical');

        const ft = this.activation.forward(this.Wf.multiply(combined).add(this.bf));
        const it = this.activation.forward(this.Wi.multiply(combined).add(this.bi));
        const cct = this.activation.forward(this.Wc.multiply(combined).add(this.bc));
        const ot = this.activation.forward(this.Wo.multiply(combined).add(this.bo));

        this.C = ft.elementMultiply(this.C).add(it.elementMultiply(cct));
        this.H = ot.elementMultiply(this.activation.forward(this.C));

        this.A = this.H;
        return this.A;
    }
}

export { LSTM };
