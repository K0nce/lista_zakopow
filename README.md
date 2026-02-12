# 📝 Lista Zakupów - Projekt jQuery DOM Manipulation

> Interaktywna aplikacja webowa demonstrująca zaawansowane metody manipulacji DOM za pomocą biblioteki jQuery.

## 🎯 Funkcjonalność aplikacji

### Sekcja 1: Podstawowe operacje
- ✅ **Dodaj produkt** - Wpisz nazwę produktu i dodaj do listy (Button + Input)
- ✅ **Usuń ostatni produkt** - Usuwa ostatni element z listy
- ✅ **Wyczyść listę** - Usuwa wszystkie elementy
- ✅ **Przywróć listę** - Wstawia domyślne elementy z animacją

### Sekcja 2: Manipulacja treścią i strukturą
- ✅ **Dodaj na początku** - Wstawia produkt na początek listy
- ✅ **Dodaj na końcu** - Wstawia produkt na koniec listy

### Sekcja 3: Atrybuty i klasy
- ✅ **Edycja inline** - Kliknij 2x na element, aby go edytować
  - Wciśnij **Enter** aby zatwierdzić zmiany
  - Animacja: fadeOut → zmiana → fadeIn
- ✅ **Wyróżnianie (active)** - Kliknij 1x na element aby go wyróżnić
- ✅ **Pokoloruj co drugi element** - Stosuje kolory do parzystych elementów
- ✅ **Resetuj kolory** - Usuwa wszystkie efekty koloryzacji

### Sekcja 4: Zaawansowane operacje
- ✅ **Drag & Drop** - Przeciąg elementy aby zmienić kolejność (jQuery UI sortable)
- ✅ **Sortuj alfabetycznie (A-Z)** - Sortuje listę rosnąco
- ✅ **Sortuj odwrotnie (Z-A)** - Sortuje listę malejąco
- ✅ **Filtruj** - Pokazuje tylko elementy pasujące do wpisanej frazy
- ✅ **Licznik elementów** - Automatycznie aktualizuje się

## 🛠️ Użyte metody jQuery

### Manipulacja zawartością
| Metoda | Opis | Przykład |
|--------|------|---------|
| **append()** | Dodaje element na koniec | `$ul.append($li)` |
| **prepend()** | Dodaje element na początek | `$ul.prepend($li)` |
| **html()** | Pobiera/ustawia HTML zawartość | `$elem.html('<b>tekst</b>')` |
| **text()** | Pobiera/ustawia tekstową zawartość | `$elem.text('tekst')` |
| **remove()** | Usuwa element z DOM | `$li.remove()` |
| **empty()** | Usuwa zawartość elementu | `$ul.empty()` |

### Zarządzanie klasami
| Metoda | Opis |
|--------|------|
| **addClass()** | Dodaje klasę CSS |
| **removeClass()** | Usuwa klasę CSS |
| **toggleClass()** | Przełącza klasę CSS |
| **hasClass()** | Sprawdza czy element ma klasę |

### Wyszukiwanie elementów
| Metoda | Opis |
|--------|------|
| **find()** | Wyszukuje elementy wewnątrz |
| **filter()** | Filtruje elementy |
| **each()** | Iteruje po każdym elemencie |
| **closest()** | Szuka najbliższego elementu rodzica |
| **get()** | Konwertuje jQuery obiekt na tablicę |

### Event handling
| Metoda | Opis |
|--------|------|
| **on()** | Dodaje event listener |
| **keypress** | Event wciśnięcia klawisza |
| **click** | Event kliknięcia |
| **dblclick** | Event podwójnego kliknięcia |

### Efekty i animacje
| Metoda | Opis |
|--------|------|
| **show()** | Pokazuje element |
| **hide()** | Ukrywa element |
| **addClass('fade-in')** | Animacja wejścia |
| **addClass('fade-out')** | Animacja wyjścia |

### jQuery UI
| Metoda | Opis |
|--------|------|
| **sortable()** | Włącza drag & drop na liście |
| **disableSelection()** | Wyłącza zaznaczanie tekstu |

## 📂 Struktura projektu

```
lista-zakupow/
├── index.html          # Główny plik HTML
├── style.css          # Styles CSS (Bootstrap + Custom)
├── script.js          # Logika jQuery i DOM manipulation
├── README.md          # Ten plik
└── .git/              # Repozytorium Git
```

## 📚 Notatka porównawcza: Różnice między metodami jQuery

### 1. **append() vs prepend()**
```javascript
// append() - dodaje na KONIEC
<ul>
    <li>Element 1</li>
    <li>Nowy element tutaj ← append()</li>
</ul>

// prepend() - dodaje na POCZĄTEK
<ul>
    <li>Nowy element tutaj ← prepend()</li>
    <li>Element 1</li>
</ul>
```

### 2. **remove() vs empty()**
```javascript
// remove() - usuwa ELEMENT
$('li').remove();  // Usuwa <li>element</li>

// empty() - usuwa ZAWARTOŚĆ
$('ul').empty();   // <ul></ul> pozostaje, ale jest pusta
```

### 3. **text() vs html()**
```javascript
// text() - traktuje wszystko jako tekst
$('p').text('<b>Bold</b>');  // Wyświetli: "<b>Bold</b>"

// html() - interpretuje tagi HTML
$('p').html('<b>Bold</b>');  // Wyświetli: Bold (pogrubione)
```

## 🎨 Technologie użyte

- **HTML5** - Struktura strony
- **CSS3** - Styling (Bootstrap 5 + Custom CSS)
- **JavaScript (ES6+)** - Logika aplikacji
- **jQuery 3.6.0** - Manipulacja DOM
- **jQuery UI 1.14.0** - Drag & Drop (sortable)
- **Bootstrap 5.3** - Framework CSS

## 🌟 Cechy aplikacji

- ✨ Responsywny design (mobile-friendly)
- 🎬 Animacje CSS (fadeIn, fadeOut, pulse)
- ⌨️ Obsługa klawiatury (Enter do zatwierdzenia)
- 🔄 Drag & Drop dla zmiany kolejności
- 🔍 Filtrowanie w real-time
- 📱 Touch-friendly interfejs
- 🎯 Intuicyjny UI

## 💡 Przykłady kodu

### Dodanie elementu
```javascript
function addProduct() {
    const productName = $('#productInput').val().trim();
    const $newItem = $('<li></li>')
        .addClass('list-group-item')
        .text(productName);
    
    $('#shoppingList').append($newItem);  // jQuery append()
}
```

### Edycja elementu
```javascript
function editItem($item) {
    const currentText = $item.text();  // jQuery text()
    $item.html(`<input type="text" value="${currentText}">`);  // jQuery html()
}
```

### Sortowanie
```javascript
function sortAlphabetically() {
    const items = $('#shoppingList').find('li')  // jQuery find()
        .get()                                      // konwersja na tablicę
        .sort((a, b) => $(a).text().localeCompare($(b).text()));
    
    $('#shoppingList').empty();                    // jQuery empty()
    items.forEach(item => $('#shoppingList').append(item));
}
```

## 🐛 Debugging

Aby włączyć tryb debug, otórz DevTools (F12) i zapoznaj się z konsolą JavaScript.

## 📝 Licencja

MIT License - Wolne do użytku w projektach edukacyjnych i komercyjnych.

## 👨‍💻 Autor

Lista zakupów - Projekt edukacyjny jQuery DOM Manipulation

## 🤝 Wkład

Jeśli chciałbyś dodać nowe funkcje lub naprawić błędy, stwórz pull request!

## ❓ FAQ

**P: Jak mogę dodać własne produkty?**  
O: Po prostu wpisz nazwę w input i kliknij "Dodaj produkt" lub wciśnij Enter.

**P: Czy mogę edytować elementy?**  
O: Tak! Kliknij dwukrotnie na element, umotaj tekst w input polu, potem wciśnij Enter.

**P: Jak włączyć drag & drop?**  
O: Drag & drop jest automatycznie włączony. Po prostu przeciąg element do nowej pozycji.

**P: Czy dane są zapisywane?**  
O: Nie, ta wersja przechowuje dane tylko w pamięci. Aby dodać localStorage, zapoznaj się z dokumentacją jQuery.

## 📞 Kontakt

Email: kontakt@example.com

---

**Stwórz swoją grę zakupów! 🛒**
