import { AbstractNetworkBuilder } from "./AbstractNetworkBuilder";
import { Dimension, Layers } from "../../types";
import * as fs from "fs";
import { LogisticLayer, ReluLayer, RNNLayer, SoftmaxLayer, TanhLayer } from "../Layer";
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
        const json = JSON.parse(data.toString());

        const builder = new NetworkBuilderRNN(json["dimensions"]);

        json["layers"].forEach((layerData: JSONLayerData) => {
          let layerClass = null;

          if (layerData["type"] === "rnn") {
            layerClass = RNNLayer;
          }

          builder.createLayer(layerClass, (layer) => {
            // @ts-ignore
            layer.setSize(layerData["size"] as number);
          });
        });

        const network = builder.getNetwork();

        network.getLayers().forEach((layer, i) => {
          layer.Wax = new CalcMatrix2D(
            json["layers"][i]["weights"]["Wax"].rows,
            json["layers"][i]["weights"]["Wax"].cols,
          )
            .allocate()
            .set(json["layers"][i]["weights"]["Wax"].data);
          layer.Waa = new CalcMatrix2D(
            json["layers"][i]["weights"]["Waa"].rows,
            json["layers"][i]["weights"]["Waa"].cols,
          )
            .allocate()
            .set(json["layers"][i]["weights"]["Waa"].data);
          layer.Wya = new CalcMatrix2D(
            json["layers"][i]["weights"]["Wya"].rows,
            json["layers"][i]["weights"]["Wya"].cols,
          )
            .allocate()
            .set(json["layers"][i]["weights"]["Wya"].data);
          layer.ba = new CalcMatrix2D(json["layers"][i]["weights"]["ba"].rows, json["layers"][i]["weights"]["ba"].cols)
            .allocate()
            .set(json["layers"][i]["weights"]["ba"].data);
          layer.by = new CalcMatrix2D(json["layers"][i]["weights"]["by"].rows, json["layers"][i]["weights"]["by"].cols)
              .allocate()
              .set(json["layers"][i]["weights"]["by"].data);
        });

        resolve(network);
      });
    });
  }
}

export { NetworkBuilderRNN };
