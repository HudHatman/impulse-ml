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

namespace Native {
    class Module : public node::ObjectWrap {
    public:
        Module() : node::ObjectWrap(), _handle(0)/*, _cumodule(0)*/ {}
        ~Module() {}
        void wrap(v8::Local<v8::Object> instance);
        //CUmodule getCudaModule();
        Native::Module * load(int deviceId, const char * moduleName);
        void * getHandle() { return this->_handle; };
    protected:
    private:
        //CUmodule _cumodule;
        char name[32];
        char path[1024];
        void * _handle;
    };
}
