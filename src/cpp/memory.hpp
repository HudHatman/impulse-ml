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

#include "memory_struct.h"
#include "native/native_device.hpp"
#include "native/native_memory.hpp"

namespace Addon {

  class Memory {
    public:
      static void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate);
      static v8::Local<v8::Object> NewInstance(v8::Isolate *isolate, Native::Memory * mem);

    private:
      static void New(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void free(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void set(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void get(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void setWidth(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void setHeight(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void setDepth(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void clone(const v8::FunctionCallbackInfo <v8::Value> &args);
      static void copyFrom(const v8::FunctionCallbackInfo <v8::Value> &args);
  };

}
