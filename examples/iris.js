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
    layer.setSize(8);
  })
  .createLayer(ReluLayer, (layer) => {
    layer.setSize(6);
  })
  .createLayer(SoftmaxLayer, (layer) => {
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
        
        // --- HYPERPARAMETER CHANGE ---
        const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
        trainer.setIterations(1000);
        trainer.setLearningRate(0.001);
        trainer.setRegularization(0.01);
        // --- END HYPERPARAMETER CHANGE ---

        trainer.setStepCallback(() => {
          //console.log("forward", network.forward(x).get(), outputDataset.data.get());
        });
        trainer.train(inputDataset, outputDataset);
      }
    );
  }
);
