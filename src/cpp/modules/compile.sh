#!/bin/bash

g++ -c -fPIC -fopenmp -lpthread -lgomp -I/usr/local/include algebra.cpp -I/usr/include/node -rdynamic -o algebra.o
g++ -shared -fopenmp -lpthread -lgomp algebra.o -o algebra.so

g++ -c -fPIC -fopenmp -lpthread -lgomp -I/usr/local/include matrix.cpp -I/usr/include/node -rdynamic -o matrix.o
g++ -shared -fopenmp -lpthread -lgomp matrix.o -o matrix.so
