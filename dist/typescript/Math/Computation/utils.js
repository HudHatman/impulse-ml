"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevice = exports.setDevice = void 0;
const main_1 = require("../../main");
let currentDevice = null;
const setDevice = (device) => {
    currentDevice = device;
};
exports.setDevice = setDevice;
const getDevice = () => {
    if (!currentDevice) {
        const native = (0, main_1.load)();
        currentDevice = new native.Device.CPU();
    }
    return currentDevice;
};
exports.getDevice = getDevice;
