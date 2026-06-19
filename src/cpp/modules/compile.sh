#!/bin/bash

g++ -c -fPIC -O3 -march=native -ffast-math -fopenmp -lpthread -lgomp -I/usr/local/include algebra.cpp -I/usr/include/node -rdynamic -o algebra.o
g++ -shared -O3 -fopenmp -lpthread -lgomp algebra.o -o algebra.so

g++ -c -fPIC -O3 -march=native -ffast-math -fopenmp -lpthread -lgomp -I/usr/local/include matrix.cpp -I/usr/include/node -rdynamic -o matrix.o
g++ -shared -O3 -fopenmp -lpthread -lgomp matrix.o -o matrix.so
