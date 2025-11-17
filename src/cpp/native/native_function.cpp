#include <string>
#include <cstring>
#include <iostream>
#include <dlfcn.h>
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "native_function.hpp"

void Native::Function::wrap(v8::Local<v8::Object> instance) {
    this->Wrap(instance);
}

Native::Function * Native::Function::createInstance(Native::Module * module, const char *functionName) {
    Native::Function * result = new Native::Function();
    result->_module = module;
    result->_function = reinterpret_cast<FUNCTION_TYPE>(dlsym(module->getHandle(), functionName));
    strcpy(result->_name, functionName);
    return result;
}
