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
      layer.setSize(50);
    });
    const network = builder.getNetwork();
    const iterations = 10;
    const learningRate = 0.001;
    const data = inputDataset.buildData(40, 1);
    console.log("Data built.");

    for (let i = 0; i < iterations; i++) {
      console.log(`Iteration: ${i}`);
      for (let j = 0; j < data.length; j++) {
        network.forward(data[j]);
        network.backward(data[j], data[j]);

        const layer = network.getLayers()[0];

        console.log(layer.Wya.get());

        layer.Wax.replace(layer.Wax.subtract(layer.dWax.multiply(learningRate)));
        layer.Waa.replace(layer.Waa.subtract(layer.dWaa.multiply(learningRate)));
        layer.Wya.replace(layer.Wya.subtract(layer.dWya.multiply(learningRate)));
        layer.ba.replace(layer.ba.subtract(layer.dba.multiply(learningRate)));
        layer.by.replace(layer.by.subtract(layer.dby.multiply(learningRate)));

        //console.log(layer.dWax.get());

        //if (j % 5 === 0) process.exit();

        if (j % 50 === 0) {
          console.log(`${j} / ${data.length}`);

          if (j % 200 === 0) {
            console.log(`SAMPLE: ${network.sample(inputDataset)}\n---END SAMPLE.`);
          }
        }
      }
      console.log(network.sample(inputDataset));
      network.save("dinos.json");
    }

    const o = network.forward(inputDataset.getExamples()[0]);
    network.backward(inputDataset.getExamples()[0]);

    console.log(network.sample(inputDataset));

    //
  },
);
