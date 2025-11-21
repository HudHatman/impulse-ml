import pandas as pd
from sklearn.datasets import load_iris
import os

def modyfikuj_i_zapisz_iris_ohe():
    """
    Funkcja ładuje zbiór Iris, dokonuje jego separacji.
    Dane wejściowe (features) pozostają numeryczne.
    Dane wyjściowe (target) są transformowane metodą One-Hot Encoding.
    Oba zbiory są zapisywane do CSV bez indeksów.
    """

    # KROK 1: Ingestia Danych
    print("Rozpoczynanie procesu przetwarzania danych Iris...")
    iris_bunch = load_iris()

    # KROK 2: Transformacja do DataFrame (Cechy - Input)
    # Tworzymy macierz cech (150 wierszy x 4 kolumny)
    df_input = pd.DataFrame(
        data=iris_bunch.data,
        columns=iris_bunch.feature_names
    )

    # KROK 3: Transformacja do DataFrame (Target - Output) z One-Hot Encoding
    # Zamiast kodowania 0,1,2, chcemy uzyskać macierz binarną.

    # Najpierw mapujemy numery klas (0,1,2) na ich nazwy (setosa, etc.)
    # Ułatwi to nazwanie kolumn w wynikowym pliku.
    target_names_mapped = [iris_bunch.target_names[i] for i in iris_bunch.target]

    # Tworzymy tymczasowy DataFrame
    df_target_temp = pd.DataFrame(target_names_mapped, columns=['species'])

    # Aplikujemy One-Hot Encoding za pomocą pd.get_dummies
    # dtype=int wymusza użycie 0 i 1 zamiast True/False (lepsza kompatybilność CSV)
    df_output = pd.get_dummies(df_target_temp['species'], prefix='species', dtype=int)

    # KROK 4: Zapis do plików
    input_filename = 'iris_input.csv'
    output_filename = 'iris_output.csv'

    try:
        # Zapis cech
        df_input.to_csv(input_filename, index=False)
        print(f" Zapisano plik wejściowy: {input_filename}")
        print(f"         Wymiary: {df_input.shape} (150 wierszy, 4 cechy)")

        # Zapis targetu (OHE)
        df_output.to_csv(output_filename, index=False)
        print(f" Zapisano plik wyjściowy: {output_filename} (z One-Hot Encoding)")
        print(f"         Wymiary: {df_output.shape} (150 wierszy, 3 klasy)")
        print(f"         Kolumny: {list(df_output.columns)}")

    except IOError as e:
        print(f" Nie udało się zapisać plików. Sprawdź uprawnienia. Szczegóły: {e}")

    # KROK 5: Weryfikacja spójności
    print("\n--- Raport Weryfikacyjny ---")
    check_in = pd.read_csv(input_filename)
    check_out = pd.read_csv(output_filename)

    # Podgląd pierwszych 2 wierszy outputu, aby pokazać efekt OHE
    print("Przykładowe dane wyjściowe (OHE):")
    print(check_out.head(2))

    assert len(check_in) == len(check_out) == 150, "Błąd: Niezgodność liczby wierszy!"
    # Sprawdzenie czy mamy 3 kolumny w output (dla 3 gatunków)
    assert check_out.shape[1] == 3, "Błąd: Output nie ma oczekiwanych 3 kolumn OHE!"
    print("Status weryfikacji: POZYTYWNY")

if __name__ == "__main__":
    modyfikuj_i_zapisz_iris_ohe()
