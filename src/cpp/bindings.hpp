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

namespace Addon {
  void GetDriverVersion(const v8::FunctionCallbackInfo <v8::Value> &args);
  void GetDeviceCount(const v8::FunctionCallbackInfo <v8::Value> &args);
  void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Value> module, void* priv);
}
