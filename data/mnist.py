import pandas as pd
import numpy as np
import os
import sys

def process_mnist_dataset(input_file_path, features_out_path='input.csv', labels_out_path='output.csv'):
    """
    Przetwarza zbiór danych MNIST z formatu CSV.

    Realizowane zadania:
    1. Wczytanie surowego pliku CSV.
    2. Separacja kolumny etykiet (label) od pikseli.
    3. Normalizacja pikseli (dzielenie przez 255).
    4. Kodowanie One-Hot etykiet.
    5. Zapis przetworzonych danych do osobnych plików CSV bez indeksów.

    Args:
        input_file_path (str): Ścieżka do pliku źródłowego (np. 'mnist_train.csv').
        features_out_path (str): Ścieżka wyjściowa dla cech (input.csv).
        labels_out_path (str): Ścieżka wyjściowa dla etykiet (output.csv).
    """

    print(f"--- Rozpoczynanie przetwarzania pliku: {input_file_path} ---")

    # KROK 1: Wczytywanie Danych
    # Używamy bloku try-except, aby obsłużyć brak pliku
    if not os.path.exists(input_file_path):
        print(f"BŁĄD KRYTYCZNY: Plik {input_file_path} nie istnieje.")
        return

    try:
        # Wczytanie danych. Zakładamy, że plik ma nagłówek.
        # Jeśli dane są "gołe", należałoby dodać parametr header=None.
        df = pd.read_csv(input_file_path)
        print(f"Sukces: Wczytano dane. Rozmiar ramki danych: {df.shape}")
    except Exception as e:
        print(f"BŁĄD podczas wczytywania CSV: {e}")
        return

    # KROK 2: Identyfikacja i Separacja Kolumn
    # Analiza źródeł [1, 3] wskazuje, że etykieta jest zazwyczaj pierwszą kolumną.
    # Alternatywnie można szukać kolumny o nazwie "label".

    label_col_name = 'label'

    # Sprawdzenie czy kolumna 'label' istnieje po nazwie, jeśli nie - używamy indeksu 0
    if label_col_name in df.columns:
        y_raw = df[label_col_name]
        # Usuwamy etykietę, reszta to piksele
        X_raw = df.drop(columns=[label_col_name])
    else:
        print("Ostrzeżenie: Kolumna 'label' nie znaleziona po nazwie. Zakładam, że pierwsza kolumna to etykieta.")
        y_raw = df.iloc[:, 0]
        X_raw = df.iloc[:, 1:]

    print(f"Separacja zakończona.")
    print(f" -> Wymiary macierzy cech (X): {X_raw.shape}")
    print(f" -> Wymiary wektora etykiet (y): {y_raw.shape}")

    # Weryfikacja czy dane pikseli są numeryczne (ochrona przed )
    # Jeśli kolumny zawierają nazwy plików, select_dtypes odfiltruje błędy.
    X_raw = X_raw.select_dtypes(include=[np.number])
    if X_raw.shape!= 784:
        print(f"UWAGA: Liczba kolumn numerycznych ({X_raw.shape}) jest inna niż oczekiwane 784 dla MNIST.")

    # KROK 3: Normalizacja (Normalization)
    # Skalowanie  ->
    # Używamy dzielenia zmiennoprzecinkowego.
    print("Rozpoczynam normalizację pikseli (dzielenie przez 255.0)...")

    # Opcjonalnie: Rzutowanie na float32 dla oszczędności pamięci (zgodnie z )
    X_normalized = (X_raw / 255.0).astype('float32')

    # Weryfikacja zakresu
    max_val = X_normalized.max().max()
    min_val = X_normalized.min().min()
    print(f"Normalizacja zakończona. Zakres wartości: [{min_val}, {max_val}]")

    # KROK 4: One-Hot Encoding
    # Konwersja cyfr 0-9 na wektory binarne.
    print("Rozpoczynam kodowanie One-Hot etykiet...")

    # dtype=int jest kluczowe, aby uzyskać 0 i 1 zamiast True/False
    y_one_hot = pd.get_dummies(y_raw, prefix='label', dtype=int)

    print(f"Kodowanie zakończone. Nowy kształt etykiet: {y_one_hot.shape}")
    # Podgląd nazw kolumn (np. label_0, label_1...)
    print(f"Wygenerowane kolumny etykiet: {y_one_hot.columns.tolist()}")

    # KROK 5: Zapis do Plików (Serialization)
    # index=False jest absolutnie kluczowe

    print(f"Zapisywanie cech do pliku: {X_raw}...")
    X_normalized.to_csv(X_raw, index=False, float_format='%.4f')
    # float_format='%.4f' ogranicza precyzję zapisu do 4 miejsc po przecinku,
    # co zmniejsza rozmiar pliku tekstowego, nie tracąc istotnej informacji dla MNIST.

    print(f"Zapisywanie etykiet do pliku: {labels_out_path}...")
    y_one_hot.to_csv(labels_out_path, index=False)

    print("--- PROCES ZAKOŃCZONY SUKCESEM ---")
    print(f"Wygenerowano pliki gotowe do treningu sieci neuronowej.")

# Sekcja uruchomieniowa
if __name__ == "__main__":
    # Dla celów demonstracyjnych, jeśli użytkownik nie ma pliku, tworzymy atrapę
    source_file = 'mnist_train.csv'

    if not os.path.exists(source_file):
        print("INFO: Nie znaleziono pliku 'mnist_train.csv'. Generowanie danych testowych...")
        # Generujemy mały dataset: 100 wierszy, 785 kolumn
        data_dummy = np.random.randint(0, 255, (100, 785))
        # Pierwsza kolumna to etykiety 0-9
        data_dummy[:, 0] = np.random.randint(0, 10, 100)
        columns = ['label'] + [f'pixel{i}' for i in range(784)]

        df_dummy = pd.DataFrame(data_dummy, columns=columns)
        df_dummy.to_csv(source_file, index=False)
        print(f"Utworzono plik testowy: {source_file}")

    # Uruchomienie głównej funkcji
    process_mnist_dataset(source_file)
