#ifndef FUNCTION_HPP
#define FUNCTION_HPP

//#include <cuda.h>
#include <node_object_wrap.h>
#include "bindings.hpp"

namespace Addon {

  class Function : public node::ObjectWrap {
    public:
      static void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Context> context, v8::Isolate* isolate);

    protected:
      static v8::Local<v8::Object> createInstance(v8::FunctionCallbackInfo <v8::Value> args, v8::Local<v8::String> name);
      static void execute(const v8::FunctionCallbackInfo <v8::Value> &args);
      friend class Module;
      Function() : node::ObjectWrap() {}
      ~Function() {}

    private:
      static void New(const v8::FunctionCallbackInfo <v8::Value> &args);
  };

}

#endif
