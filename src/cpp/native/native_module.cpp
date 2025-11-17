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

#include "native_module.hpp"

std::string modulePath;

void Native::Module::wrap(v8::Local<v8::Object> instance) {
    this->Wrap(instance);
}


//CUmodule Native::Module::getCudaModule() {
//    return _cumodule;
//}

Native::Module * Native::Module::load(int deviceId, const char * moduleName) {
    char path[1024];
    int n = snprintf(path, sizeof(path), "%s/src/cpp/modules/%s.so", modulePath.c_str(), moduleName);

    if (n >= sizeof(path)) {
        // Handle error: path was truncated
        std::cerr << "Path to module is too long." << std::endl;
        return nullptr;
    }


    strcpy(this->path, path);
    strcpy(this->name, moduleName);

    this->_handle = dlopen(this->path, RTLD_LAZY);
    if (!this->_handle) {
        std::cout << dlerror() << std::endl;
    }

    //cudaSetDevice(deviceId);

    //CUresult error = cuModuleLoad(&this->_cumodule, path);

    //if (error != CUDA_SUCCESS) {
    //    std::cout << "cuModuleLoad error." << std::endl;
    //}
    
    return this;
}
