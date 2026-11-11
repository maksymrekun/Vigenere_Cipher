// aktualizuje pasek siły klucza gdy użytkownik coś wpisuje
document.getElementById('klucz').addEventListener('input', function() {
  var klucz = this.value;
  var dlugosc = klucz.length;
  var sila = '';
  var kolor = 'gray';
  var szerokosc = '0%';

  if (dlugosc === 0) {
    sila = '-';
    szerokosc = '0%';
    kolor = 'gray';
  } else if (dlugosc < 4) {
    sila = 'Słaby';
    szerokosc = '25%';
    kolor = 'red';
  } else if (dlugosc < 8) {
    sila = 'Średni';
    szerokosc = '55%';
    kolor = 'orange';
  } else {
    sila = 'Silny';
    szerokosc = '100%';
    kolor = 'green';
  }

  document.getElementById('info-klucz').textContent = 'Długość klucza: ' + dlugosc + ' | Siła: ' + sila;
  document.getElementById('wypelnienie').style.width = szerokosc;
  document.getElementById('wypelnienie').style.background = kolor;
});


// sprawdza czy pola są wypełnione przed wysłaniem
function walidacja() {
  var tekst = document.getElementById('tekst').value;
  var klucz = document.getElementById('klucz').value;

  if (tekst === '') {
    pokazBlad('Wpisz tekst!');
    return false;
  }
  if (klucz === '') {
    pokazBlad('Wpisz klucz!');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(klucz)) {
    pokazBlad('Klucz może zawierać tylko litery!');
    return false;
  }
  return true;
}


// wysyła dane do cipher.php i pokazuje wynik
function wyslij(tryb) {
  if (!walidacja()) return;

  var tekst = document.getElementById('tekst').value;
  var klucz = document.getElementById('klucz').value;

  var dane = new FormData();
  dane.append('text', tekst);
  dane.append('key', klucz);
  dane.append('mode', tryb);

  fetch('cipher.php', {
    method: 'POST',
    body: dane
  })
  .then(function(odpowiedz) {
    return odpowiedz.json();
  })
  .then(function(json) {
    if (json.error) {
      pokazBlad(json.error);
    } else {
      pokazWynik(json.result);
    }
  })
  .catch(function() {
    pokazBlad('Błąd połączenia. Sprawdź czy XAMPP działa.');
  });
}


function pokazWynik(tekst) {
  document.getElementById('blad').textContent = '';
  document.getElementById('wynik-tekst').textContent = tekst;
  document.getElementById('wynik-box').style.display = 'block';
}

function pokazBlad(wiadomosc) {
  document.getElementById('wynik-box').style.display = 'none';
  document.getElementById('blad').textContent = wiadomosc;
}

function wyczysc() {
  document.getElementById('tekst').value = '';
  document.getElementById('klucz').value = '';
  document.getElementById('info-klucz').textContent = 'Długość klucza: 0 | Siła: -';
  document.getElementById('wypelnienie').style.width = '0%';
  document.getElementById('wynik-box').style.display = 'none';
  document.getElementById('blad').textContent = '';
}

function kopiuj() {
  var wynik = document.getElementById('wynik-tekst').textContent;
  navigator.clipboard.writeText(wynik);
  alert('Skopiowano!');
}