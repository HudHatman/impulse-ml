import nodenative from "../../../../build/Release/node_native_memory.node";

type Device = any;

let currentDevice: Device = new nodenative.Device.CPU();

export const setDevice = (device: Device): void => {
  currentDevice = device;
};

export const getDevice = (): Device => {
  return currentDevice;
};
