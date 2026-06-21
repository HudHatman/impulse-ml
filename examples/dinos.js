const {
  NetworkBuilder: { NetworkBuilderRNN },
  Layer: { RNNLayer },
  Optimizer: { OptimizerGradientDescent, OptimizerMomentum, OptimizerAdagrad, OptimizerRMSProp, OptimizerAdam },
  Trainer: { BatchTrainer },
  Cost: { MeanSquaredErrorCost, CrossEntropyCost },
  DatasetBuilder: { DatasetVocabularyBuilder },
  DatasetBuilderSource: { DatasetVocabularyBuilderSourceTextFile },
  DatasetModifier: { MinMaxScalingDatasetModifier, MissingDataScalingDatasetModifier, ShuffleDatasetModifier },
} = require("../dist/impulse-ml.dev.js");
const path = require("path");

/*const builder = new NetworkBuilder1D([784]);
builder
  .createLayer(ReluLayer, (layer) => {
    layer.setSize(128);
  })
  .createLayer(ReluLayer, (layer) => {
    layer.setSize(64);
  })
  .createLayer(SoftmaxLayer, (layer) => {
    layer.setSize(10);
  });

const network = builder.getNetwork();*/

const mem = () => {
  for (const [key, value] of Object.entries(process.memoryUsage())) {
    console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
  }
};

DatasetVocabularyBuilder.fromSource(DatasetVocabularyBuilderSourceTextFile.fromLocalFile(path.resolve(__dirname, "../data/dinos.txt"))).then(
  async (inputDataset) => {
    console.log("Loaded dinos.txt.");

    console.log('getVocabularySize', inputDataset.getVocabularySize());

    const builder = new NetworkBuilderRNN([inputDataset.getVocabularySize()]);
    builder.createLayer(RNNLayer, (layer) => {
      layer.setSize(128);
    });
    const network = builder.getNetwork();

    const o = network.forward(inputDataset.getExamples()[0]);
    network.backward(inputDataset.getExamples()[0]);
    console.log(o[0].get());
  },
);
