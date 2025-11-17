import Math from "./Math";
import { NetworkBuilder1D } from "./Network/Builder";
import { SoftmaxLayer, LogisticLayer, ReluLayer, TanhLayer } from "./Network/Layer";
import {
  OptimizerAdam,
  OptimizerGradientDescent,
  OptimizerAdagrad,
  OptimizerMomentum,
  OptimizerRMSProp,
} from "./Network/Trainer/Optimizer";
import Trainer from "./Network/Trainer";
import { MeanSquaredErrorCost } from "./Network/Trainer/Cost/MeanSquaredErrorCost";
import { CrossEntropyCost } from "./Network/Trainer/Cost/CrossEntropyCost";

const NetworkBuilder = { NetworkBuilder1D };
const Layer = {
  SoftmaxLayer,
  LogisticLayer,
  ReluLayer,
  TanhLayer,
};
const Optimizer = {
  OptimizerAdam,
  OptimizerGradientDescent,
  OptimizerAdagrad,
  OptimizerMomentum,
  OptimizerRMSProp,
};
const Cost = {
  MeanSquaredErrorCost,
  CrossEntropyCost,
};

import native from "../../build/Release/node_native_memory.node";
import path from "path";

native.setModulePath(path.resolve(__dirname, "../"));

import { Dataset as DatasetDataset } from "./Dataset";
import { DatasetBuilder as DatasetBuilderBuilder, DatasetVocabularyBuilder } from "./Dataset/Builder";
import { SourceCSV } from "./Dataset/Builder/Source";
import { TextFile } from "./Dataset/Builder/VocabularySource";

import {
  MinMaxScalingDatasetModifier,
  MissingDataDatasetModifier,
  ShuffleDatasetModifier,
  SplitDatasetModifier,
} from "./Dataset/Modifier";

const DatasetBuilder = {
  DatasetBuilder: DatasetBuilderBuilder,
  DatasetVocabularyBuilder,
};
const Dataset = {
  Dataset: DatasetDataset,
};
const DatasetModifier = {
  MinMaxScalingDatasetModifier,
  MissingDataDatasetModifier,
  ShuffleDatasetModifier,
  SplitDatasetModifier,
};
const DatasetBuilderSource = {
  DatasetBuilderSourceCSV: SourceCSV,
  DatasetVocabularyBuilderSourceTextFile: TextFile,
};

export {
  NetworkBuilder,
  Layer,
  Optimizer,
  Trainer,
  Cost,
  Math,
  DatasetBuilder,
  Dataset,
  DatasetModifier,
  DatasetBuilderSource,
};
export default {
  NetworkBuilder,
  Layer,
  Optimizer,
  Trainer,
  Cost,
  Math,
  DatasetBuilder,
  Dataset,
  DatasetModifier,
  DatasetBuilderSource,
};
