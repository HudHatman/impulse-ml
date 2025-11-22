import { load } from "../../main";
type Device = any;

let currentDevice: Device = null;

export const setDevice = (device: Device): void => {
  currentDevice = device;
};

export const getDevice = (): Device => {
  if (!currentDevice) {
    const native = load();
    currentDevice = new native.Device.CPU();
  }
  return currentDevice;
};
