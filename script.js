$(document).ready(function() {
    
    // ============================================================
    // SEKCJA 1: PODSTAWOWE OPERACJE
    // - Dodawanie produktów na koniec listy (append)
    // - Obsługa Enter w input field
    // ============================================================
    
    $("#addProductBtn").click(function() {
        var productName = $("#productInput").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        $("#shoppingList").append("<li class='list-group-item'>" + productName + "</li>");
        $("#productInput").val("");
        updateCount();
    });
    $("#productInput").keypress(function(e) {
        if (e.which == 13) {
            $("#addProductBtn").click();
        }
    });
    
    // ============================================================
    // SEKCJA 2: USUWANIE ELEMENTÓW
    // - Usuwanie ostatniego produktu (remove, :last selector)
    // - Animacja fadeOut
    // ============================================================
    
    $("#removeLastBtn").click(function() {
        var lastItem = $("#shoppingList li:last");
        
        if (lastItem.length == 0) {
            alert("Lista jest pusta!");
            return;
        }
        lastItem.fadeOut(400, function() {
            $(this).remove();
            updateCount();
        });
    });
    
    // ============================================================
    // SEKCJA 3: CZYSZCZENIE LISTY
    // - Usuwanie całej zawartości (empty)
    // - Potwierdzenie działania (confirm)
    // ============================================================
    
    $("#clearListBtn").click(function() {
        var itemCount = $("#shoppingList li").length;
        
        if (itemCount == 0) {
            alert("Lista jest już pusta!");
            return;
        }
        
        if (confirm("Czy na pewno chcesz wyczyścić listę?")) {
            $("#shoppingList").fadeOut(400, function() {
                $(this).empty().fadeIn();
                updateCount();
            });
        }
    });
    
    // ============================================================
    // SEKCJA 4: PRZYWRACANIE LISTY
    // - Wstawianie HTML zawartości (html)
    // - Domyślne elementy
    // ============================================================
    
    $("#restoreListBtn").click(function() {
        var items = '<li class="list-group-item">Mleko</li>' +
                    '<li class="list-group-item">Chleb</li>' +
                    '<li class="list-group-item">Masło</li>' +
                    '<li class="list-group-item">Jajka</li>' +
                    '<li class="list-group-item">Ser</li>';
        $("#shoppingList").html(items);
        
        updateCount();
        alert("Lista została przywrócona!");
    });
    
    // ============================================================
    // SEKCJA 5: DODAWANIE NA POCZĄTKU
    // - prepend() - dodanie na początek
    // - Obsługa Enter w input
    // ============================================================
    
    $("#addBeginningBtn").click(function() {
        var productName = $("#productInputPrepend").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        $("#shoppingList").prepend("<li class='list-group-item'>" + productName + "</li>");
        
        $("#productInputPrepend").val("");
        updateCount();
    });
    
    $("#productInputPrepend").keypress(function(e) {
        if (e.which == 13) {
            $("#addBeginningBtn").click();
        }
    });
    
    // ============================================================
    // SEKCJA 6: DODAWANIE NA KOŃCU
    // - append() - dodanie na koniec
    // - Obsługa Enter w input
    // ============================================================
    
    $("#addEndBtn").click(function() {
        var productName = $("#productInputAppend").val();
        
        if (productName == "") {
            alert("Proszę wpisać nazwę produktu!");
            return;
        }
        $("#shoppingList").append("<li class='list-group-item'>" + productName + "</li>");
        
        $("#productInputAppend").val("");
        updateCount();
    });
    
    $("#productInputAppend").keypress(function(e) {
        if (e.which == 13) {
            $("#addEndBtn").click();
        }
    });
    
    // ============================================================
    // SEKCJA 7: KOLOROWANIE ELEMENTÓW
    // - addClass() - dodawanie klasy CSS
    // - :even selector - co drugi element
    // ============================================================
    
    $("#colorizeBtn").click(function() {
        $("#shoppingList li:even").addClass("colored-even");
        
        alert("Pokolorowano co drugi element!");
    });
    
    // ============================================================
    // SEKCJA 8: RESETOWANIE KOLORÓW I ZAZNACZANIE
    // - removeClass() - usuwanie klasy CSS
    // - toggleClass() - przełączanie klasy
    // - click event na li
    // ============================================================
    
    $("#resetColorsBtn").click(function() {
        $("#shoppingList li").removeClass("colored-even active");
        
        alert("Kolory zostały zresetowane!");
    });
    $(document).on("click", "#shoppingList li", function() {
        $(this).toggleClass("active");
        var text = $(this).text();
        console.log("Wybrałeś: " + text);
    });
    
    // ============================================================
    // SEKCJA 9: EDYCJA INLINE - PODWÓJNE KLIKNIĘCIE
    // - dblclick event
    // - html() - zastępowanie zawartości
    // - addClass(), find()
    // ============================================================
    
    $(document).on("dblclick", "#shoppingList li:not(.editing)", function() {
        var currentText = $(this).text();
        
        $(this).addClass("editing");
        $(this).html('<input type="text" class="edit-input" value="' + currentText + '">');
        $(this).find("input").focus().select();
    });
    
    // ============================================================
    // SEKCJA 10: ZATWIERDZANIE EDYCJI
    // - keypress event (Enter)
    // - blur event (utrata fokusa)
    // - text() - ustawianie tekstu
    // - closest() - znajdowanie elementu rodzica
    // ============================================================
    
    $(document).on("keypress", "#shoppingList li input", function(e) {
        if (e.which == 13) {
            saveItemEdit($(this));
        }
    });
    $(document).on("blur", "#shoppingList li input", function() {
        saveItemEdit($(this));
    });
    
    // ============================================================
    // FUNKCJA POMOCNICZA: saveItemEdit()
    // - val() - pobieranie wartości input
    // - text() - ustawianie tekstu
    // - removeClass() - usuwanie klasy
    // ============================================================
    
    function saveItemEdit(inputElement) {
        var newText = inputElement.val();
        var listItem = inputElement.closest("li");
        
        if (newText == "") {
            newText = "(puste)";
        }
        listItem.text(newText);
        listItem.removeClass("editing");
    }
    
    // ============================================================
    // SEKCJA 11: SORTOWANIE A-Z
    // - get() - konwersja jQuery na tablicę
    // - sort() - sortowanie tablicy
    // - localeCompare() - porównanie tekstów
    // - html() - wstawianie posortowanych elementów
    // ============================================================
    
    $("#sortAlphaBtn").click(function() {
        var items = $("#shoppingList li").get();
        items.sort(function(a, b) {
            var textA = $(a).text().toUpperCase();
            var textB = $(b).text().toUpperCase();
            
            return textA.localeCompare(textB, "pl");
        });
        $("#shoppingList").html(items);
        
        alert("Lista posortowana A-Z!");
    });
    
    // ============================================================
    // SEKCJA 12: SORTOWANIE Z-A
    // - get() - konwersja jQuery na tablicę
    // - sort() - sortowanie (odwrotne)
    // - html() - wstawianie posortowanych elementów
    // ============================================================
    
    $("#sortReverseBtn").click(function() {
        var items = $("#shoppingList li").get();
        
        items.sort(function(a, b) {
            var textA = $(a).text().toUpperCase();
            var textB = $(b).text().toUpperCase();
            return textB.localeCompare(textA, "pl");
        });
        
        $("#shoppingList").html(items);
        
        alert("Lista posortowana Z-A!");
    });
    
    // ============================================================
    // SEKCJA 13: FILTROWANIE LISTY
    // - keyup event - obsługa wpisywania
    // - each() - iteracja po każdym elemencie
    // - indexOf() - szukanie podciągu
    // - show()/hide() - pokazywanie/ukrywanie
    // ============================================================
    
    $("#filterInput").keyup(function() {
        var filterText = $(this).val().toUpperCase();
        $("#shoppingList li").each(function() {
            var itemText = $(this).text().toUpperCase();  
            if (itemText.indexOf(filterText) > -1) {
                $(this).show(200);
            } else {
                $(this).hide(200);
            }
        });
    });
    
    // ============================================================
    // SEKCJA 14: RESETOWANIE FILTRA
    // - val() - czyszczenie input
    // - show() - pokazanie wszystkich elementów
    // ============================================================
    
    $("#resetFilterBtn").click(function() {
        $("#filterInput").val("");
        $("#shoppingList li").show();
    });
    
    // ============================================================
    // SEKCJA 15: DRAG & DROP
    // - sortable() - jQuery UI metoda do przeciągania
    // - disableSelection() - wyłączenie zaznaczania tekstu
    // ============================================================
    
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
    
    // ============================================================
    // SEKCJA 16: LICZNIK ELEMENTÓW
    // - find() - wyszukiwanie elementów
    // - length - zliczanie elementów
    // - text() - ustawianie liczby
    // ============================================================
    
    function updateCount() {
        var count = $("#shoppingList li:visible").length;
        $("#itemCount").text(count);
    }
    updateCount();
});
