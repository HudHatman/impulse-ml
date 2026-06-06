import { LogisticLayer, ReluLayer, SoftmaxLayer, TanhLayer, RNNLayer } from "./Network/Layer";
import { AbstractLayer1D } from "./Network/Layer/AbstractLayer1D";

export type Dimension = [number] | [number, number, number];

export enum LayerType {
  logistic = "logistic",
  softmax = "softmax",
  tanh = "tanh",
  relu = "relu",
  purelin = "purelin",
  rnn = "rnn",
}

export type Layers = LogisticLayer | SoftmaxLayer | TanhLayer | ReluLayer | RNNLayer | AbstractLayer1D;
export type Layers1D = LogisticLayer | SoftmaxLayer | TanhLayer | ReluLayer | RNNLayer;
