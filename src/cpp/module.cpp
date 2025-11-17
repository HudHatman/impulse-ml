#include <string>
#include <cstring>
#include <iostream>
#include <cstdio>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>
//#include <node_buffer.h>

#include "module.hpp"
#include "function.hpp"
#include "native/native_module.hpp"
#include "native/native_function.hpp"

typedef void (*fn)();

void Addon::Module::Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate) {
    v8::Local<v8::Object> obj = v8::Object::New(isolate);

    v8::Local<v8::FunctionTemplate> loadTemplate = v8::FunctionTemplate::New(isolate, Addon::Module::load);
    v8::Local<v8::Function> loadFunction = loadTemplate->GetFunction(context).ToLocalChecked();

    v8::Local<v8::FunctionTemplate> getFunctionTemplate = v8::FunctionTemplate::New(isolate, Addon::Module::getFunction);
    v8::Local<v8::Function> getFunction = getFunctionTemplate->GetFunction(context).ToLocalChecked();

    obj->Set(context, v8::String::NewFromUtf8(isolate, "load").ToLocalChecked(), loadFunction).ToChecked();
    obj->Set(context, v8::String::NewFromUtf8(isolate, "getFunction").ToLocalChecked(), getFunction).ToChecked();

    exports->Set(context, v8::String::NewFromUtf8(isolate, "Module").ToLocalChecked(), obj).FromJust();
}

void Addon::Module::New(const v8::FunctionCallbackInfo <v8::Value> &args) {
    v8::Isolate * isolate = args.GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();
    v8::Local<v8::Object> instance = args.This();

    Native::Module *m = new Native::Module();
    m->wrap(args.This());
}

void Addon::Module::getFunction(const v8::FunctionCallbackInfo <v8::Value> &args) {
    v8::Isolate * isolate = args.GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();

    Native::Module *m = node::ObjectWrap::Unwrap<Native::Module>(args.This());

    v8::String::Utf8Value utf8_value(isolate, args[0].As<v8::String>());
    const char* functionName = *utf8_value;
    //fn _fn = (fn)dlsym(m->getHandle(), functionName);
    //CUfunction m_function;

    //CUresult error = cuModuleGetFunction(&m_function, m->getCudaModule(), functionName);

    //if (error == CUDA_SUCCESS) {
        v8::Local<v8::Object> instance = Addon::Function::createInstance(args, args[0].As<v8::String>());

        Native::Function *fn = Native::Function::createInstance(m, functionName);
        fn->wrap(instance);

        args.GetReturnValue().Set(instance);
    //} else {
    //    isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cuModuleGetFunction error.").ToLocalChecked()));
    //}
    //*/
}

void Addon::Module::load(const v8::FunctionCallbackInfo <v8::Value> &args) {
    v8::Isolate * isolate = args.GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();

    v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(isolate, Addon::Module::New);
    tpl->SetClassName(v8::String::NewFromUtf8(isolate, "NativeModule").ToLocalChecked());
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    v8::Local<v8::FunctionTemplate> getFunctionTemplate = v8::FunctionTemplate::New(isolate, Addon::Module::getFunction);
    v8::Local<v8::Function> getFunction = getFunctionTemplate->GetFunction(context).ToLocalChecked();

    v8::Local<v8::Function> constructor = tpl->GetFunction(context).ToLocalChecked();

    v8::Local<v8::Object> instance = constructor->NewInstance(context).ToLocalChecked();
    instance->Set(context, v8::String::NewFromUtf8(isolate, "name").ToLocalChecked(), args[1].As<v8::String>()).ToChecked();
    instance->Set(context, v8::String::NewFromUtf8(isolate, "getFunction").ToLocalChecked(), getFunction).ToChecked();

    Native::Module *m = ObjectWrap::Unwrap<Native::Module>(instance);

    int deviceId = (int) args[0].As<v8::Number>()->IntegerValue(context).ToChecked();
    v8::String::Utf8Value utf8_value(isolate, args[1].As<v8::String>());
    const char* moduleName = *utf8_value;
    m->load(deviceId, moduleName);

    args.GetReturnValue().Set(instance);
}
