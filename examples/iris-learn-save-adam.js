const {
  NetworkBuilder: { NetworkBuilder1D },
  Layer: { LogisticLayer, ReluLayer, TanhLayer, SoftmaxLayer },
  Optimizer: { OptimizerGradientDescent, OptimizerMomentum, OptimizerAdagrad, OptimizerRMSProp, OptimizerAdam },
  Trainer: { BatchTrainer },
  Cost: { MeanSquaredErrorCost, CrossEntropyCost },
  DatasetBuilder: { DatasetBuilder },
  DatasetBuilderSource: { DatasetBuilderSourceCSV },
  DatasetModifier: { MinMaxScalingDatasetModifier, MissingDataScalingDatasetModifier, ShuffleDatasetModifier },
} = require("../dist/impulse-ml.dev.js");
const path = require("path");

const builder = new NetworkBuilder1D([4]);
builder
  .createLayer(ReluLayer, (layer) => {
    layer.setSize(12);
  })
  .createLayer(ReluLayer, (layer) => {
    layer.setSize(8);
  })
  .createLayer(SoftmaxLayer, (layer) => {
    layer.setSize(3);
  });

const network = builder.getNetwork();

const mem = () => {
  console.log(process.memoryUsage().rss / 1000000 + " MB");
};

let start;
let end;

DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_x.csv"))).then(
  async (inputDataset) => {
    DatasetBuilder.fromSource(
      DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_y.csv")),
    ).then(async (outputDataset) => {
      inputDataset = new MinMaxScalingDatasetModifier().apply(inputDataset);

      const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
      trainer.setIterations(100);
      trainer.setBatchSize(16);
      trainer.setLearningRate(0.005);
      trainer.setRegularization(0.001);
      trainer.setVerboseStep(10);

      trainer.setStepCallback(() => {});

      start = new Date().getTime();
      trainer.train(inputDataset, outputDataset);
      end = new Date().getTime();
      console.log(end - start);
      mem();
      network.save(path.resolve(__dirname, "iris-adam.json"));

      console.log("forward", network.forward(inputDataset.exampleAt(0)).get(), outputDataset.exampleAt(0).get());
    });
  },
);
