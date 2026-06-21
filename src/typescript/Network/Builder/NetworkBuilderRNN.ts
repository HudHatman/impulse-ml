import { AbstractNetworkBuilder } from "./AbstractNetworkBuilder";
import { Dimension, Layers } from "../../types";
import * as fs from "fs";
import { LogisticLayer, ReluLayer, SoftmaxLayer, TanhLayer } from "../Layer";
import { CalcMatrix2D } from "../../Math";
import { JSONLayerData } from "./types";
import NetworkRNN from "../NetworkRNN";

class NetworkBuilderRNN extends AbstractNetworkBuilder {
  configure(dimension: Dimension): void {
    this.dimensions = dimension;
    this.network = new NetworkRNN(this.dimensions);
  }

  firstLayerTransition(layer: Layers): void {
    layer.setWidth(this.dimensions[0]);
  }

  static fromJSON(jsonPath: string): Promise<NetworkRNN> {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonPath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        /*const json = JSON.parse(data.toString());

        const builder = new NetworkBuilderRNN(json["dimensions"]);

        json["layers"].forEach((layerData: JSONLayerData) => {
          let layerClass = null;

          if (layerData["type"] === "logistic") {
            layerClass = LogisticLayer;
          } else if (layerData["type"] === "softmax") {
            layerClass = SoftmaxLayer;
          } else if (layerData["type"] === "relu") {
            layerClass = ReluLayer;
          } else if (layerData["type"] === "tanh") {
            layerClass = TanhLayer;
          }

          builder.createLayer(layerClass, (layer) => {
            // @ts-ignore
            layer.setSize(layerData["size"] as number);
          });
        });

        const network = builder.getNetwork();

        network.getLayers().forEach((layer, i) => {
          layer.W = new CalcMatrix2D(json["layers"][i]["weights"]["W"].rows, json["layers"][i]["weights"]["W"].cols)
            .allocate()
            .set(json["layers"][i]["weights"]["W"].data);
          layer.b = new CalcMatrix2D(json["layers"][i]["weights"]["b"].rows, json["layers"][i]["weights"]["b"].cols)
            .allocate()
            .set(json["layers"][i]["weights"]["b"].data);
        });

        resolve(network);*/
      });
    });
  }
}

export { NetworkBuilderRNN };
