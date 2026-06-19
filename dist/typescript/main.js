"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports.DatasetBuilderSource = exports.DatasetModifier = exports.Dataset = exports.DatasetBuilder = exports.Math = exports.Cost = exports.Trainer = exports.Optimizer = exports.Layer = exports.NetworkBuilder = void 0;
const Math_1 = __importDefault(require("./Math"));
exports.Math = Math_1.default;
const Builder_1 = require("./Network/Builder");
const Layer_1 = require("./Network/Layer");
const Optimizer_1 = require("./Network/Trainer/Optimizer");
const Trainer_1 = __importDefault(require("./Network/Trainer"));
exports.Trainer = Trainer_1.default;
const MeanSquaredErrorCost_1 = require("./Network/Trainer/Cost/MeanSquaredErrorCost");
const CrossEntropyCost_1 = require("./Network/Trainer/Cost/CrossEntropyCost");
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
const module_1 = __importDefault(require("module"));
const Dataset_1 = require("./Dataset");
const Builder_2 = require("./Dataset/Builder");
const Source_1 = require("./Dataset/Builder/Source");
const VocabularySource_1 = require("./Dataset/Builder/VocabularySource");
const Modifier_1 = require("./Dataset/Modifier");
const NetworkBuilder = { NetworkBuilder1D: Builder_1.NetworkBuilder1D };
exports.NetworkBuilder = NetworkBuilder;
const Layer = {
    SoftmaxLayer: Layer_1.SoftmaxLayer,
    LogisticLayer: Layer_1.LogisticLayer,
    ReluLayer: Layer_1.ReluLayer,
    TanhLayer: Layer_1.TanhLayer,
};
exports.Layer = Layer;
const Optimizer = {
    OptimizerAdam: Optimizer_1.OptimizerAdam,
    OptimizerGradientDescent: Optimizer_1.OptimizerGradientDescent,
    OptimizerAdagrad: Optimizer_1.OptimizerAdagrad,
    OptimizerMomentum: Optimizer_1.OptimizerMomentum,
    OptimizerRMSProp: Optimizer_1.OptimizerRMSProp,
};
exports.Optimizer = Optimizer;
const Cost = {
    MeanSquaredErrorCost: MeanSquaredErrorCost_1.MeanSquaredErrorCost,
    CrossEntropyCost: CrossEntropyCost_1.CrossEntropyCost,
};
exports.Cost = Cost;
const DatasetBuilder = {
    DatasetBuilder: Builder_2.DatasetBuilder,
    DatasetVocabularyBuilder: Builder_2.DatasetVocabularyBuilder,
};
exports.DatasetBuilder = DatasetBuilder;
const Dataset = {
    Dataset: Dataset_1.Dataset,
};
exports.Dataset = Dataset;
const DatasetModifier = {
    MinMaxScalingDatasetModifier: Modifier_1.MinMaxScalingDatasetModifier,
    MissingDataDatasetModifier: Modifier_1.MissingDataDatasetModifier,
    ShuffleDatasetModifier: Modifier_1.ShuffleDatasetModifier,
    SplitDatasetModifier: Modifier_1.SplitDatasetModifier,
};
exports.DatasetModifier = DatasetModifier;
const DatasetBuilderSource = {
    DatasetBuilderSourceCSV: Source_1.SourceCSV,
    DatasetVocabularyBuilderSourceTextFile: VocabularySource_1.TextFile,
};
exports.DatasetBuilderSource = DatasetBuilderSource;
let native = null;
const load = () => {
    if (native)
        return native;
    const addonPath = path_1.default.resolve(__dirname, "../build/Release/node_native_memory.node");
    const m = new module_1.default(addonPath, null);
    m.filename = addonPath;
    process_1.default.dlopen(m, addonPath, os_1.default.constants.dlopen.RTLD_NOW | os_1.default.constants.dlopen.RTLD_GLOBAL);
    native = m.exports;
    native.setModulePath(path_1.default.resolve(__dirname, "../"));
    return native;
};
exports.load = load;
exports.default = {
    NetworkBuilder,
    Layer,
    Optimizer,
    Trainer: Trainer_1.default,
    Cost,
    Math: Math_1.default,
    DatasetBuilder,
    Dataset,
    DatasetModifier,
    DatasetBuilderSource,
    load,
};
