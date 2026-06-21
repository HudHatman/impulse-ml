const {
  NetworkBuilder: { NetworkBuilderRNN },
  Layer: { LogisticLayer, ReluLayer, TanhLayer, SoftmaxLayer },
  Optimizer: { OptimizerGradientDescent, OptimizerMomentum, OptimizerAdagrad, OptimizerRMSProp, OptimizerAdam },
  Trainer: { BatchTrainer },
  Cost: { MeanSquaredErrorCost, CrossEntropyCost },
  DatasetBuilder: { DatasetBuilder, DatasetVocabularyBuilder },
  DatasetBuilderSource: { DatasetVocabularyBuilderSourceTextFile },
  DatasetModifier: { MinMaxScalingDatasetModifier, MissingDataScalingDatasetModifier, ShuffleDatasetModifier },
} = require("../dist/impulse-ml.dev.js");
const path = require("path");

const mem = () => {
  for (const [key,value] of Object.entries(process.memoryUsage())){
    console.log(`Memory usage by ${key}, ${value/1000000}MB `)
  }
}

NetworkBuilderRNN.fromJSON("./dinos.json").then((network) => {
  DatasetVocabularyBuilder.fromSource(
    DatasetVocabularyBuilderSourceTextFile.fromLocalFile(path.resolve(__dirname, "../data/dinos.txt")),
  ).then(async (inputDataset) => {
    console.log(network.sample(inputDataset));
  });
})

