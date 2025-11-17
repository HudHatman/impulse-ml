#ifndef MODULE_HPP
#define MODULE_HPP

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

namespace Addon {

  class Module : public node::ObjectWrap {
    public:
      static void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate);
      static void getFunction(const v8::FunctionCallbackInfo <v8::Value> &args);

    protected:
      static void load(const v8::FunctionCallbackInfo <v8::Value> &args);

    private:
      static void New(const v8::FunctionCallbackInfo <v8::Value> &args);
  };

}

#endif
