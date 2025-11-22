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
  console.log((process.memoryUsage().rss / 1000000) + " MB");
}

let start = new Date().getTime();
let end;

DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_x.csv"))).then(
  async (inputDataset) => {
    DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/iris_y.csv"))).then(
      async (outputDataset) => {
        inputDataset = new MinMaxScalingDatasetModifier().apply(inputDataset);

        end = new Date().getTime();
        const y = network.forward(inputDataset.exampleAt(0));
        console.log(end - start, y, y.get()); mem();

        const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
        trainer.setIterations(3);
        trainer.setBatchSize(16);
        trainer.setLearningRate(0.01);
        trainer.setRegularization(0.0001);
        trainer.setVerboseStep(100);

        trainer.setStepCallback(() => {
          //console.log("forward", network.forward(x).get(), outputDataset.data.get());
        });
        start = new Date().getTime();
        trainer.train(inputDataset, outputDataset);
        end = new Date().getTime();
        console.log(end - start);
        mem();
        network.save(path.resolve(__dirname, 'iris.json'))
      }
    );
  }
);
