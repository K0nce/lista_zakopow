// ========================================
// Lista Zakupów - jQuery DOM Manipulation
// Inspiracja: W3Schools jQuery Tutorial
// ========================================

$(document).ready(function() {
    
    // =============== SEKCJA 1: PODSTAWOWE OPERACJE ===============
    
    // === METODA 1: append() - Dodaj produkt na koniec listy ===
    $("#addProductBtn").click(function() {
        var productName = $("#productInput").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        
        // append() - dodaje nowy element na KONIEC listy
        $("#shoppingList").append("<li class='list-group-item'>" + productName + "</li>");
        
        // Czyść input
        $("#productInput").val("");
        
        // Odśwież licznik
        updateCount();
    });
    
    // Enter w input field
    $("#productInput").keypress(function(e) {
        if (e.which == 13) {
            $("#addProductBtn").click();
        }
    });
    
    
    // === METODA 2: remove() - Usuń ostatni element ===
    $("#removeLastBtn").click(function() {
        var lastItem = $("#shoppingList li:last");
        
        if (lastItem.length == 0) {
            alert("Lista jest pusta!");
            return;
        }
        
        // :last - selektor jQuery dla ostatniego elementu
        // remove() - usuwa element z DOM
        lastItem.fadeOut(400, function() {
            $(this).remove();
            updateCount();
        });
    });
    
    
    // === METODA 3: empty() - Wyczyść całą listę ===
    $("#clearListBtn").click(function() {
        var itemCount = $("#shoppingList li").length;
        
        if (itemCount == 0) {
            alert("Lista jest już pusta!");
            return;
        }
        
        if (confirm("Czy na pewno chcesz wyczyścić listę?")) {
            // empty() - usuwa ZAWARTOŚĆ, ale DIV pozostaje
            $("#shoppingList").fadeOut(400, function() {
                $(this).empty().fadeIn();
                updateCount();
            });
        }
    });
    
    
    // === METODA 4: html() - Przywróć listę domyślnymi elementami ===
    $("#restoreListBtn").click(function() {
        // Przykładowe elementy
        var items = '<li class="list-group-item">Mleko</li>' +
                    '<li class="list-group-item">Chleb</li>' +
                    '<li class="list-group-item">Masło</li>' +
                    '<li class="list-group-item">Jajka</li>' +
                    '<li class="list-group-item">Ser</li>';
        
        // html() - ustawia zawartość HTML
        $("#shoppingList").html(items);
        
        updateCount();
        alert("Lista została przywrócona!");
    });
    
    
    // =============== SEKCJA 2: MANIPULACJA TREŚCIĄ ===============
    
    // === METODA 5: prepend() - Dodaj na POCZĄTKU listy ===
    $("#addBeginningBtn").click(function() {
        var productName = $("#productInputPrepend").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        
        // prepend() - dodaje nowy element na POCZĄTEK listy
        // Różnica od append(): prepend() = START, append() = KONIEC
        $("#shoppingList").prepend("<li class='list-group-item'>" + productName + "</li>");
        
        $("#productInputPrepend").val("");
        updateCount();
    });
    
    $("#productInputPrepend").keypress(function(e) {
        if (e.which == 13) {
            $("#addBeginningBtn").click();
        }
    });
    
    
    // === METODA 6: append() - Dodaj na KOŃCU listy ===
    $("#addEndBtn").click(function() {
        var productName = $("#productInputAppend").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        
        // append() - dodaje nowy element na KONIEC listy
        $("#shoppingList").append("<li class='list-group-item'>" + productName + "</li>");
        
        $("#productInputAppend").val("");
        updateCount();
    });
    
    $("#productInputAppend").keypress(function(e) {
        if (e.which == 13) {
            $("#addEndBtn").click();
        }
    });
    
    
    // =============== SEKCJA 3: ATRYBUTY I KLASY ===============
    
    // === METODA 7: addClass() - Dodaj klasę CSS ===
    $("#colorEverySecondBtn").click(function() {
        // :even - selektor dla elementów parzystych (indeksy 0, 2, 4...)
        $("#shoppingList li:even").addClass("colored-even");
        
        alert("Pokolorowano co drugi element!");
    });
    
    
    // === METODA 8: removeClass() - Usuń klasę CSS ===
    $("#resetColorsBtn").click(function() {
        // removeClass() - usuwa określoną klasę
        $("#shoppingList li").removeClass("colored-even active");
        
        alert("Kolory zostały zresetowane!");
    });
    
    
    // === Klikanie na element - toggleClass() ===
    $(document).on("click", "#shoppingList li", function() {
        // toggleClass() - dodaje klasę jeśli jej nie ma, usuwa jeśli ma
        $(this).toggleClass("active");
        
        // Opcjonalnie: pokaż tekst elementu w alert
        var text = $(this).text();
        console.log("Wybrałeś: " + text);
    });
    
    
    // === Edycja inline - Podwójne kliknięcie ===
    $(document).on("dblclick", "#shoppingList li:not(.editing)", function() {
        var currentText = $(this).text();
        
        $(this).addClass("editing");
        
        // Zamień tekst na input
        $(this).html('<input type="text" class="edit-input" value="' + currentText + '">');
        
        $(this).find("input").focus().select();
    });
    
    
    // === Zatwierdzenie edycji - Enter ===
    $(document).on("keypress", "#shoppingList li input", function(e) {
        if (e.which == 13) {
            saveItemEdit($(this));
        }
    });
    
    
    // === Zatwierdzenie edycji - Utrata fokusa ===
    $(document).on("blur", "#shoppingList li input", function() {
        saveItemEdit($(this));
    });
    
    
    // Funkcja pomocnicza do zapisania edycji
    function saveItemEdit(inputElement) {
        var newText = inputElement.val();
        var listItem = inputElement.closest("li");
        
        if (newText == "") {
            newText = "(puste)";
        }
        
        // text() - ustawia tekstową zawartość (BEZ HTML)
        listItem.text(newText);
        listItem.removeClass("editing");
    }
    
    
    // =============== SEKCJA 4: ZAAWANSOWANE OPERACJE ===============
    
    // === METODA 9: Sortuj alfabetycznie A-Z ===
    $("#sortAlphaBtn").click(function() {
        // get() - konwertuje jQuery obiekt na tablicę JavaScript
        var items = $("#shoppingList li").get();
        
        // sort() - sortuje tablicę
        items.sort(function(a, b) {
            var textA = $(a).text().toUpperCase();
            var textB = $(b).text().toUpperCase();
            
            return textA.localeCompare(textB, "pl");
        });
        
        // Wstaw posortowane elementy
        $("#shoppingList").html(items);
        
        alert("Lista posortowana A-Z!");
    });
    
    
    // === METODA 10: Sortuj alfabetycznie Z-A ===
    $("#sortReverseBtn").click(function() {
        var items = $("#shoppingList li").get();
        
        items.sort(function(a, b) {
            var textA = $(a).text().toUpperCase();
            var textB = $(b).text().toUpperCase();
            
            // Odwrotny porządek
            return textB.localeCompare(textA, "pl");
        });
        
        $("#shoppingList").html(items);
        
        alert("Lista posortowana Z-A!");
    });
    
    
    // === METODA 11: Filtruj listę ===
    $("#filterInput").keyup(function() {
        var filterText = $(this).val().toUpperCase();
        
        // each() - iteruje po każdym elemencie
        $("#shoppingList li").each(function() {
            // text() - pobiera tekstową zawartość
            var itemText = $(this).text().toUpperCase();
            
            if (itemText.indexOf(filterText) > -1) {
                // show() - pokazuje element
                $(this).show(200);
            } else {
                // hide() - ukrywa element
                $(this).hide(200);
            }
        });
    });
    
    
    // === METODA 12: Resetuj filtr ===
    $("#resetFilterBtn").click(function() {
        $("#filterInput").val("");
        $("#shoppingList li").show();
    });
    
    
    // =============== DRAG & DROP (jQuery UI) ===============
    
    function enableDragDrop() {
        $("#shoppingList").sortable({
            items: "li",
            cursor: "move",
            opacity: 0.7,
            placeholder: "ui-sortable-placeholder"
        });
        
        $("#shoppingList").disableSelection();
    }
    
    enableDragDrop();
    
    
    // =============== HELPER FUNKCJE ===============
    
    // Aktualizuj licznik elementów
    function updateCount() {
        var count = $("#shoppingList li:visible").length;
        $("#itemCount").text(count);
    }
    
    // Initial count
    updateCount();
});


// ================================================================
// NOTATKA EDUKACYJNA: RÓŻNICE MIĘDZY METODAMI jQuery (W3Schools)
// ================================================================

/*

1. APPEND() VS PREPEND() - gdzie dodać element?
   ============================================
   
   append()   → dodaje element na KONIEC listy (ostatnie dziecko)
   prepend()  → dodaje element na POCZĄTEK listy (pierwsze dziecko)
   
   Przykład:
   <ul id="list">
       <!-- prepend() dodaje tutaj -->
       <li>Element 1</li>
       <li>Element 2</li>
       <!-- append() dodaje tutaj -->
   </ul>
   
   Kod:
   $("#list").prepend("<li>Nowy na początek</li>");
   $("#list").append("<li>Nowy na koniec</li>");


2. REMOVE() VS EMPTY() - usuwanie elementów
   ========================================
   
   remove()  → usuwa CAŁY element z DOM (razem z tagami)
   empty()   → usuwa ZAWARTOŚĆ elementu, ale sam element pozostaje
   
   Przykład:
   HTML: <div id="test"><p>Tekst</p></div>
   
   $(#test").remove();  // <div> znika całkowicie
   // Rezultat: nic
   
   $("#test").empty();  // <p> znika, ale <div> zostaje
   // Rezultat: <div id="test"></div>


3. TEXT() VS HTML() - zawartość tekstowa lub HTML
   ==============================================
   
   text()  → otrzymuje/ustawia TYLKO TEKST (tagi HTML ignoruje)
   html()  → otrzymuje/ustawia tekst z TAGAMI HTML
   
   Przykład:
   
   $(selector).text("<b>Bold</b>");
   // Wyświetli: "<b>Bold</b>" jako zwykły tekst
   
   $(selector).html("<b>Bold</b>");
   // Wyświetli: Bold (pogrubione)


4. INNE WAŻNE METODY
   ================
   
   addClass()      → dodaje klasę CSS: $("p").addClass("highlight");
   removeClass()   → usuwa klasę CSS: $("p").removeClass("highlight");
   toggleClass()   → przełącza klasę: $("p").toggleClass("highlight");
   
   val()          → pobiera wartość input: var x = $("#input").val();
   attr()         → pobiera atrybut: var href = $("a").attr("href");
   
   find()         → wyszukuje elementy wewnątrz: $("#list").find("li");
   each()         → iteruje po elementach: $("li").each(function() {...});
   
   show()/hide()  → pokazuje/ukrywa: $("p").show(); $("p").hide();
   fadeIn()/fadeOut() → animacje: $("p").fadeIn(); $("p").fadeOut();


5. SELEKTORY: :even, :odd, :first, :last
   ==================================
   
   $("#shoppingList li:even")   → każdy parzysty element
   $("#shoppingList li:odd")    → każdy nieparzysty element
   $("#shoppingList li:first")  → pierwszy element
   $("#shoppingList li:last")   → ostatni element


6. EVENT HANDLING
   ==============
   
   .click()     → kliknięcie
   .dblclick()  → podwójne kliknięcie
   .keypress()  → wciśnięcie klawisza
   .change()    → zmiana wartości
   .hover()     → najechanie myszą
   .on()        → uniwersalny nagłośnik
   
   Przykład:
   $("#btn").click(function() {
       alert("Kliknąłeś!");
   });


STYLE W3SCHOOLS:
- Prosta, czytelna struktura
- Komentarze dla każdej metody
- Podział na sekcje tematyczne
- alert() do wyświetlania informacji
- Podstawowe walidacje (if/else)
- Funkcje anonimowe w .click()
- Przejrzystość przed zaawansowaniem
- var zamiast const
- == zamiast ===
- Czysty, edukacyjny kod bez zbędnych funkcji

*/
