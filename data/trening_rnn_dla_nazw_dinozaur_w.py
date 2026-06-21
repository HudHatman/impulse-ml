import numpy as np
import random
import os

# ==========================================
# 0. Przygotowanie środowiska i danych
# ==========================================
def ensure_dataset_exists(filename='dinos.txt'):
    """Tworzy przykładowy plik, jeśli użytkownik go nie posiada."""
    if not os.path.exists(filename):
        print(f"Brak pliku {filename}. Generuję próbkę (100 nazw)...")
        sample_names = [
            "Aardonyx\n", "Abelisaurus\n", "Albertosaurus\n", "Allosaurus\n", 
            "Ankylosaurus\n", "Apatosaurus\n", "Baryonyx\n", "Brachiosaurus\n", 
            "Carnotaurus\n", "Ceratosaurus\n", "Compsognathus\n", "Corythosaurus\n",
            "Deinonychus\n", "Dilophosaurus\n", "Diplodocus\n", "Edmontosaurus\n",
            "Euoplocephalus\n", "Gallimimus\n", "Giganotosaurus\n", "Iguanodon\n",
            "Megalosaurus\n", "Microraptor\n", "Pachycephalosaurus\n", "Parasaurolophus\n",
            "Protoceratops\n", "Pteranodon\n", "Spinosaurus\n", "Stegosaurus\n",
            "Triceratops\n", "Tyrannosaurus\n", "Velociraptor\n", "Utahraptor\n"
        ]
        # Kopiujemy próbki, aby symulować większy zbiór
        with open(filename, 'w') as f:
            for _ in range(50): 
                f.writelines(sample_names)

ensure_dataset_exists()

with open('dinos.txt', 'r') as f:
    examples = [line.lower() for line in f.readlines()]
    examples = [x.strip() + '\n' for x in examples if len(x.strip()) > 0]

# Tworzymy słownik
text_data = "".join(examples)
chars = sorted(list(set(text_data)))
vocab_size = len(chars)

char_to_ix = {ch: i for i, ch in enumerate(chars)}
ix_to_char = {i: ch for i, ch in enumerate(chars)}

print(f"Wczytano {len(examples)} nazw dinozaurów.")
print(f"Rozmiar słownika (vocab_size): {vocab_size} znaków.\n")

# ==========================================
# 1. Inicjalizacja parametrów
# ==========================================
hidden_size = 50
learning_rate = 0.01

W_ax = np.random.randn(hidden_size, vocab_size) * 0.01
W_aa = np.random.randn(hidden_size, hidden_size) * 0.01
W_ya = np.random.randn(vocab_size, hidden_size) * 0.01
b_a = np.zeros((hidden_size, 1))
b_y = np.zeros((vocab_size, 1))

# ==========================================
# 2. Funkcje pomocnicze i matematyczne
# ==========================================
def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=0)

def encode_one_hot(char_idx, vocab_size):
    vec = np.zeros((vocab_size, 1))
    vec[char_idx] = 1.0
    return vec

def forward_propagation(inputs_idx, a_prev):
    x_cache, a_cache, y_hat_cache = {}, {}, {}
    a_cache[-1] = np.copy(a_prev)
    loss = 0
    
    for t in range(len(inputs_idx)):
        # x to wektor one-hot dla ZNAKU WEJŚCIOWEGO
        x_cache[t] = encode_one_hot(inputs_idx[t], vocab_size)
        
        # Obliczenie stanu ukrytego a<t>
        z_a = np.dot(W_aa, a_cache[t-1]) + np.dot(W_ax, x_cache[t]) + b_a
        a_cache[t] = np.tanh(z_a)
        
        # Obliczenie predykcji y_hat<t>
        z_y = np.dot(W_ya, a_cache[t]) + b_y
        y_hat_cache[t] = softmax(z_y)
        
    return x_cache, a_cache, y_hat_cache

def backward_propagation(inputs_idx, targets_idx, x_cache, a_cache, y_hat_cache):
    dW_ax, dW_aa, dW_ya = np.zeros_like(W_ax), np.zeros_like(W_aa), np.zeros_like(W_ya)
    db_a, db_y = np.zeros_like(b_a), np.zeros_like(b_y)
    da_next = np.zeros_like(a_cache[0])
    loss = 0
    
    # Backpropagation Through Time (od końca sekwencji)
    for t in reversed(range(len(inputs_idx))):
        target_idx = targets_idx[t]
        
        # Obliczenie błędu wyjścia dy
        dy = np.copy(y_hat_cache[t])
        dy[target_idx] -= 1.0 # To jest matematycznie równe dy = y_hat - y (gdzie y to one-hot)
        
        # Akumulacja log loss (Cross-Entropy) - do monitorowania nauki
        loss += -np.log(y_hat_cache[t][target_idx, 0])
        
        # Gradienty wyjścia (pamiętamy o transpozycji a!)
        dW_ya += np.dot(dy, a_cache[t].T)
        db_y += dy
        
        # Backprop do stanu ukrytego da
        da = np.dot(W_ya.T, dy) + da_next
        
        # Przejście przez tanh: dz_a = da * (1 - a^2)
        dz_a = da * (1 - a_cache[t]**2)
        
        # Gradienty dla komórki rekurencyjnej (pamiętamy o transpozycjach!)
        dW_aa += np.dot(dz_a, a_cache[t-1].T)
        dW_ax += np.dot(dz_a, x_cache[t].T)
        db_a += dz_a
        
        # Przekazanie do poprzedniego kroku
        da_next = np.dot(W_aa.T, dz_a)

    # GRADIENT CLIPPING: Ochrona przed eksplodującym gradientem
    for dparam in [dW_ax, dW_aa, dW_ya, db_a, db_y]:
        np.clip(dparam, -5, 5, out=dparam)
        
    return loss, dW_ax, dW_aa, dW_ya, db_a, db_y

# ==========================================
# 3. Generator w trakcie nauki
# ==========================================
def sample(seed_idx):
    """Zaczynamy losowanie na podstawie znaku startowego (zwykle '\n')."""
    x = encode_one_hot(seed_idx, vocab_size)
    a = np.zeros((hidden_size, 1))
    
    indices = []
    counter = 0
    
    while counter < 30: # Limit długości
        a = np.tanh(np.dot(W_aa, a) + np.dot(W_ax, x) + b_a)
        y_hat = softmax(np.dot(W_ya, a) + b_y)
        
        # Losowanie kategoryczne
        idx = np.random.choice(list(range(vocab_size)), p=y_hat.ravel())
        
        if idx == char_to_ix['\n']:
            break
            
        indices.append(idx)
        x = encode_one_hot(idx, vocab_size)
        counter += 1
        
    name = ''.join([ix_to_char[i] for i in indices])
    return name.capitalize()

# ==========================================
# 4. GŁÓWNA PĘTLA UCZĄCA (TRAINING LOOP)
# ==========================================
epochs = 20 # Zwiększ tę liczbę dla lepszych efektów w pełnym pliku dinos.txt
iterations_per_epoch = len(examples)
total_iterations = epochs * iterations_per_epoch

print(f"Rozpoczynam trening... ({total_iterations} iteracji)")

# Wygładzony loss pomaga czytać wykres, bo pojedyncze słowa dają duży 'szum'
smooth_loss = -np.log(1.0 / vocab_size) * 10 

iteration = 0
for epoch in range(epochs):
    # Dobrą praktyką jest przetasowanie zbioru danych w każdej epoce
    random.shuffle(examples)
    
    for name in examples:
        # Przygotowanie Input / Target dla pojedynczego nazw
        # np. nazwa = "trex\n"
        # inputs = ['\n', 't', 'r', 'e', 'x']
        # targets= ['t', 'r', 'e', 'x', '\n']
        input_seq = ['\n'] + list(name[:-1])
        target_seq = list(name)
        
        inputs_idx = [char_to_ix[ch] for ch in input_seq]
        targets_idx = [char_to_ix[ch] for ch in target_seq]
        
        # Pamięć sieci na początku słowa zawsze jest zerowa
        a_prev = np.zeros((hidden_size, 1))
        
        # 1. Forward pass
        x_cache, a_cache, y_hat_cache = forward_propagation(inputs_idx, a_prev)
        
        # 2. Backward pass
        loss, dW_ax, dW_aa, dW_ya, db_a, db_y = backward_propagation(
            inputs_idx, targets_idx, x_cache, a_cache, y_hat_cache
        )
        
        # 3. Aktualizacja wag (SGD)
        W_ax -= learning_rate * dW_ax
        W_aa -= learning_rate * dW_aa
        W_ya -= learning_rate * dW_ya
        b_a -= learning_rate * db_a
        b_y -= learning_rate * db_y
        
        # Aktualizacja wygładzonego błędu (Exponential Moving Average)
        smooth_loss = smooth_loss * 0.999 + loss * 0.001
        
        # Logowanie i generowanie próbek co 2000 iteracji
        if iteration % 2000 == 0:
            print(f"\n--- Iteracja {iteration} | Błąd (Loss): {smooth_loss:.4f} ---")
            for _ in range(5):
                print(f"   > {sample(char_to_ix['\n'])}")
                
        iteration += 1

print("\n--- Trening zakończony! ---")