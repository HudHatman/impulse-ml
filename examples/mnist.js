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

const builder = new NetworkBuilder1D([785]);
builder
  .createLayer(LogisticLayer, (layer) => {
    layer.setSize(100);
  })
  .createLayer(LogisticLayer, (layer) => {
    layer.setSize(50);
  })
  .createLayer(SoftmaxLayer, (layer) => {
    layer.setSize(10);
  });

const network = builder.getNetwork();

const mem = () => {
  for (const [key,value] of Object.entries(process.memoryUsage())){
    console.log(`Memory usage by ${key}, ${value/1000000}MB `)
  }
}

DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/input.csv"))).then(
  async (inputDataset) => {
    console.log("Loaded input.csv");
    DatasetBuilder.fromSource(DatasetBuilderSourceCSV.fromLocalFile(path.resolve(__dirname, "../data/output.csv"))).then(
      async (outputDataset) => {
        inputDataset = new MinMaxScalingDatasetModifier().apply(inputDataset);
        
        const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
        trainer.setIterations(300);
        trainer.setBatchSize(16);
        trainer.setLearningRate(0.01);
        trainer.setRegularization(0.0001);
        trainer.setVerboseStep(1);

        trainer.setStepCallback(() => {
          //console.log("forward", network.forward(x).get(), outputDataset.data.get());
        });
        console.log(inputDataset.exampleAt(0))
        const start = new Date().getTime();
        trainer.train(inputDataset, outputDataset);
        const end = new Date().getTime();
        console.log(end - start);
        mem();
        network.save(path.resolve(__dirname, 'iris.json'))
      }
    );
  }
);
