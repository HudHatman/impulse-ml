#include <string>
#include <cstring>
#include <iostream>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "device.hpp"
#include "module.hpp"
#include "native/native_device.hpp"
#include "native/native_memory.hpp"
#include "native/native_module.hpp"

void Addon::Device::getComputeCapability(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  Native::Device * device = node::ObjectWrap::Unwrap<Native::Device>(instance);

  int minor = 0, major = 0;
  device->getComputeCapability(&minor, &major);

  v8::Local<v8::Object> resultObject = v8::Object::New(isolate);
  resultObject->Set(context, v8::String::NewFromUtf8(isolate, "major").ToLocalChecked(), v8::Number::New(isolate, major)).ToChecked();
  resultObject->Set(context, v8::String::NewFromUtf8(isolate, "minor").ToLocalChecked(), v8::Number::New(isolate, minor)).ToChecked();

  args.GetReturnValue().Set(resultObject);
}

void Addon::Device::getTotalMemory(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Object> instance = args.This();

  Native::Device * d = node::ObjectWrap::Unwrap<Native::Device>(instance);
  size_t totalMemory = d->getTotalMemory();

  args.GetReturnValue().Set(v8::Number::New(isolate, totalMemory));
}

void Addon::Device::getName(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Object> instance = args.This();

  Native::Device *d = node::ObjectWrap::Unwrap<Native::Device>(instance);
  std::string deviceName = d->getDeviceName();

  args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, deviceName.c_str()).ToLocalChecked());
}

void Addon::Device::NewGPUDevice(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  v8::Local<v8::Object> instance = args.This();

  Native::Device * device = new Native::Device(args[0].As<v8::Int32>()->Value());
  device->setIsGPU(true);
  device->wrap(instance);

  instance->Set(context, v8::String::NewFromUtf8(isolate, "deviceId").ToLocalChecked(), v8::Int32::New(isolate, device->getDeviceId())).FromJust();
}

void Addon::Device::NewCPUDevice(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  v8::Local<v8::Object> instance = args.This();

  Native::Device * device = new Native::Device();
  device->setIsCPU(true);
  device->wrap(instance);
}

void Addon::Device::LoadModule(const v8::FunctionCallbackInfo <v8::Value> &args) {

}

void Addon::Device::loadModule(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  Native::Device *d = node::ObjectWrap::Unwrap<Native::Device>(instance);

  v8::String::Utf8Value utf8_value(isolate, args[0].As<v8::String>());
  const char* moduleName = *utf8_value;
  Native::Module * module = new Native::Module();
  module->load(d->getDeviceId(), moduleName);

  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Device::LoadModule);
  tpl->SetClassName(v8::String::NewFromUtf8(isolate, "NativeModule").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();
  v8::Local<v8::Object> moduleInstance = constructor->NewInstance(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> loadFunctionTemplate = v8::FunctionTemplate::New(isolate, Addon::Module::getFunction);
  v8::Local<v8::Function> loadFunction = loadFunctionTemplate->GetFunction(context).ToLocalChecked();

  moduleInstance->Set(context, v8::String::NewFromUtf8(isolate, "loadFunction").ToLocalChecked(), loadFunction).ToChecked();
  module->wrap(moduleInstance);

  args.GetReturnValue().Set(moduleInstance);
}

void Addon::Device::alloc(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Object> instance = args.This();

  Native::Device *d = node::ObjectWrap::Unwrap<Native::Device>(instance);

  size_t size = args[0].As<v8::Int32>()->Value();

  Native::Memory * mem = d->alloc(size);
  v8::Local<v8::Object> memoryInstance = Addon::Memory::NewInstance(isolate, mem);

  args.GetReturnValue().Set(memoryInstance);
}

v8::Local<v8::Function> Addon::Device::InitNewGPUDevice(v8::Local<v8::Context> context, v8::Isolate* isolate) {
  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Device::NewGPUDevice);
  tpl->SetClassName(v8::String::NewFromUtf8(isolate, "GPUDevice").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  v8::Local<v8::Signature> signature = v8::Signature::New(isolate, tpl);

  v8::Local<v8::FunctionTemplate> getName = v8::FunctionTemplate::New(isolate, Addon::Device::getName, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getName").ToLocalChecked(), getName);

  v8::Local<v8::FunctionTemplate> getTotalMemory = v8::FunctionTemplate::New(isolate, Addon::Device::getTotalMemory, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getTotalMemory").ToLocalChecked(), getTotalMemory);

  v8::Local<v8::FunctionTemplate> getComputeCapability = v8::FunctionTemplate::New(isolate, Addon::Device::getComputeCapability, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getComputeCapability").ToLocalChecked(), getComputeCapability);

  v8::Local<v8::FunctionTemplate> alloc = v8::FunctionTemplate::New(isolate, Addon::Device::alloc, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "alloc").ToLocalChecked(), alloc);

  v8::Local<v8::FunctionTemplate> loadModule = v8::FunctionTemplate::New(isolate, Addon::Device::loadModule, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "loadModule").ToLocalChecked(), loadModule);

  v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();

  return constructor;
}

v8::Local<v8::Function> Addon::Device::InitNewCPUDevice(v8::Local<v8::Context> context, v8::Isolate* isolate) {
  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Device::NewCPUDevice);
  tpl->SetClassName(v8::String::NewFromUtf8(isolate, "CPUDevice").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  v8::Local<v8::Signature> signature = v8::Signature::New(isolate, tpl);

  v8::Local<v8::FunctionTemplate> getName = v8::FunctionTemplate::New(isolate, Addon::Device::getName, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getName").ToLocalChecked(), getName);

  //v8::Local<v8::FunctionTemplate> getTotalMemory = v8::FunctionTemplate::New(isolate, Addon::Device::getTotalMemory, v8::Local<v8::Value>(), signature);
  //tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getTotalMemory").ToLocalChecked(), getTotalMemory);

  //v8::Local<v8::FunctionTemplate> getComputeCapability = v8::FunctionTemplate::New(isolate, Addon::Device::getComputeCapability, v8::Local<v8::Value>(), signature);
  //tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "getComputeCapability").ToLocalChecked(), getComputeCapability);

  v8::Local<v8::FunctionTemplate> alloc = v8::FunctionTemplate::New(isolate, Addon::Device::alloc, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "alloc").ToLocalChecked(), alloc);

  v8::Local<v8::FunctionTemplate> loadModule = v8::FunctionTemplate::New(isolate, Addon::Device::loadModule, v8::Local<v8::Value>(), signature);
  tpl->PrototypeTemplate()->Set(v8::String::NewFromUtf8(isolate, "loadModule").ToLocalChecked(), loadModule);

  v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();

  return constructor;
}

void Addon::Device::Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate) {
  v8::Local<v8::Function> gpu = Addon::Device::InitNewGPUDevice(context, isolate);
  v8::Local<v8::Function> cpu = Addon::Device::InitNewCPUDevice(context, isolate);

  v8::Local<v8::Object> resultObject = v8::Object::New(isolate);
  resultObject->Set(context, v8::String::NewFromUtf8(isolate, "GPU").ToLocalChecked(), gpu).ToChecked();
  resultObject->Set(context, v8::String::NewFromUtf8(isolate, "CPU").ToLocalChecked(), cpu).ToChecked();

  exports->Set(context, v8::String::NewFromUtf8(isolate, "Device").ToLocalChecked(), resultObject).FromJust();
}
