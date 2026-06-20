import numpy as np
from sklearn.datasets import fetch_openml
from sklearn.model_selection import train_test_split

class NeuralNetwork:
    def __init__(self):
        # Inicjalizacja wag (He initialization) dla lepszej zbieżności przy ReLU
        self.params = {
            'W1': np.random.randn(784, 128) * np.sqrt(2. / 784),
            'b1': np.zeros(128),
            'W2': np.random.randn(128, 64) * np.sqrt(2. / 128),
            'b2': np.zeros(64),
            'W3': np.random.randn(64, 10) * np.sqrt(2. / 64),
            'b3': np.zeros(10)
        }

        # Inicjalizacja stanu dla optymalizatora Adam
        self.m = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.v = {k: np.zeros_like(v) for k, v in self.params.items()}
        self.t = 0
        self.cache = {}

    def relu(self, Z):
        return np.maximum(0, Z)

    def relu_deriv(self, Z):
        return Z > 0

    def softmax(self, Z):
        # Odejmujemy maksimum w wierszu dla stabilności numerycznej (zapobiega NaN)
        expZ = np.exp(Z - np.max(Z, axis=1, keepdims=True))
        return expZ / np.sum(expZ, axis=1, keepdims=True)

    def forward(self, X):
        """Przednia propagacja (Forward Pass)"""
        self.cache['X'] = X

        # Warstwa 1: 128 neuronów, ReLU
        self.cache['Z1'] = X @ self.params['W1'] + self.params['b1']
        self.cache['A1'] = self.relu(self.cache['Z1'])

        # Warstwa 2: 64 neurony, ReLU
        self.cache['Z2'] = self.cache['A1'] @ self.params['W2'] + self.params['b2']
        self.cache['A2'] = self.relu(self.cache['Z2'])

        # Warstwa 3: 10 neuronów, Softmax
        self.cache['Z3'] = self.cache['A2'] @ self.params['W3'] + self.params['b3']
        self.cache['A3'] = self.softmax(self.cache['Z3'])

        return self.cache['A3']

    def compute_loss(self, A3, Y):
        """Błąd Cross Entropy"""
        m = Y.shape[0]
        # Dodajemy 1e-8, aby uniknąć log(0)
        log_probs = -np.log(A3[np.arange(m), np.argmax(Y, axis=1)] + 1e-8)
        return np.sum(log_probs) / m

    def backward(self, Y):
        """Wsteczna propagacja (Backward Pass)"""
        m = Y.shape[0]
        grads = {}

        # Gradient dla warstwy wyjściowej (Softmax + Cross Entropy upraszcza się do A3 - Y)
        dZ3 = self.cache['A3'] - Y
        grads['W3'] = (self.cache['A2'].T @ dZ3) / m
        grads['b3'] = np.sum(dZ3, axis=0) / m

        # Gradient dla 2. warstwy ukrytej
        dA2 = dZ3 @ self.params['W3'].T
        dZ2 = dA2 * self.relu_deriv(self.cache['Z2'])
        grads['W2'] = (self.cache['A1'].T @ dZ2) / m
        grads['b2'] = np.sum(dZ2, axis=0) / m

        # Gradient dla 1. warstwy ukrytej
        dA1 = dZ2 @ self.params['W2'].T
        dZ1 = dA1 * self.relu_deriv(self.cache['Z1'])
        grads['W1'] = (self.cache['X'].T @ dZ1) / m
        grads['b1'] = np.sum(dZ1, axis=0) / m

        return grads

    def update_params_adam(self, grads, lr=0.001, beta1=0.9, beta2=0.999, epsilon=1e-8):
        """Optymalizator Adam"""
        self.t += 1
        for key in self.params.keys():
            # Aktualizacja momentu pierwszego rzędu (średnia gradientów)
            self.m[key] = beta1 * self.m[key] + (1 - beta1) * grads[key]
            # Aktualizacja momentu drugiego rzędu (wariancja gradientów)
            self.v[key] = beta2 * self.v[key] + (1 - beta2) * (grads[key] ** 2)

            # Korekcja obciążenia (bias correction)
            m_hat = self.m[key] / (1 - beta1 ** self.t)
            v_hat = self.v[key] / (1 - beta2 ** self.t)

            # Aktualizacja wag i biasów
            self.params[key] -= lr * m_hat / (np.sqrt(v_hat) + epsilon)


def load_and_preprocess_mnist():
    print("Pobieranie datasetu MNIST (to może chwilę potrwać)...")
    mnist = fetch_openml('mnist_784', version=1, cache=True, parser='auto')

    # Normalizacja pikseli do przedziału [0, 1]
    X = mnist.data.values / 255.0
    y = mnist.target.values.astype(int)

    # One-hot encoding dla etykiet
    y_one_hot = np.zeros((y.size, 10))
    y_one_hot[np.arange(y.size), y] = 1

    return train_test_split(X, y_one_hot, test_size=0.2, random_state=42)

def main():
    X_train, X_test, y_train, y_test = load_and_preprocess_mnist()
    nn = NeuralNetwork()

    # Hiperparametry
    epochs = 15
    batch_size = 128
    learning_rate = 0.001
    n_samples = X_train.shape[0]

    print("\nRozpoczęcie treningu...")
    for epoch in range(epochs):
        # Tasowanie danych przed każdą epoką (Shuffle)
        permutation = np.random.permutation(n_samples)
        X_train_shuffled = X_train[permutation]
        y_train_shuffled = y_train[permutation]

        for i in range(0, n_samples, batch_size):
            X_batch = X_train_shuffled[i:i+batch_size]
            y_batch = y_train_shuffled[i:i+batch_size]

            # 1. Forward Pass
            nn.forward(X_batch)

            # 2. Backward Pass
            grads = nn.backward(y_batch)

            # 3. Aktualizacja wag (Adam)
            nn.update_params_adam(grads, lr=learning_rate)

        # Ewaluacja po każdej epoce
        train_preds = np.argmax(nn.forward(X_train), axis=1)
        train_labels = np.argmax(y_train, axis=1)
        train_acc = np.mean(train_preds == train_labels)

        test_preds = np.argmax(nn.forward(X_test), axis=1)
        test_labels = np.argmax(y_test, axis=1)
        test_acc = np.mean(test_preds == test_labels)

        # Obliczenie błędu na zbiorze testowym
        test_loss = nn.compute_loss(nn.forward(X_test), y_test)

        print(f"Epoka {epoch+1:02d}/{epochs} | Loss (Test): {test_loss:.4f} | "
              f"Dokładność Train: {train_acc*100:.2f}% | Dokładność Test: {test_acc*100:.2f}%")

if __name__ == "__main__":
    main()
