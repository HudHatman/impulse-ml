#include <string>
#include <cstring>
#include <iostream>
#include <cstdlib>

#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>

//#include <cuda.h>
//#include <cuda_runtime.h>

#include "native_memory.hpp"

size_t Native::Memory::getSize() {
    return this->_size;
}

Native::Memory * Native::Memory::setSize(size_t size) {
    this->_size = size;
    return this;
}

void Native::Memory::wrap(v8::Local<v8::Object> instance) {
    this->Wrap(instance);
}

void Native::Memory::cudaAlloc(size_t size) {
    /*cuerror = cuDeviceGet(&this->cudevice, this->_deviceId);
    if (cuerror != CUDA_SUCCESS) {
        std::cout << "cerr" << std::endl;
        return;
    }

    unsigned int flags = 0;
    cuerror = cuCtxCreate(&this->cucontext, flags, this->cudevice);
    if (cuerror != CUDA_SUCCESS) {
        std::cout << "cerr2" << std::endl;
        return;
    }

    cuerror = cuCtxSetCurrent(this->cucontext);
    if (cuerror != CUDA_SUCCESS) {
        std::cout << "cerr3" << std::endl;
        return;
    }

    cuerror = cuMemAlloc(&this->cudeviceptr, sizeof(double) * size);

    if (cuerror != CUDA_SUCCESS) {
        std::cout << "cerr4" << std::endl;
        return;
    }

    this->_alloc = true;*/
}

void Native::Memory::cudaSet(double * input, bool async) {
    /*CUresult error = cuCtxSetCurrent(this->cucontext);;

    if (error != CUDA_SUCCESS) {
        std::cout << "berr" << std::endl;
        return;
    }

    if (async) {
        error = cuMemcpyHtoDAsync(this->cudeviceptr, input, this->getSize() * sizeof(double), 0);
    } else {
        error = cuMemcpyHtoD(this->cudeviceptr, input, this->getSize() * sizeof(double));
    }

    if (error != CUDA_SUCCESS) {
        std::cout << "berr2" << std::endl;
        return;
    }*/
}

void Native::Memory::cudaFree() {
    /*CUresult error = cuCtxSetCurrent(this->cucontext);
    if (error != CUDA_SUCCESS) {
        return;
    }

    error = cuMemFree(this->cudeviceptr);

    if (error != CUDA_SUCCESS) {
        return;
    }

    this->cudeviceptr = 0;
    this->cucontext = 0;
    this->_alloc = false;
    this->setSize(0);*/
}

void Native::Memory::cudaGet(void * input, bool async) {
    /*CUresult error = cuCtxSetCurrent(this->cucontext);
    if (error != CUDA_SUCCESS) {
        std::cout << "err" << std::endl;
        return;
    }

    if (async) {
        error = cuMemcpyDtoHAsync(input, this->cudeviceptr, sizeof(double) * this->getSize(), 0);
    } else {
        error = cuMemcpyDtoH(input, this->cudeviceptr, sizeof(double) * this->getSize());
    }

    if (error != CUDA_SUCCESS) {
        std::cout << "err2" << std::endl;
    }*/
}

void Native::Memory::setIsGPU(bool value) {
    this->_isGPU = value;
}

void Native::Memory::copyFrom(Native::Memory * other) {
    if (this->_isCPU) {
        std::memcpy(static_cast<void *>(this->_RAMPointer), static_cast<void *>(other->getPointer()), other->getSize() * sizeof(double));
        this->_alloc = true;
        this->setRows(other->getRows());
        this->setCols(other->getCols());
        this->setDepth(other->getDepth());
    }
}

void Native::Memory::setIsCPU(bool value) {
    this->_isCPU = value;
}

void Native::Memory::alloc(size_t size) {
    if (this->_isGPU) {
        this->cudaAlloc(size);
    } else {
        this->ramAlloc(size);
    }
}

void Native::Memory::set(double * input, bool async) {
    if (this->_isGPU) {
        this->cudaSet(input, async);
    } else {
        this->ramSet(input, async);
    }
}

void Native::Memory::get(void * input, bool async) {
    if (this->_isGPU) {
        this->cudaGet(input, async);
    } else {
        this->ramGet(input, async);
    }
}

void Native::Memory::free() {
    if (this->_isGPU) {
        this->cudaFree();
    } else {
        this->ramFree();
    }
}

void Native::Memory::ramAlloc(size_t size) {
   this->_RAMPointer = static_cast<double *>(malloc(sizeof(double) * size));
   this->_alloc = true;
   this->_size = size;
}

void Native::Memory::ramSet(double * input, bool async) {
    std::memcpy(static_cast<void *>(this->_RAMPointer), static_cast<void *>(input), this->getSize() * sizeof(double));
}

void Native::Memory::ramFree() {
    if (this->_RAMPointer) {
        delete[] this->_RAMPointer;
        this->_RAMPointer = nullptr;
        this->_alloc = false;
        this->_size = 0;
    }
}

void Native::Memory::ramGet(void * input, bool async) {
    std::memcpy(input, static_cast<void*>(this->_RAMPointer), this->getSize() * sizeof(double));
}

Native::Memory * Native::Memory::clone() {
    Native::Memory * result = new Native::Memory(this->_deviceId);
    result->alloc(this->getSize());
    result->set(this->getPointer());
    result->setRows(this->getRows());
    result->setCols(this->getCols());
    result->setDepth(this->getDepth());
    return result;
}
/*CUdeviceptr * Native::Memory::getDevicePtr() {
    return &this->cudeviceptr;
}*/

