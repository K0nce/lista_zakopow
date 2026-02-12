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
- **JavaScript** - Logika aplikacji (**W3Schools style**: var, ==, alert(), prosty kod edukacyjny)
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

### 1. Dodanie elementu (append)
```javascript
$("#addProductBtn").click(function() {
    var productName = $("#productInput").val();
    
    if (productName == "") {
        alert("Proszę wpisać nazwę produktu!");
        return;
    }
    
    // append() - dodaje nowy element na KONIEC listy
    $("#shoppingList").append("<li class='list-group-item'>" + productName + "</li>");
    
    $("#productInput").val("");
});
```

### 2. Edycja elementu (html + text)
```javascript
$(document).on("dblclick", "#shoppingList li", function() {
    var currentText = $(this).text();  // text() - pobiera tekst
    
    // html() - wstawia HTML (input jest HTML)
    $(this).html('<input type="text" value="' + currentText + '">');
    $(this).find("input").focus();
});
```

### 3. Sortowanie (get + sort)
```javascript
$("#sortAlphaBtn").click(function() {
    // get() - konwertuje jQuery obiekt na tablicę JavaScript
    var items = $("#shoppingList li").get();
    
    items.sort(function(a, b) {
        var textA = $(a).text().toUpperCase();
        var textB = $(b).text().toUpperCase();
        return textA.localeCompare(textB, "pl");
    });
    
    // Wstaw posortowane elementy
    $("#shoppingList").html(items);
    alert("Lista posortowana A-Z!");
});
```
