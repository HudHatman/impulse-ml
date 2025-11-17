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

#include "memory.hpp"

namespace Addon {

  class Device {
    public:
      static void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate);

    protected:
      static void NewGPUDevice(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void NewCPUDevice(const v8::FunctionCallbackInfo <v8::Value> &args);
      static v8::Local<v8::Function> InitNewGPUDevice(v8::Local<v8::Context> context, v8::Isolate* isolate);
      static v8::Local<v8::Function> InitNewCPUDevice(v8::Local<v8::Context> context, v8::Isolate* isolate);
      static void LoadModule(const v8::FunctionCallbackInfo <v8::Value> &args);

      static void getName(const v8::FunctionCallbackInfo<v8::Value>& args);
      static void getTotalMemory(const v8::FunctionCallbackInfo<v8::Value>& args);
      static void getComputeCapability(const v8::FunctionCallbackInfo<v8::Value>& args);
      static void alloc(const v8::FunctionCallbackInfo<v8::Value>& args);
      static void loadModule(const v8::FunctionCallbackInfo<v8::Value>& args);
  };

}
