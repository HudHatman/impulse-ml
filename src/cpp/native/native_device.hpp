#pragma once

#include <string>
#include <cstring>
#include <iostream>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "native_memory.hpp"

namespace Native {



  class Device : public node::ObjectWrap {
    public:
        Device() : node::ObjectWrap(), _deviceId(-1) {}
        Device(int deviceId) : node::ObjectWrap(), _deviceId(deviceId) {}
        ~Device() {}

        Native::Memory * alloc(size_t size);
        int getDeviceId();
        void getComputeCapability(int *minor, int *major);
        void wrap(v8::Local<v8::Object> instance);
        size_t getTotalMemory();
        std::string getDeviceName();
        void setIsGPU(bool value);
        void setIsCPU(bool value);
        bool getIsGPU();
        bool getIsCPU();

    protected:
        int _deviceId;
        bool _isGPU = false;
        bool _isCPU = false;
  };
}
