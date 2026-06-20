const {
  NetworkBuilder: { NetworkBuilder1D },
  Layer: { LogisticLayer, ReluLayer, TanhLayer, SoftmaxLayer },
  Optimizer: {
    OptimizerGradientDescent,
    OptimizerMomentum,
    OptimizerAdagrad,
    OptimizerRMSProp,
    OptimizerAdam,
  },
  Trainer: { BatchTrainer },
  Cost: { MeanSquaredErrorCost, CrossEntropyCost },
  DatasetBuilder: { DatasetBuilder },
  DatasetBuilderSource: { DatasetBuilderSourceCSV },
  DatasetModifier: { MinMaxScalingDatasetModifier, MissingDataScalingDatasetModifier, ShuffleDatasetModifier },
} = require("../dist/impulse-ml.dev.js");
const path = require("path");

const builder = new NetworkBuilder1D([784]);
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

const network = builder.getNetwork();

const mem = () => {
  for (const [key, value] of Object.entries(process.memoryUsage())) {
    console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
  }
};

DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/mnist_train_x.csv"))).then(
  async (inputDataset) => {
    console.log("Loaded input.csv");
    DatasetBuilder.fromSource(
      DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/mnist_train_y.csv")),
    ).then(async (outputDataset) => {
      const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
      trainer.setIterations(20);
      trainer.setBatchSize(128);
      trainer.setLearningRate(0.001);
      trainer.setRegularization(0.0001);
      trainer.setVerboseStep(1);

      trainer.setStepCallback(() => {
        //console.log("forward", network.forward(x).get(), outputDataset.data.get());
      });
      console.log(inputDataset.exampleAt(0));
      const start = new Date().getTime();
      trainer.train(inputDataset, outputDataset);
      const end = new Date().getTime();
      console.log(end - start);
      mem();
      network.save(path.resolve(__dirname, "mnist.json"));
    });
  },
);
