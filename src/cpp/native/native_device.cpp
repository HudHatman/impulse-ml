#include <string>
#include <cstring>
#include <iostream>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "native_device.hpp"

Native::Memory * Native::Device::alloc(size_t size) {
    Native::Memory * memory = new Native::Memory(this->getDeviceId());
    memory->setSize(size);
    memory->setIsGPU(this->_isGPU);
    memory->setIsCPU(this->_isCPU);

    memory->alloc(size);

    return memory;
}

int Native::Device::getDeviceId() { return this->_deviceId; }

void Native::Device::getComputeCapability(int * minor, int * major) {
    //CUresult result = cuDeviceComputeCapability(minor, major, this->getDeviceId());

    //if (result != CUDA_SUCCESS) {

    //}
}

void Native::Device::wrap(v8::Local<v8::Object> instance) {
    this->Wrap(instance);
}

size_t Native::Device::getTotalMemory() {
    //size_t totalMemory;
    //CUresult result = cuDeviceTotalMem(&totalMemory, this->getDeviceId());

    //if (result == CUDA_SUCCESS) {
    //    return totalMemory;
    //}
    return 0;
}

std::string Native::Device::getDeviceName() {
    //char deviceName[256];

    //CUresult result = cuDeviceGetName(deviceName, 256, this->getDeviceId());

    //if (result == CUDA_SUCCESS) {
    //    return std::string(deviceName);
    //} else {
        return std::string("");
    //}
}

void Native::Device::setIsGPU(bool value) {
    this->_isGPU = value;
}

void Native::Device::setIsCPU(bool value) {
    this->_isCPU = value;
}

bool Native::Device::getIsGPU() {
    return this->_isGPU;
}

bool Native::Device::getIsCPU() {
    return this->_isCPU;
}
