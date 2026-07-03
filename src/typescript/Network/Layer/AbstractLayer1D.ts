import { AbstractLayer } from "./AbstractLayer";
import { Layers } from "../../types";
import { Calc, CalcMatrix2D, CalcScalar } from "../../Math";

abstract class AbstractLayer1D extends AbstractLayer {
  protected depth = 1;
  public W: CalcMatrix2D;
  public b: CalcMatrix2D;
  public A: CalcMatrix2D;
  public Z: CalcMatrix2D;
  public gW: CalcMatrix2D;
  public gb: CalcMatrix2D;
  public vW: CalcMatrix2D;
  public sW: CalcMatrix2D;
  public vb: CalcMatrix2D;
  public sb: CalcMatrix2D;
  public dW: CalcMatrix2D;
  public db: CalcMatrix2D;

  constructor() {
    super();
    this.W = new CalcMatrix2D();
    this.b = new CalcMatrix2D();
    this.A = new CalcMatrix2D();
    this.Z = new CalcMatrix2D();
    this.gW = new CalcMatrix2D();
    this.gb = new CalcMatrix2D();
    this.vW = new CalcMatrix2D();
    this.vb = new CalcMatrix2D();
    this.sW = new CalcMatrix2D();
    this.sb = new CalcMatrix2D();
    this.dW = new CalcMatrix2D();
    this.db = new CalcMatrix2D();
  }

  configure(): void {
    this.W.resize(this.getHeight(), this.getWidth());
    this.b.resize(this.getHeight(), 1)
    this.gW.resize(this.getHeight(), this.getWidth());
    this.gb.resize(this.getHeight(), 1);
    this.sW.resize(this.getHeight(), this.getWidth());
    this.sb.resize(this.getHeight(), 1);
    this.vW.resize(this.getHeight(), this.getWidth());
    this.vb.resize(this.getHeight(), 1);
    this.dW.resize(this.getHeight(), this.getWidth());
    this.db.resize(this.getHeight(), 1);

    Calc.instance(({setZeros, setRandom, add}) => {
      setRandom(this.W, Math.sqrt(6) / this.getWidth());

      setZeros(this.b);
      add(this.b, 1.0);

      setZeros(this.gW);
      setZeros(this.gb);
      setZeros(this.sW);
      setZeros(this.sb);
      setZeros(this.vW);
      setZeros(this.vb);
      setZeros(this.dW);
      setZeros(this.db);
    })
  }

  forward(input: CalcMatrix2D): CalcMatrix2D {
    this.Z.destroy();
    this.A.destroy();

    this.Z = Calc.instance(({forwardPropagation}) => {
      return forwardPropagation(input, this.W, this.b);
    })

    this.A = this.activation(this.Z);

    return this.A;
  }
  is1D(): boolean {
    return true;
  }

  is3D(): boolean {
    return false;
  }

  transition(previousLayer: Layers): AbstractLayer1D {
    if (previousLayer.is1D()) {
      this.setWidth(previousLayer.getSize() as number);
    } else if (previousLayer.is3D()) {
      this.setWidth(previousLayer.getOutputWidth() * previousLayer.getOutputHeight() * previousLayer.getOutputDepth());
    }

    super.transition(previousLayer);

    return this;
  }

  setSize(value: number): AbstractLayer1D {
    this.setHeight(value as number);

    return this;
  }

  getSize(): number {
    return this.height;
  }

  getOutputWidth(): number {
    return this.width;
  }

  getOutputHeight(): number {
    return this.height;
  }

  getOutputDepth(): number {
    return 1;
  }

  penalty(): CalcScalar {
    return Calc.instance(({pow, sum, clone}) => {
      const powered = pow(clone(this.W), 2);
      const result = sum(powered);

      powered.destroy();

      return result
    });
  }
}

export { AbstractLayer1D };
