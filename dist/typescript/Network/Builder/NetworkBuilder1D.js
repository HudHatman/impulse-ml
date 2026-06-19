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
exports.NetworkBuilder1D = void 0;
const AbstractNetworkBuilder_1 = require("./AbstractNetworkBuilder");
const fs = __importStar(require("fs"));
const Layer_1 = require("../Layer");
const Math_1 = require("../../Math");
class NetworkBuilder1D extends AbstractNetworkBuilder_1.AbstractNetworkBuilder {
    firstLayerTransition(layer) {
        layer.setWidth(this.dimensions[0]);
    }
    static fromJSON(jsonPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(jsonPath, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const json = JSON.parse(data.toString());
                const builder = new NetworkBuilder1D(json["dimensions"]);
                json["layers"].forEach((layerData) => {
                    let layerClass = null;
                    if (layerData["type"] === "logistic") {
                        layerClass = Layer_1.LogisticLayer;
                    }
                    else if (layerData["type"] === "softmax") {
                        layerClass = Layer_1.SoftmaxLayer;
                    }
                    else if (layerData["type"] === "relu") {
                        layerClass = Layer_1.ReluLayer;
                    }
                    else if (layerData["type"] === "tanh") {
                        layerClass = Layer_1.TanhLayer;
                    }
                    builder.createLayer(layerClass, (layer) => {
                        // @ts-ignore
                        layer.setSize(layerData["size"]);
                    });
                });
                const network = builder.getNetwork();
                network.getLayers().forEach((layer, i) => {
                    layer.W = new Math_1.CalcMatrix2D(json["layers"][i]["weights"]["W"].rows, json["layers"][i]["weights"]["W"].cols)
                        .allocate()
                        .set(json["layers"][i]["weights"]["W"].data);
                    layer.b = new Math_1.CalcMatrix2D(json["layers"][i]["weights"]["b"].rows, json["layers"][i]["weights"]["b"].cols)
                        .allocate()
                        .set(json["layers"][i]["weights"]["b"].data);
                });
                resolve(network);
            });
        });
    }
}
exports.NetworkBuilder1D = NetworkBuilder1D;
