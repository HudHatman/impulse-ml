# impulse-ml

A neural network library for Node.js built with TypeScript and C++ native addons. It provides GPU-style parallel computation via OpenMP and supports building, training, and saving feed-forward neural networks with various layers, optimizers, and cost functions.

## Features

- **Network builder** — construct 1-D feed-forward networks with configurable layers
- **Layer types** — Logistic (Sigmoid), ReLU, Tanh, Softmax
- **Optimizers** — Gradient Descent, Momentum, Adagrad, RMSProp, Adam
- **Cost functions** — Mean Squared Error, Cross-Entropy
- **Dataset utilities** — CSV loading, Min-Max scaling, missing-data handling, shuffling
- **Batch training** with configurable learning rate, regularization, batch size, and iteration count
- **Native C++ addon** with OpenMP for parallel math operations
- **Save / load** trained networks to JSON

## Requirements

| Requirement | Version |
|---|---|
| Node.js | >= 18 (tested with v22) |
| npm | >= 8 |
| C++ compiler | GCC / Clang with C++17 support |
| OpenMP | runtime (`libgomp` on Linux) |
| node-gyp | globally or via npx |
| Python | 3.x (required by node-gyp) |

### Linux (Debian / Ubuntu)

```bash
sudo apt-get install -y build-essential libgomp1 python3
```

> **Note:** NVIDIA CUDA support is referenced in the package metadata but the current build configuration targets CPU (OpenMP) only. <!-- TODO: document CUDA setup when available -->

## Installation

```bash
git clone https://github.com/HudHatman/impulse-ml.git
cd impulse-ml
npm install        # compiles the native C++ addon via node-gyp
```

`npm install` automatically runs `node-gyp configure build` (preinstall) and `node-gyp rebuild` (install) to compile the native addon.

## Build

```bash
# Production + development bundles
npm run build

# Development bundle only (also rebuilds native addon)
npm run build-dev

# Production bundle only
npm run build-prod
```

The webpack bundles are written to `dist/`:

| File | Description |
|---|---|
| `dist/impulse-ml.js` | Production bundle (main entry) |
| `dist/impulse-ml.dev.js` | Development bundle with source maps |

## Scripts

| Script | Command | Description |
|---|---|---|
| `build` | `npm run build` | Build both production and development bundles |
| `build-dev` | `npm run build-dev` | Rebuild native addon + webpack dev bundle |
| `build-prod` | `npm run build-prod` | Webpack production bundle |
| `prettier-write` | `npm run prettier-write` | Format TypeScript source with Prettier |
| `lint` | `npm run lint` | Run ESLint on TypeScript files |
| `lint-fix` | `npm run lint-fix` | Run ESLint with auto-fix |
| `docs` | `npm run docs` | Generate API docs with TypeDoc |

## Usage

```js
const {
  NetworkBuilder: { NetworkBuilder1D },
  Layer: { ReluLayer, SoftmaxLayer },
  Optimizer: { OptimizerAdam },
  Trainer: { BatchTrainer },
  Cost: { CrossEntropyCost },
  DatasetBuilder: { DatasetBuilder },
  DatasetBuilderSource: { DatasetBuilderSourceCSV },
  DatasetModifier: { MinMaxScalingDatasetModifier },
} = require("impulse-ml"); // or "../dist/impulse-ml.dev.js" from examples

// 1. Define network architecture
const builder = new NetworkBuilder1D([784]);
builder
  .createLayer(ReluLayer, (layer) => layer.setSize(128))
  .createLayer(ReluLayer, (layer) => layer.setSize(64))
  .createLayer(SoftmaxLayer, (layer) => layer.setSize(10));

const network = builder.getNetwork();

// 2. Load dataset from CSV
const inputDataset = await DatasetBuilder.fromSource(
  DatasetBuilderSourceCSV.fromLocalFile("data/input.csv"),
);
const outputDataset = await DatasetBuilder.fromSource(
  DatasetBuilderSourceCSV.fromLocalFile("data/output.csv"),
);

// 3. Pre-process
const scaledInput = new MinMaxScalingDatasetModifier().apply(inputDataset);

// 4. Train
const trainer = new BatchTrainer(network, new OptimizerAdam(), new CrossEntropyCost());
trainer.setIterations(20);
trainer.setBatchSize(128);
trainer.setLearningRate(0.001);
trainer.setRegularization(0.01);
trainer.train(scaledInput, outputDataset);

// 5. Save
network.save("model.json");
```

## Examples

Example scripts are located in the `examples/` directory:

| File | Description |
|---|---|
| `mnist.js` | MNIST digit classification (784→128→64→10, Adam + Cross-Entropy) |
| `iris-learn-save-adam-relu-cross-entropy.js` | Iris dataset — Adam optimizer, ReLU layers |
| `iris-learn-save-adam-tanh-cross-entropy.js` | Iris dataset — Adam optimizer, Tanh layers |
| `iris-learn-save-gc-relu-cross-entropy.js` | Iris dataset — Gradient Descent, ReLU layers |
| `iris-load.js` | Load a previously saved Iris model |

Run an example:

```bash
node examples/iris-learn-save-adam-relu-cross-entropy.js
```

> **Note:** The MNIST example requires `data/input.csv` and `data/output.csv`. See `examples/mnist_train.tar.gz` for training data.

## Environment Variables

<!-- TODO: document any environment variables if applicable -->

No custom environment variables are currently required. Standard Node.js variables (`NODE_ENV`, etc.) apply.

## Tests

<!-- TODO: add test framework and test scripts -->

No test suite is configured yet. Contributions welcome.

## Project Structure

```
impulse-ml/
├── src/
│   ├── typescript/          # TypeScript source
│   │   ├── main.ts          # Library entry point (exports)
│   │   ├── types.ts         # Shared type definitions
│   │   ├── Network/         # Network, Builder, Layer, Trainer
│   │   ├── Dataset/         # Dataset, Builder, Modifier
│   │   └── Math/            # Matrix/vector math (Calc, Computation)
│   └── cpp/                 # C++ native addon source
│       ├── bindings.cpp     # Node-API bindings entry
│       ├── memory.*         # Native memory management
│       ├── device.*         # Device abstraction
│       ├── function.*       # Native math functions
│       ├── module.*         # Module management
│       └── native/          # Low-level native implementations
├── configs/
│   ├── dev.js               # Webpack development config
│   └── prod.js              # Webpack production config
├── dist/                    # Compiled bundles (output)
├── examples/                # Example scripts (MNIST, Iris)
├── data/                    # Training data (CSV)
├── docs/                    # Generated TypeDoc API docs
├── binding.gyp              # node-gyp build configuration
├── build.sh                 # Shell shortcut: npm run build
├── tsconfig.json            # TypeScript compiler config
├── typedoc.json             # TypeDoc configuration
├── package.json             # npm package manifest
└── index.js                 # Native addon loader (ESM)
```

## API Documentation

Pre-generated API docs are available in the `docs/` directory. To regenerate:

```bash
npm run docs
```

## License

[MIT](LICENSE) — Copyright Michał Baniowski
