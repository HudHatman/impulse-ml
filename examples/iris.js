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
  .createLayer(TanhLayer, (layer) => {
    layer.setSize(8);
  })
  .createLayer(TanhLayer, (layer) => {
    layer.setSize(6);
  })
  .createLayer(TanhLayer, (layer) => {
    layer.setSize(3);
  });

const network = builder.getNetwork();

const mem = () => {
  for (const [key,value] of Object.entries(process.memoryUsage())){
    console.log(`Memory usage by ${key}, ${value/1000000}MB `)
  }
}

DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_x.csv"))).then(
  async (inputDataset) => {
    console.log("Loaded iris_x.csv");
    DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_y.csv"))).then(
      async (outputDataset) => {
        const x = inputDataset.exampleAt(0);
        inputDataset = new MinMaxScalingDatasetModifier().apply(inputDataset);
        const trainer = new BatchTrainer(network, new OptimizerAdagrad(), new MeanSquaredErrorCost());
        trainer.setIterations(500);
        trainer.setLearningRate(0.1);
        trainer.setRegularization(0.001);
        trainer.setStepCallback(() => {
          //console.log("forward", network.forward(x).get(), outputDataset.data.get());
        });
        trainer.train(inputDataset, outputDataset);
      }
    );
  }
);
