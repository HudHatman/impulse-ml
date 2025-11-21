import { AbstractOptimizer } from "./AbstractOptimizer";
import { Layers } from "../../../types";

export class OptimizerAdam extends AbstractOptimizer {
  private readonly beta1 = 0.9;
  private readonly beta2 = 0.999;
  private readonly epsilon = 1e-8;

  optimize(layer: Layers): void {
    //console.log(`\n--- OptimizerAdam: Layer ${layer.getType()} ---`);
    //console.log("gW received by optimizer:", layer.gW.get());
    //console.log("gb received by optimizer:", layer.gb.get());
    
    // v (momentum) update
    layer.vW = layer.vW.multiply(this.beta1).add(layer.gW.multiply(1 - this.beta1));
    layer.vb = layer.vb.multiply(this.beta1).add(layer.gb.multiply(1 - this.beta1));

    // s (RMSprop) update
    layer.sW = layer.sW.multiply(this.beta2).add(layer.gW.pow(2).multiply(1 - this.beta2));
    layer.sb = layer.sb.multiply(this.beta2).add(layer.gb.pow(2).multiply(1 - this.beta2));

    // Bias correction
    const vW_corrected = layer.vW.divide(1 - Math.pow(this.beta1, this.t));
    const vb_corrected = layer.vb.divide(1 - Math.pow(this.beta1, this.t));
    const sW_corrected = layer.sW.divide(1 - Math.pow(this.beta2, this.t));
    const sb_corrected = layer.sb.divide(1 - Math.pow(this.beta2, this.t));
    
    // Adam update step
    const W_update = vW_corrected.divide(sW_corrected.sqrt().add(this.epsilon)).multiply(this.learningRate);
    const b_update = vb_corrected.divide(sb_corrected.sqrt().add(this.epsilon)).multiply(this.learningRate);

    // Apply the Adam update
    layer.W = layer.W.subtract(W_update);
    layer.b = layer.b.subtract(b_update);
  }
}
