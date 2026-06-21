import { CalcMatrix2D, CalcScalar } from "../../Math";
import { Dimension, Layers, LayerType } from "../../types";
import { AbstractLayer } from "./AbstractLayer";

class RNNLayer extends AbstractLayer {
  public Wax: CalcMatrix2D;
  public Waa: CalcMatrix2D;
  public Wya: CalcMatrix2D;
  public ba: CalcMatrix2D;
  public by: CalcMatrix2D;
  public aCache: Array<CalcMatrix2D> = [];
  public yCache: Array<CalcMatrix2D> = [];
  public dWax: CalcMatrix2D;
  public dWaa: CalcMatrix2D;
  public dWya: CalcMatrix2D;
  public dba: CalcMatrix2D;
  public dby: CalcMatrix2D;

  constructor() {
    super();
    this.Wax = new CalcMatrix2D();
    this.Waa = new CalcMatrix2D();
    this.Wya = new CalcMatrix2D();

    this.ba = new CalcMatrix2D();
    this.by = new CalcMatrix2D();

    this.dWax = new CalcMatrix2D();
    this.dWaa = new CalcMatrix2D();
    this.dWya = new CalcMatrix2D();
    this.dba = new CalcMatrix2D();
    this.dby = new CalcMatrix2D();
  }

  configure(): void {
    this.Wax.resize(this.getHeight(), this.getWidth());
    this.dWax.resize(this.getHeight(), this.getWidth()).setZeros();
    this.Wax.setRandom(Math.sqrt(6 / this.getHeight())).multiply(0.01);

    this.Waa.resize(this.getHeight(), this.getHeight());
    this.dWaa.resize(this.getHeight(), this.getHeight()).setZeros();
    this.Waa.setRandom(Math.sqrt(6 / this.getHeight())).multiply(0.01);

    this.Wya.resize(this.getWidth(), this.getHeight());
    this.dWya.resize(this.getWidth(), this.getHeight()).setZeros();
    this.Wya.setRandom(Math.sqrt(6 / this.getHeight())).multiply(0.01);

    this.ba.resize(this.getHeight(), 1);
    this.dba.resize(this.getHeight(), 1).setZeros();
    this.ba.setZeros();

    this.by.resize(this.getWidth(), 1);
    this.dby.resize(this.getWidth(), 1).setZeros();
    this.by.setZeros();
  }

  is1D(): boolean {
    return false;
  }

  is2D(): boolean {
    return false;
  }

  is3D(): boolean {
    return false;
  }

  forward(input: Array<CalcMatrix2D>): Array<CalcMatrix2D> {
    this.aCache.forEach((c: CalcMatrix2D) => {
      c.destroy();
    });
    this.yCache.forEach((c: CalcMatrix2D) => {
      c.destroy();
    });

    this.aCache[0] = new CalcMatrix2D(this.getHeight(), 1).allocate().setZeros();

    for (let row = 0, aCacheIndex = 1; row < input.length; row++, aCacheIndex++) {
      const z = this.Waa.dot(this.aCache[aCacheIndex - 1]).add(this.Wax.dot(input[row])).add(this.ba);
      this.aCache[aCacheIndex] = z.tanh();

      const z_y = this.Wya.dot(this.aCache[aCacheIndex]).add(this.by);
      this.yCache[row] = z_y.softmax();
    }

    return this.yCache;
  }

  activation(m: CalcMatrix2D): CalcMatrix2D {
    return m.tanh();
  }

  getType(): LayerType {
    return LayerType.rnn;
  }

  derivative(sigma: CalcMatrix2D): CalcMatrix2D {
    return sigma.tanhDerivative();
  }

  setSize(value: number): AbstractLayer {
    this.setHeight(value as number);

    return this;
  }

  getOutputWidth(): number {
    throw new Error("Method not implemented.");
  }

  getOutputHeight(): number {
    throw new Error("Method not implemented.");
  }

  getOutputDepth(): number {
    throw new Error("Method not implemented.");
  }

  getSize(): Dimension | number {
    return this.getHeight();
  }

  penalty(): CalcScalar {
    return new CalcScalar().allocate().set([0.0]);
  }
}

export { RNNLayer };
