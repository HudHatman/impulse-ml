#include <cstdio>
#include <cuda.h>

extern "C" {
  __global__ void testFunction(double *input, double *output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
      atomicAdd(&output[0], input[idx]);
    }
  }
}
