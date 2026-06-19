"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const fs = __importStar(require("fs"));
class Network {
    constructor(dimensions) {
        this.dimensions = null;
        this.size = 0;
        this.layers = [];
        this.dimensions = dimensions;
    }
    addLayer(layer) {
        this.size++;
        this.layers.push(layer);
        return this;
    }
    getLayers() {
        return this.layers;
    }
    getLastLayer() {
        return this.layers[this.layers.length - 1];
    }
    forward(input) {
        let output = input;
        this.layers.forEach((layer) => {
            output = layer.forward(output);
        });
        return output;
    }
    backward(X, regularization, sigma) {
        const m = X.cols();
        let currentSigma = sigma;
        for (let i = this.layers.length - 1; i >= 0; i -= 1) {
            const layer = this.layers[i];
            const isLastLayer = i === this.layers.length - 1;
            currentSigma = layer.getBackPropagation().propagate(X, m, regularization, layer, currentSigma, isLastLayer);
        }
    }
    save(path) {
        const resultJSON = {
            dimensions: this.dimensions,
            layers: [],
        };
        this.layers.forEach((layer) => {
            resultJSON.layers.push({
                type: layer.getType(),
                size: layer.getSize(),
                weights: {
                    W: { data: [...layer.W.get()], rows: layer.W.rows(), cols: layer.W.cols() },
                    b: { data: [...layer.b.get()], rows: layer.b.rows(), cols: layer.b.cols() },
                },
            });
        });
        const result = JSON.stringify(resultJSON);
        return new Promise((resolve, reject) => {
            fs.writeFile(path, result, (err) => {
                if (err) {
                    console.error(err);
                    reject();
                }
                resolve(result);
            });
        });
    }
}
exports.Network = Network;
exports.default = Network;
