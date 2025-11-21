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

void algebra_backward_propagation(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> dZ(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> W(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    Eigen::Map<Eigen::MatrixXd> A_prev(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    double regularization = inputs[3].memory[0];
    double num_examples = inputs[4].memory[0];

    Eigen::Map<Eigen::MatrixXd> gW_map(inputs[5].memory, inputs[5].rows, inputs[5].cols);
    Eigen::Map<Eigen::MatrixXd> gb_map(inputs[6].memory, inputs[6].rows, inputs[6].cols);
    Eigen::Map<Eigen::MatrixXd> dA_prev_map(inputs[7].memory, inputs[7].rows, inputs[7].cols);

    Eigen::MatrixXd gW_temp = (1.0 / num_examples) * (dZ * A_prev.transpose()) + (regularization / num_examples) * W;
    Eigen::MatrixXd gb_temp = (1.0 / num_examples) * dZ.rowwise().sum();
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
/*

void algebra_img2col(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m1(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    int k_size = inputs[1].memory[0];
    int stride = inputs[2].memory[2];
    int padding = inputs[3].memory[0];
    Eigen::Map<Eigen::MatrixXd> result(inputs[4].memory, inputs[4].rows, inputs[4].cols);

    result = img2col_3d(m1, k_size, stride, padding);
}

Eigen::MatrixXd img2col_3d(const std::vector<Eigen::MatrixXd>& input_channels, int k_size, int stride, int padding) {

    if (input_channels.empty()) return Eigen::MatrixXd();

    int channels = input_channels.size();
    int in_rows = input_channels[0].rows();
    int in_cols = input_channels[0].cols();

    // 1. Obliczanie wymiarów wyjściowych (bazując na pierwszym kanale)
    int out_h = (in_rows + 2 * padding - k_size) / stride + 1;
    int out_w = (in_cols + 2 * padding - k_size) / stride + 1;

    // Rozmiar pojedynczego spłaszczonego patcha 2D
    int patch_area_2d = k_size * k_size;
    // Całkowita wysokość kolumny w macierzy wynikowej (C * K * K)
    int col_height = channels * patch_area_2d;
    // Całkowita liczba kolumn (okien)
    int total_patches = out_h * out_w;

    Eigen::MatrixXd result(col_height, total_patches);

    // 2. Przygotowanie kanałów z paddingiem
    // Robimy to wcześniej, aby nie robić if-ów w głównej pętli
    std::vector<Eigen::MatrixXd> padded_channels(channels);
    for (int c = 0; c < channels; ++c) {
        padded_channels[c].resize(in_rows + 2 * padding, in_cols + 2 * padding);
        padded_channels[c].setZero();
        padded_channels[c].block(padding, padding, in_rows, in_cols) = input_channels[c];
    }

    // 3. Główna pętla
    int col_idx = 0;
    for (int y = 0; y < out_h; ++y) {
        for (int x = 0; x < out_w; ++x) {

            // Dla każdego okna, iterujemy przez WSZYSTKIE kanały
            for (int c = 0; c < channels; ++c) {
                // Wycinamy patch z obecnego kanału
                Eigen::MatrixXd patch = padded_channels[c].block(y * stride, x * stride, k_size, k_size);

                // Obliczamy gdzie zapisać ten patch w kolumnie wynikowej
                // Przesunięcie (offset) zależy od numeru kanału
                int start_row = c * patch_area_2d;

                // Wpisujemy spłaszczony patch do odpowiedniego segmentu kolumny
                // .segment(start_index, length) działa na wektorach/kolumnach
                result.col(col_idx).segment(start_row, patch_area_2d) =
                    Eigen::Map<Eigen::VectorXd>(patch.data(), patch_area_2d);
            }

            col_idx++;
        }
    }

    return result;
}*/