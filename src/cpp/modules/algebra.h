#ifndef ALGEBRA_H
#define ALGEBRA_H

#include "../native/native_memory.hpp"
#include "../memory_struct.h"

//void Eigen::MatrixXd img2col_3d(const std::vector<Eigen::MatrixXd>& input_channels, int k_size, int stride, int padding);

extern "C" {
    void algebra_pow(MEMORY * inputs, MEMORY * outputs);
    void algebra_sum(MEMORY * inputs, MEMORY * outputs);
    void algebra_reluBackpropagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_dot(MEMORY * inputs, MEMORY * outputs);
    void algebra_replicate_matrix(MEMORY * inputs, MEMORY * outputs);
    void algebra_add_matrix(MEMORY * inputs, MEMORY * outputs);
    void algebra_add_number(MEMORY * inputs, MEMORY * outputs);
    void algebra_logistic_forward_propagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_logistic_backward_propagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_log(MEMORY * inputs, MEMORY * outputs);
    void algebra_multiply(MEMORY * inputs, MEMORY * outputs);
    void algebra_multiply_number(MEMORY * inputs, MEMORY * outputs);
    void algebra_subtract(MEMORY * inputs, MEMORY * outputs);
    void algebra_minus_one(MEMORY * inputs, MEMORY * outputs);
    void algebra_max_coeff(MEMORY * inputs, MEMORY * outputs);
    void algebra_conjugate(MEMORY * inputs, MEMORY * outputs);
    void algebra_divide_number(MEMORY * inputs, MEMORY * outputs);
    void algebra_divide_matrix(MEMORY * inputs, MEMORY * outputs);
    void algebra_rowwise_sum(MEMORY * inputs, MEMORY * outputs);
    void algebra_softmax(MEMORY * inputs, MEMORY * outputs);
    void algebra_fraction(MEMORY * inputs, MEMORY * outputs);
    void algebra_tanh(MEMORY * inputs, MEMORY * outputs);
    void algebra_tanh_derivative(MEMORY * inputs, MEMORY * outputs);
    void algebra_log_minus_one(MEMORY * inputs, MEMORY * outputs);
    void algebra_sqrt(MEMORY * inputs, MEMORY * outputs);
    void algebra_softmax_derivative(MEMORY * inputs, MEMORY * outputs);
    void algebra_min(MEMORY * inputs, MEMORY * outputs);
    void algebra_max(MEMORY * inputs, MEMORY * outputs);
    void algebra_min_max(MEMORY * inputs, MEMORY * outputs);
    void algebra_forward_propagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_backward_propagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_leaky_relu(MEMORY * inputs, MEMORY * outputs);
    void algebra_leaky_reluBackpropagation(MEMORY * inputs, MEMORY * outputs);
    void algebra_adam_optimize(MEMORY * inputs, MEMORY * outputs);
    void algebra_cross_entropy_loss(MEMORY * inputs, MEMORY * outputs);
    void algebra_cross_entropy_derivative(MEMORY * inputs, MEMORY * outputs);
    //void algebra_img2col(MEMORY * inputs, MEMORY * outputs);
}

#endif
