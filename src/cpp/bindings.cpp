#include <string>
#include <cstring>
#include <iostream>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "globals.hpp"
#include "bindings.hpp"
#include "device.hpp"
#include "memory.hpp"
#include "module.hpp"

void SetModulePath(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "Argument must be a string").ToLocalChecked()));
        return;
    }

    v8::String::Utf8Value path_value(isolate, args[0].As<v8::String>());
    modulePath = *path_value;
}

void Addon::GetDriverVersion(const v8::FunctionCallbackInfo <v8::Value> &args) {
  int driverVersion = 0;
  //cuDriverGetVersion(&driverVersion);

  v8::Isolate * isolate = args.GetIsolate();
  args.GetReturnValue().Set(v8::Number::New(isolate, driverVersion));
}

void Addon::GetDeviceCount(const v8::FunctionCallbackInfo <v8::Value> &args) {
  int count = 0;
  //cuDeviceGetCount(&count);

  v8::Isolate * isolate = args.GetIsolate();
  args.GetReturnValue().Set(v8::Number::New(isolate, count));
}

void Addon::Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Value> module, void* priv) {
  //cuInit(0);

  v8::Isolate * isolate = v8::Isolate::GetCurrent();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  NODE_SET_METHOD(exports, "cudaDriverVersion", Addon::GetDriverVersion);
  NODE_SET_METHOD(exports, "cudaDeviceCount", Addon::GetDeviceCount);
  NODE_SET_METHOD(exports, "setModulePath", SetModulePath);
  Addon::Device::Initialize(exports, context, isolate);
  Addon::Memory::Initialize(exports, context, isolate);
  Addon::Module::Initialize(exports, context, isolate);
  //Addon::Function::Initialize(exports, context, isolate);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Addon::Initialize)
