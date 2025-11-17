#pragma once

#include <string>
#include <cstring>
#include <iostream>
#include <dlfcn.h>
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>
#include "native_module.hpp"
#include "native_memory.hpp"
#include "../memory.hpp"
//#include <cuda.h>
//#include <cuda_runtime.h>
typedef void (*FUNCTION_TYPE)(MEMORY * inputs, MEMORY * outputs);

namespace Native {
    class Function : public node::ObjectWrap {
    public:
        Function() : node::ObjectWrap(), _module(0), _function(0) {}
        ~Function() {}
        void wrap(v8::Local<v8::Object> instance);
        FUNCTION_TYPE getFunction() { return this->_function; }
        static Native::Function * createInstance(Native::Module * m, const char * functionName);
    protected:
    private:
        char _name[64];
        Native::Module * _module;
        FUNCTION_TYPE _function;
    };

}
