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

  class Memory : public node::ObjectWrap {
    public:
        Memory(int deviceId) : node::ObjectWrap() {
            this->_deviceId = deviceId;
            this->_size = 0;
        };
        ~Memory() override {
            if (this->_alloc) {
                this->free();
            }
        };

        size_t getSize();
        //CUdeviceptr * getDevicePtr();
        Native::Memory * setSize(size_t size);
        void wrap(v8::Local<v8::Object> instance);
        void setIsGPU(bool value);
        void setIsCPU(bool value);

        void alloc(size_t size);
        void set(double * input, bool async = false);
        void get(void * input, bool async = false);
        void free();
        Native::Memory * clone();

        void setRows(int rows) { this->_rows = rows; };
        void setCols(int cols) { this->_cols = cols; };
        void setDepth(int depth) { this->_depth = depth; };

        int getRows() { return this->_rows; };
        int getCols() { return this->_cols; };
        int getDepth() { return this->_depth; };

        double * getPointer() { return this->_RAMPointer; };

        void copyFrom(Native::Memory * other);

    protected:
            size_t _size;
            int _deviceId;
            //CUdevice cudevice;
            //CUcontext cucontext;
            //CUresult cuerror;
            //CUdeviceptr cudeviceptr;
            bool _alloc = false;
            bool _isGPU = false;
            bool _isCPU = false;
            double * _RAMPointer;
            int _rows = 0;
            int _cols = 0;
            int _depth = 0;

            void cudaAlloc(size_t size);
            void cudaSet(double * input, bool async = false);
            void cudaFree();
            void cudaGet(void * input, bool async = false);

            void ramAlloc(size_t size);
            void ramSet(double * input, bool async = false);
            void ramFree();
            void ramGet(void * input, bool async = false);
  };
}
