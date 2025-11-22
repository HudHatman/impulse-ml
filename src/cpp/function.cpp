#include <string>
#include <cstring>
#include <iostream>
#include <cstdio>
#include <vector>
#include <uv.h>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

#include "function.hpp"
#include "memory.hpp"
#include "native/native_function.hpp"

struct Work {
    uv_work_t request;
    v8::Persistent<v8::Promise::Resolver> resolver;
    std::vector<MEMORY> inputs;
    std::vector<MEMORY> outputs;
    FUNCTION_TYPE func;
};

void Addon::Function::Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate) {
}

v8::Local<v8::Object> Addon::Function::createInstance(v8::FunctionCallbackInfo <v8::Value> args, v8::Local<v8::String> name) {
  v8::Isolate * isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();

  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Function::New);
  tpl->SetClassName(v8::String::NewFromUtf8(isolate, "NativeFunction").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(2);

  v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();
  v8::Local<v8::Object> instance = constructor->NewInstance(context).ToLocalChecked();
  instance->Set(context, v8::String::NewFromUtf8(isolate, "name").ToLocalChecked(), args[0].As<v8::String>()).ToChecked();

  v8::Local<v8::FunctionTemplate> executeTemplate = v8::FunctionTemplate::New(isolate, Addon::Function::execute);
  v8::Local<v8::Function> executeFunction = executeTemplate->GetFunction(context).ToLocalChecked();
  instance->Set(context, v8::String::NewFromUtf8(isolate, "execute").ToLocalChecked(), executeFunction).ToChecked();

  return instance;
}

void Addon::Function::New(const v8::FunctionCallbackInfo <v8::Value> &args) {
  Native::Function *pfunction = new Native::Function();
  pfunction->wrap(args.This());
}

static void ExecuteAsync(uv_work_t* req) {
    Work* work = static_cast<Work*>(req->data);
    work->func(work->inputs.data(), work->outputs.data());
}

static void ExecuteAsyncComplete(uv_work_t* req, int status) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    v8::HandleScope scope(isolate);
    Work* work = static_cast<Work*>(req->data);

    v8::Local<v8::Promise::Resolver> resolver = work->resolver.Get(isolate);
    resolver->Resolve(isolate->GetCurrentContext(), v8::Undefined(isolate)).ToChecked();

    work->resolver.Reset();
    delete work;
}

void Addon::Function::execute(const v8::FunctionCallbackInfo <v8::Value> &args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::Object> instance = args.This();

  if (!args[0]->IsArray()) {
    isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "Argument 0 is not an array.", v8::NewStringType::kNormal).ToLocalChecked()));
    return;
  }
  if (!args[1]->IsArray()) {
    isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "Argument 1 is not an array.", v8::NewStringType::kNormal).ToLocalChecked()));
    return;
  }

  bool async = false;
  if (args.Length() > 2 && args[2]->IsBoolean()) {
      async = args[2]->BooleanValue(isolate);
  }

  v8::Local<v8::Array> inputArg = args[0].As<v8::Array>();
  v8::Local<v8::Array> outputArg = args[1].As<v8::Array>();

  std::vector<MEMORY> inputs;
  for (size_t i = 0; i < inputArg->Length(); i++) {
    v8::Local<v8::Value> element = inputArg->Get(isolate->GetCurrentContext(), i).ToLocalChecked();
    Native::Memory * mem = ObjectWrap::Unwrap<Native::Memory>(element.As<v8::Object>());

    MEMORY mem2;
    mem2.memory = mem->getPointer();
    mem2.rows = mem->getRows();
    mem2.cols = mem->getCols();
    mem2.depth = mem->getDepth();

    inputs.push_back(mem2);
  }
  std::vector<MEMORY> outputs;
  for (size_t i = 0; i < outputArg->Length(); i++) {
    v8::Local<v8::Value> element = outputArg->Get(isolate->GetCurrentContext(), i).ToLocalChecked();
    Native::Memory * mem = ObjectWrap::Unwrap<Native::Memory>(element.As<v8::Object>());

    MEMORY mem2;
    mem2.memory = mem->getPointer();
    mem2.rows = mem->getRows();
    mem2.cols = mem->getCols();
    mem2.depth = mem->getDepth();

    outputs.push_back(mem2);
  }
  Native::Function *fn = node::ObjectWrap::Unwrap<Native::Function>(instance);

  if (async) {
      v8::Local<v8::Promise::Resolver> resolver = v8::Promise::Resolver::New(context).ToLocalChecked();
      args.GetReturnValue().Set(resolver->GetPromise());

      Work* work = new Work();
      work->request.data = work;
      work->resolver.Reset(isolate, resolver);
      work->inputs = inputs;
      work->outputs = outputs;
      work->func = fn->getFunction();

      uv_queue_work(uv_default_loop(), &work->request, ExecuteAsync, ExecuteAsyncComplete);
  } else {
      fn->getFunction()(inputs.data(), outputs.data());
  }
}
