#ifndef MATRIX_H
#define MATRIX_H

#include "../native/native_memory.hpp"
#include "../memory_struct.h"

extern "C" {
    void matrix_row(MEMORY * inputs, MEMORY * outputs);
    void matrix_col(MEMORY * inputs, MEMORY * outputs);
    void matrix_transpose(MEMORY * inputs, MEMORY * outputs);
    void matrix_set_zeros(MEMORY * inputs, MEMORY * outputs);
    void matrix_set_random(MEMORY * inputs, MEMORY * outputs);
    void matrix_set_max(MEMORY * inputs, MEMORY * outputs);
    void matrix_set_min(MEMORY * inputs, MEMORY * outputs);
    void matrix_block(MEMORY * inputs, MEMORY * outputs);
}

#endif
