#include "memory.hpp"

v8::Local<v8::Object> Addon::Memory::NewInstance(v8::Isolate *isolate, Native::Memory * mem) {
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Memory::New);
  tpl->SetClassName(v8::String::NewFromUtf8(isolate, "NativeMemory").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(7);
  v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();
  v8::Local<v8::Object> memoryInstance = constructor->NewInstance(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> freeTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::free);
  v8::Local<v8::Function> freeFunction = freeTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> setTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::set);
  v8::Local<v8::Function> setFunction = setTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> getTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::get);
  v8::Local<v8::Function> getFunction = getTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> setWidthTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::setWidth);
  v8::Local<v8::Function> setWidthFunction = setWidthTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> setHeightTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::setHeight);
  v8::Local<v8::Function> setHeightFunction = setHeightTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> setDepthTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::setDepth);
  v8::Local<v8::Function> setDepthFunction = setDepthTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> cloneTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::clone);
  v8::Local<v8::Function> cloneFunction = cloneTemplate->GetFunction(context).ToLocalChecked();

  v8::Local<v8::FunctionTemplate> copyFromTemplate = v8::FunctionTemplate::New(isolate, Addon::Memory::copyFrom);
  v8::Local<v8::Function> copyFromFunction = copyFromTemplate->GetFunction(context).ToLocalChecked();

  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "size").ToLocalChecked(), v8::Number::New(isolate, (int) mem->getSize())).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "free").ToLocalChecked(), freeFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "set").ToLocalChecked(), setFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "get").ToLocalChecked(), getFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "setWidth").ToLocalChecked(), setWidthFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "setHeight").ToLocalChecked(), setHeightFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "setDepth").ToLocalChecked(), setDepthFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "clone").ToLocalChecked(), cloneFunction).ToChecked();
  memoryInstance->Set(context, v8::String::NewFromUtf8(isolate, "copyFrom").ToLocalChecked(), copyFromFunction).ToChecked();

  mem->wrap(memoryInstance);

  return memoryInstance;
}

/*
size_t NodeNativeMemory::Memory::getSize() {
  return this->size;
}

void NodeNativeMemory::Memory::_get(void * to) {
  CUresult res = cuCtxPushCurrent(this->contextPtr);
  if (res != CUDA_SUCCESS) {
    return;
  }

  res = cuMemcpyDtoH(to, this->devicePtr, this->size * sizeof(double));

  if (res != CUDA_SUCCESS) {
    return;
  }

  CUcontext originalContext;
  cuCtxPopCurrent(&originalContext);
}

NodeNativeMemory::Memory * NodeNativeMemory::Memory::_set(double * input, bool async) {
  CUresult error;

  error = cuCtxSetCurrent(this->contextPtr);
  if (error != CUDA_SUCCESS) {
    return this;
  }

  if (async) {
    error = cuMemcpyHtoDAsync(this->devicePtr, input, this->size * sizeof(double), 0);
  } else {
    error = cuMemcpyHtoD(this->devicePtr, input, this->size * sizeof(double));
  }

  if (error != CUDA_SUCCESS) {
    return this;
  }

  this->isSet = true;
  return this;
}

NodeNativeMemory::NativeMemory * NodeNativeMemory::Memory::_alloc(const size_t size) {
  CUdevice cudevice;
  CUcontext cucontext;
  CUresult cuerror;

  cuerror = cuDeviceGet(&cudevice, this->device->deviceId);
  if (cuerror != CUDA_SUCCESS) {
    return this;
  }

  unsigned int flags = 0;
  cuerror = cuCtxCreate(&cucontext, flags, cudevice);
  if (cuerror != CUDA_SUCCESS) {
    return this;
  }

  cuerror = cuCtxSetCurrent(cucontext);
  if (cuerror != CUDA_SUCCESS) {
    return this;
  }

  CUdeviceptr ptr;
  cuerror = cuMemAlloc(&ptr, sizeof(double) * size);

  if (cuerror != CUDA_SUCCESS) {
    return this;
  }

  this->size = size;
  this->devicePtr = ptr;
  this->contextPtr = cucontext;

  return this;
}

NodeNativeMemory::Memory * NodeNativeMemory::Memory::_free() {
  CUresult error = cuCtxSetCurrent(this->contextPtr);
  if (error != CUDA_SUCCESS) {
    return this;
  }

  error = cuMemFree(this->devicePtr);

  if (error != CUDA_SUCCESS) {
    return this;
  }

  this->devicePtr = 0;
  this->contextPtr = 0;
  this->size = 0;
  this->isSet = false;

  return this;
}

*/
void Addon::Memory::clone(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  Native::Memory * clone = m->clone();

  args.GetReturnValue().Set(Addon::Memory::NewInstance(isolate, clone));
}
void Addon::Memory::setWidth(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  if (args.Length() < 1 || !args[0]->IsNumber()) {
    isolate->ThrowException(v8::Exception::TypeError(
        v8::String::NewFromUtf8(isolate, "Argument 0 must be a number.").ToLocalChecked()));
    return;
  }

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  int rows = args[0]->Int32Value(context).ToChecked();
  m->setRows(rows);

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::setHeight(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  if (args.Length() < 1 || !args[0]->IsNumber()) {
    isolate->ThrowException(v8::Exception::TypeError(
        v8::String::NewFromUtf8(isolate, "Argument 0 must be a number.").ToLocalChecked()));
    return;
  }

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  int cols = args[0]->Int32Value(context).ToChecked();
  m->setCols(cols);

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::copyFrom(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  if (args.Length() < 1 || !args[0]->IsObject()) {
    isolate->ThrowException(v8::Exception::TypeError(
        v8::String::NewFromUtf8(isolate, "Argument 0 must be a object.").ToLocalChecked()));
    return;
  }

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  v8::Local<v8::Object> _from = args[0].As<v8::Object>();
  Native::Memory *from = node::ObjectWrap::Unwrap<Native::Memory>(_from);
  m->copyFrom(from);

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::setDepth(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  if (args.Length() < 1 || !args[0]->IsNumber()) {
    isolate->ThrowException(v8::Exception::TypeError(
        v8::String::NewFromUtf8(isolate, "Argument 0 must be a number.").ToLocalChecked()));
    return;
  }

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  int depth = args[0]->Int32Value(context).ToChecked();
  m->setDepth(depth);

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::free(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Local<v8::Object> instance = args.This();

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  m->free();

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::set(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Object> instance = args.This();

  if (!args[0]->IsFloat64Array()) {
    isolate->ThrowException(v8::Exception::TypeError(
    v8::String::NewFromUtf8(isolate, "Argument 0 is not Float64Array").ToLocalChecked()));
    return;
  }
  bool async = args.Length() >= 2 && args[1]->IsTrue();

  v8::Local<v8::Float64Array> jsArray = args[0].As<v8::Float64Array>();
  std::shared_ptr<v8::BackingStore> backingStore = jsArray->Buffer()->GetBackingStore();
  double* hostInput = static_cast<double*>(backingStore->Data());

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);
  m->set(hostInput, async);

  args.GetReturnValue().Set(instance);
}

void Addon::Memory::get(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Object> instance = args.This();

  Native::Memory *m = node::ObjectWrap::Unwrap<Native::Memory>(instance);

  v8::Local<v8::ArrayBuffer> arrayBuffer = v8::ArrayBuffer::New(isolate, m->getSize() * sizeof(double));
  std::shared_ptr<v8::BackingStore> backingStore = arrayBuffer->GetBackingStore();

  m->get(backingStore->Data());

  v8::Local<v8::Float64Array> float64Array = v8::Float64Array::New(arrayBuffer, 0, m->getSize());
  args.GetReturnValue().Set(float64Array);
}

void Addon::Memory::New(const v8::FunctionCallbackInfo <v8::Value> &args) {

}

void Addon::Memory::Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate) {

}