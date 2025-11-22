import path from 'path';
import os from 'os';
import process from 'process'

const addonPath = path.resolve(__dirname, './build/Release/node_native_memory.node');
const addon = { exports: {} };

process.dlopen(addon, addonPath, os.constants.dlopen.RTLD_NOW | os.constants.dlopen.RTLD_GLOBAL);

const native = addon.exports;

export {native};
