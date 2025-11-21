import { AbstractLayer1D } from "./AbstractLayer1D";
import { CalcMatrix2D } from "../../Math";

class LSTM extends AbstractLayer1D {
    /*private readonly activation = new Sigmoid();

    // Gates
    public Wf: CalcMatrix2D; // Forget gate weights
    public Wi: CalcMatrix2D; // Input gate weights
    public Wc: CalcMatrix2D; // Candidate gate weights
    public Wo: CalcMatrix2D; // Output gate weights

    public bf: CalcMatrix2D; // Forget gate biases
    public bi: CalcMatrix2D; // Input gate biases
    public bc: CalcMatrix2D; // Candidate gate biases
    public bo: CalcMatrix2D; // Output gate biases

    // Cell state
    public C: CalcMatrix2D;
    public H: CalcMatrix2D;

    // For backpropagation
    public combined: CalcMatrix2D;
    public ft: CalcMatrix2D;
    public it: CalcMatrix2D;
    public cct: CalcMatrix2D;
    public ot: CalcMatrix2D;
    public C_prev: CalcMatrix2D;
    public H_prev: CalcMatrix2D;


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
        this.C_prev = this.C.copy();
        this.H_prev = this.H.copy();

        this.combined = this.H_prev.concat(input, 'vertical');

        this.ft = this.activation.forward(this.Wf.multiply(this.combined).add(this.bf));
        this.it = this.activation.forward(this.Wi.multiply(this.combined).add(this.bi));
        this.cct = this.activation.forward(this.Wc.multiply(this.combined).add(this.bc));
        this.ot = this.activation.forward(this.Wo.multiply(this.combined).add(this.bo));

        this.C = this.ft.elementMultiply(this.C_prev).add(this.it.elementMultiply(this.cct));
        this.H = this.ot.elementMultiply(this.activation.forward(this.C));

        this.A = this.H;
        return this.A;
    }
*/
}

export { LSTM };
