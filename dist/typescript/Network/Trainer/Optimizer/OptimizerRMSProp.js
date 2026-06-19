"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerRMSProp = void 0;
const AbstractOptimizer_1 = require("./AbstractOptimizer");
class OptimizerRMSProp extends AbstractOptimizer_1.AbstractOptimizer {
    constructor() {
        super(...arguments);
        this.alpha = 1e-3;
        this.beta = 0.9;
    }
    setBeta(beta) {
        this.beta = beta;
        return this;
    }
    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }
    optimize(layer) {
        this.rmsprop(layer, this.learningRate, this.alpha, this.beta);
    }
    rmsprop(layer, learningRate, alpha, beta) {
        // Compute each intermediate explicitly and destroy it after use
        // to avoid native memory leaks from chained operations.
        const gWpow2 = layer.gW.pow(2);
        const gbpow2 = layer.gb.pow(2);
        const sWbeta = layer.sW.multiply(beta);
        const sbBeta = layer.sb.multiply(beta);
        const gWterm = gWpow2.multiply(1 - beta);
        const gbTerm = gbpow2.multiply(1 - beta);
        layer.sW.replace(sWbeta.add(gWterm));
        layer.sb.replace(sbBeta.add(gbTerm));
        gWpow2.destroy();
        gbpow2.destroy();
        gWterm.destroy();
        gbTerm.destroy();
        const sqrtSW = layer.sW.sqrt().add(1e-8);
        const sqrtSB = layer.sb.sqrt().add(1e-8);
        const deltaW = layer.gW.multiply(alpha).divide(sqrtSW);
        const deltaB = layer.gb.multiply(alpha).divide(sqrtSB);
        layer.W.replace(layer.W.subtract(deltaW));
        layer.b.replace(layer.b.subtract(deltaB));
        sqrtSW.destroy();
        sqrtSB.destroy();
        deltaW.destroy();
        deltaB.destroy();
    }
}
exports.OptimizerRMSProp = OptimizerRMSProp;
