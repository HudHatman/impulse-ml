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
import os from "os";
import process from "process";
import path from "path";
import Module from "module";

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

let native = null;

const load = () => {
  if (native) return native;

  const addonPath = path.resolve(__dirname, "../build/Release/node_native_memory.node");

  const m = new Module(addonPath, null);
  m.filename = addonPath;

  process.dlopen(m, addonPath, os.constants.dlopen.RTLD_NOW | os.constants.dlopen.RTLD_GLOBAL);

  native = m.exports;
  native.setModulePath(path.resolve(__dirname, "../"));

  return native;
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
  load,
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
  load,
};
