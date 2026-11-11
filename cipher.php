<?php
header('Content-Type: application/json');


// link do localhost http://localhost/vigenere/index.html

// pobieramy dane z formularza
$tekst = $_POST['text'];
$klucz = strtolower($_POST['key']);
$tryb  = $_POST['mode'];

// sprawdzamy czy wszystko jest wypełnione
if ($tekst == '' || $klucz == '' || $tryb == '') {
    echo json_encode(['error' => 'Brakuje danych.']);
    exit;
}

// główna funkcja szyfru Vigenere
function szyfruj_vigenere($tekst, $klucz, $tryb) {
    $wynik = '';
    $dlugosc_klucza = strlen($klucz);
    $i_klucz = 0; // osobny licznik dla klucza

    for ($i = 0; $i < strlen($tekst); $i++) {
        $znak = $tekst[$i];

        // szyfrujemy tylko litery, resztę zostawiamy bez zmian
        if (ctype_alpha($znak)) {
            $wielka_litera = ctype_upper($znak);

            // zamieniamy literę na liczbę: a=0, b=1, ... z=25
            $nr_znaku = ord(strtolower($znak)) - ord('a');
            $nr_klucza = ord($klucz[$i_klucz % $dlugosc_klucza]) - ord('a');

            if ($tryb == 'encrypt') {
                $nowy_nr = ($nr_znaku + $nr_klucza) % 26;
            } else {
                $nowy_nr = ($nr_znaku - $nr_klucza + 26) % 26;
            }

            // zamieniamy liczbę z powrotem na literę
            $nowy_znak = chr($nowy_nr + ord('a'));

            // zachowujemy wielką literę jeśli była
            if ($wielka_litera) {
                $nowy_znak = strtoupper($nowy_znak);
            }

            $wynik .= $nowy_znak;
            $i_klucz++;

        } else {
            // spacja, przecinek itp. - kopiujemy bez zmian
            $wynik .= $znak;
        }
    }

    return $wynik;
}

$rezultat = szyfruj_vigenere($tekst, $klucz, $tryb);
echo json_encode(['result' => $rezultat]);
?>