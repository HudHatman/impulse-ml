#include "algebra.h"
#include <iostream>
#include <eigen3/Eigen/Core>
#include <eigen3/Eigen/Dense>
#include <functional>
#include <algorithm>
#include <cmath>
#include <cstddef>
#include <iomanip>
#include <iostream>
#include <limits>
#include <type_traits>
#include <omp.h>

#define EIGEN_USE_BLAS
#define EIGEN_USE_THREADS

void algebra_cross_entropy_loss(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> correctOutput(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> predictions(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    double epsilon = inputs[2].memory[0];

    double miniBatchSize = correctOutput.cols();

    // Term 1: Y * log(A)
    Eigen::MatrixXd logPredictions = (predictions.array().cwiseMax(epsilon)).log();
    Eigen::MatrixXd term1 = correctOutput.array() * logPredictions.array();

    // Term 2: (1 - Y) * log(1 - A)
    Eigen::MatrixXd oneMinusCorrectOutput = 1.0 - correctOutput.array();
    Eigen::MatrixXd oneMinusPredictions = 1.0 - predictions.array();
    Eigen::MatrixXd logOneMinusPredictions = (oneMinusPredictions.array().cwiseMax(epsilon)).log();
    Eigen::MatrixXd term2 = oneMinusCorrectOutput.array() * logOneMinusPredictions.array();

    double cost = (term1 + term2).sum();

    outputs[0].memory[0] = -cost / miniBatchSize;
}

void algebra_cross_entropy_derivative(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> correctOutput(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> predictions(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    double epsilon = inputs[2].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(outputs[0].memory, outputs[0].rows, outputs[0].cols);

    Eigen::MatrixXd term1 = correctOutput.array() / (predictions.array() + epsilon);
    Eigen::MatrixXd oneMinusY = 1.0 - correctOutput.array();
    Eigen::MatrixXd oneMinusA = 1.0 - predictions.array();
    Eigen::MatrixXd term2 = oneMinusY.array() / (oneMinusA.array() + epsilon);

    result = term2 - term1;
}

void algebra_backward_propagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> dZ(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> W(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> A_prev(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    double regularization = inputs[3].memory[0];
    double num_examples = inputs[4].memory[0];

    Eigen::Map<Eigen::MatrixXd> gW_map(inputs[5].memory, inputs[5].rows, inputs[5].cols);
    Eigen::Map<Eigen::MatrixXd> gb_map(inputs[6].memory, inputs[6].rows, inputs[6].cols);
    Eigen::Map<Eigen::MatrixXd> dA_prev_map(inputs[7].memory, inputs[7].rows, inputs[7].cols);

    Eigen::MatrixXd gW_temp = (1.0 / num_examples) * (dZ * A_prev.transpose()); // Changed calculation
    gW_temp += (regularization / num_examples) * W;
    Eigen::MatrixXd gb_temp = dZ.rowwise().sum() / num_examples;
    Eigen::MatrixXd dA_prev_temp = W.transpose() * dZ;

    gW_map = gW_temp;
    gb_map = gb_temp;
    dA_prev_map = dA_prev_temp;
}

void algebra_forward_propagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> w(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> x(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> b(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[3].memory, inputs[3].rows, inputs[3].cols);

    result = w * x;
    result.colwise() += b.col(0);
}

void algebra_pow(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    double number = inputs[1].memory[0];

    result = m.unaryExpr([&number](double x) {
    	return std::pow(x, number);
    });
}

void algebra_log(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m.unaryExpr([](double x) {
        return log(x);
    });
}

void algebra_minus_one(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m.unaryExpr([](double x) {
        return 1.0 - x;
    });
}

void algebra_softmax_derivative(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    // This is mathematically incorrect for backpropagation and should not be used.
    // However, to prevent crashes, we can return a matrix of ones.
    // The correct path is through CrossEntropyCost, which avoids this derivative.
    result = Eigen::MatrixXd::Ones(m.rows(), m.cols());
}

void algebra_multiply(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> m2(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.array() * m2.array();
}

void algebra_multiply_number(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> m2(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.array() * m2(0, 0);
}

void algebra_rowwise_sum(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m.rowwise().sum();
}

void algebra_subtract(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> m2(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.array() - m2.array();
}

void algebra_divide_number(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> num(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.array() / num(0, 0);
}

void algebra_divide_matrix(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> n(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.array() / n.array();
}

void algebra_sum(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double sum = m.sum();
	inputs[1].memory[0] = sum;
}

void algebra_reluBackpropagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    result = m.unaryExpr([](const double x) {
        if (x > 0.0) {
            return 1.0;
        }
        return 0.0;
    });
}

void algebra_leaky_relu(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double alpha = inputs[1].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.unaryExpr([&alpha](const double x) {
        return (x > 0.0) ? x : alpha * x;
    });
}

void algebra_leaky_reluBackpropagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double alpha = inputs[1].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m.unaryExpr([&alpha](const double x) {
        return (x > 0.0) ? 1.0 : alpha;
    });
}

void algebra_dot(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> a(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> b(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = a * b;
}

void algebra_replicate_matrix(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> w(inputs[0].memory, inputs[0].rows, inputs[0].cols);

    double num_rows = inputs[1].memory[0];
    double num_cols = inputs[2].memory[0];

    Eigen::Index result_rows = w.rows() * num_rows;
    Eigen::Index result_cols = w.cols() * num_cols;

    Eigen::Map<Eigen::MatrixXd> result(inputs[3].memory, result_rows, result_cols);

    result = w.replicate(num_rows, num_cols);
}

void algebra_add_matrix(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> m2(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m1.array() + m2.array();
}

void algebra_add_number(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double num = inputs[1].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m1.array() + num;
}

void algebra_logistic_forward_propagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m1.unaryExpr([](const double x) {
        return 1.0 / (1.0 + std::exp(-x));
    });
}

void algebra_max_coeff(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);

    int index;
    if (m1.rows() == 1) {
        m1.row(0).maxCoeff(&index);
    } else if (m1.cols() == 1) {
        m1.col(0).maxCoeff(&index);
    }

    inputs[1].memory[0] = static_cast<double>(index);
}

void algebra_min(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    inputs[1].memory[0] = static_cast<double>(m1.minCoeff());
}

void algebra_max(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    inputs[1].memory[0] = static_cast<double>(m1.maxCoeff());
}

void algebra_min_max(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    // The data is NOT transposed here. Features are in columns.
    for (int i = 0; i < m.cols(); ++i) {
        double min = m.col(i).minCoeff();
        double max = m.col(i).maxCoeff();
        double range = max - min;

        if (range > 1e-9) { // Avoid division by zero if a feature is constant
            result.col(i) = (m.col(i).array() - min) / range;
        } else {
            // If the feature is constant, just set it to 0 (or 0.5, doesn't matter much)
            result.col(i).setZero();
        }
    }
}

void algebra_logistic_backward_propagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> z(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = z.unaryExpr([](const double x) {
        const double a = 1.0 / (1.0 + std::exp(-x));
        return a * (1.0 - a);
    });
}

void algebra_conjugate(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m1.conjugate();
}

void algebra_tanh(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m1.array().tanh();
}
void algebra_tanh_derivative(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> z(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = z.unaryExpr([](const double x) {
        return 1.0 - std::tanh(x) * std::tanh(x);
    });
}

void algebra_sqrt(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    double epsilon = 1e-8;

    result = m1.unaryExpr([&epsilon](const double x) {
        return std::sqrt(x + epsilon);
    });
}
void algebra_log_minus_one(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    result = m1.unaryExpr([](const double x) {
        return log(1.0 - x);
    });
}

void algebra_softmax(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[1].memory, inputs[1].rows, inputs[1].cols);

    Eigen::MatrixXd stabilized = m.rowwise() - m.colwise().maxCoeff();
    result = stabilized.array().exp();
    Eigen::MatrixXd divider = result.colwise().sum().replicate(result.rows(), 1);
    result = result.array() / divider.array();
}

void algebra_fraction(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double num = inputs[1].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);

    result = m1.unaryExpr([&num](const double x) {
        return num / x;
    });
}

void algebra_adam_optimize(MEMORY * inputs, MEMORY * outputs) {
    // Inputs
    Eigen::Map<Eigen::MatrixXd> W(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> b(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> gW(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    Eigen::Map<Eigen::MatrixXd> gb(inputs[3].memory, inputs[3].rows, inputs[3].cols);
    Eigen::Map<Eigen::MatrixXd> vW(inputs[4].memory, inputs[4].rows, inputs[4].cols);
    Eigen::Map<Eigen::MatrixXd> vb(inputs[5].memory, inputs[5].rows, inputs[5].cols);
    Eigen::Map<Eigen::MatrixXd> sW(inputs[6].memory, inputs[6].rows, inputs[6].cols);
    Eigen::Map<Eigen::MatrixXd> sb(inputs[7].memory, inputs[7].rows, inputs[7].cols);

    double learningRate = inputs[8].memory[0];
    double beta1 = inputs[9].memory[0];
    double beta2 = inputs[10].memory[0];
    double epsilon = inputs[11].memory[0];
    double t = inputs[12].memory[0]; // iteration count

    // Outputs (updated in place)
    Eigen::Map<Eigen::MatrixXd> W_out(outputs[0].memory, outputs[0].rows, outputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> b_out(outputs[1].memory, outputs[1].rows, outputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> vW_out(outputs[2].memory, outputs[2].rows, outputs[2].cols);
    Eigen::Map<Eigen::MatrixXd> vb_out(outputs[3].memory, outputs[3].rows, outputs[3].cols);
    Eigen::Map<Eigen::MatrixXd> sW_out(outputs[4].memory, outputs[4].rows, outputs[4].cols);
    Eigen::Map<Eigen::MatrixXd> sb_out(outputs[5].memory, outputs[5].rows, outputs[5].cols);

    // v (momentum) update
    vW_out = vW.array() * beta1 + gW.array() * (1.0 - beta1);
    vb_out = vb.array() * beta1 + gb.array() * (1.0 - beta1);

    // s (RMSprop) update
    sW_out = sW.array() * beta2 + gW.array().pow(2) * (1.0 - beta2);
    sb_out = sb.array() * beta2 + gb.array().pow(2) * (1.0 - beta2);

    // Bias correction
    double beta1_pow_t = std::pow(beta1, t);
    double beta2_pow_t = std::pow(beta2, t);

    Eigen::MatrixXd vW_corrected = vW_out.array() / (1.0 - beta1_pow_t);
    Eigen::MatrixXd vb_corrected = vb_out.array() / (1.0 - beta1_pow_t);
    Eigen::MatrixXd sW_corrected = sW_out.array() / (1.0 - beta2_pow_t);
    Eigen::MatrixXd sb_corrected = sb_out.array() / (1.0 - beta2_pow_t);

    // Adam update step
    Eigen::MatrixXd W_update = vW_corrected.array() / (sW_corrected.array().sqrt() + epsilon) * learningRate;
    Eigen::MatrixXd b_update = vb_corrected.array() / (sb_corrected.array().sqrt() + epsilon) * learningRate;

    // Apply the Adam update
    W_out = W.array() - W_update.array();
    b_out = b.array() - b_update.array();
}
