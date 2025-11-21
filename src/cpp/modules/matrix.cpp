#include "matrix.h"
#include <iostream>
#include <eigen3/Eigen/Core>
#include <eigen3/Eigen/Dense>
#include <functional>
#include <string>
#include <vector>
#include <iostream>
#include <ctime>
#include <chrono>
#include <cmath>
#include <fstream>
#include <utility>

#include <omp.h>

#define EIGEN_USE_BLAS
#define EIGEN_USE_THREADS

void matrix_row(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> rowValue(inputs[1].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> res(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    res = m.row(rowValue(0, 0));
}

void matrix_col(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> colValue(inputs[1].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> res(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    res = m.col(colValue(0, 0));
}

void matrix_transpose(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> m2(inputs[1].memory, inputs[1].rows, inputs[1].cols);
    m2 = m.transpose();
}

void matrix_set_zeros(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    m.setZero();
}

void matrix_set_random(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    double parameter = inputs[1].memory[0];
    m.setRandom();
    m = m.unaryExpr([parameter](double x) {
        return x * parameter;
    });
}

void matrix_set_max(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    double nb = inputs[1].memory[0];
    result = m.unaryExpr([nb](double x) {
        return std::max(x, nb);
    });
}

void matrix_set_min(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> parameter(inputs[1].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> result(inputs[2].memory, inputs[2].rows, inputs[2].cols);
    double nb = parameter(0, 0);
    result = result = m.unaryExpr([nb](double x) {
        return std::min(x, nb);
    });
}

void matrix_block(MEMORY * inputs, MEMORY * outputs) {
    Eigen::Map<Eigen::MatrixXd> m(inputs[0].memory, inputs[0].rows, inputs[0].cols);
    Eigen::Map<Eigen::MatrixXd> rowOffset(inputs[1].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> colOffset(inputs[2].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> numRows(inputs[3].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> numCols(inputs[4].memory, 1, 1);
    Eigen::Map<Eigen::MatrixXd> result(inputs[5].memory, inputs[5].rows, inputs[5].cols);
    result = m.block(rowOffset(0, 0), colOffset(0, 0), numRows(0, 0), numCols(0, 0));
}