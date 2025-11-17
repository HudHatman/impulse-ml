const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const native = require(path.resolve(__dirname, './build/Release/node_native_memory.node'));

// eslint-disable-next-line no-undef
native.setModulePath(__dirname);

// eslint-disable-next-line no-undef
module.exports = {native};