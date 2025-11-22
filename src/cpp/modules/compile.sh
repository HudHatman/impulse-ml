#!/bin/bash

g++ -c -fPIC -fopenmp -lpthread -I/usr/local/include algebra.cpp -I/usr/include/node -rdynamic -o algebra.o
g++ -shared -fopenmp -lpthread algebra.o -o algebra.so

g++ -c -fPIC -fopenmp -lpthread -I/usr/local/include matrix.cpp -I/usr/include/node -rdynamic -o matrix.o
g++ -shared -fopenmp -lpthread matrix.o -o matrix.so
