/**
 * Lista Zakupów - jQuery DOM Manipulation
 * Demonstracja zaawansowanych metod jQuery do manipulacji DOM
 */

$(document).ready(function() {
    // ==================== Zmienne globalne ====================
    const $shoppingList = $('#shoppingList');
    const $productInput = $('#productInput');
    const $prependInput = $('#productInputPrepend');
    const $appendInput = $('#productInputAppend');
    const $filterInput = $('#filterInput');
    const itemCountSelector = '#itemCount';

    // Domyślna lista do przywrócenia
    const defaultItems = ['Mleko', 'Chleb', 'Masło', 'Ser', 'Jajka'];

    // ==================== Inicjalizacja ====================
    initializeApp();

    function initializeApp() {
        // Włącz sortowanie drag & drop
        enableDragDrop();
        
        // Dodaj event listenery
        attachEventListeners();
        
        // Uaktualnij licznik
        updateItemCount();
    }

    // ==================== Event Listenery ====================
    function attachEventListeners() {
        // Sekcja 1: Podstawowe operacje
        $('#addProductBtn').on('click', addProduct);
        $productInput.on('keypress', function(e) {
            if (e.which === 13) addProduct();
        });
        
        $('#removeLastBtn').on('click', removeLastProduct);
        $('#clearListBtn').on('click', clearList);
        $('#restoreListBtn').on('click', restoreList);

        // Sekcja 2: Manipulacja treścią
        $('#addBeginningBtn').on('click', addAtBeginning);
        $prependInput.on('keypress', function(e) {
            if (e.which === 13) addAtBeginning();
        });
        
        $('#addEndBtn').on('click', addAtEnd);
        $appendInput.on('keypress', function(e) {
            if (e.which === 13) addAtEnd();
        });

        // Sekcja 3: Atrybuty i klasy
        $('#colorEverySecondBtn').on('click', colorEverySecond);
        $('#resetColorsBtn').on('click', resetColors);

        // Sekcja 4: Zaawansowane
        $('#sortAlphaBtn').on('click', sortAlphabetically);
        $('#sortReverseBtn').on('click', sortReverse);
        $('#resetFilterBtn').on('click', resetFilter);
        
        $filterInput.on('keyup', function() {
            filterList($(this).val());
        });

        // Dynamiczne zdarzenia na liście
        $(document).on('click', '#shoppingList li', function(e) {
            if (e.target.tagName === 'INPUT') return;
            
            // Jeśli element jest już w edycji, zapisz
            if ($(this).hasClass('editing')) {
                saveEdit($(this));
            } else {
                // Przełącz klasę active
                $(this).toggleClass('active').siblings('li').removeClass('active');
            }
        });

        $(document).on('dblclick', '#shoppingList li:not(.editing)', function(e) {
            if (e.target.tagName === 'INPUT') return;
            editItem($(this));
        });

        $(document).on('keypress', '#shoppingList li input', function(e) {
            if (e.which === 13) {
                saveEdit($(this).closest('li'));
            }
        });

        $(document).on('blur', '#shoppingList li input', function() {
            saveEdit($(this).closest('li'));
        });
    }

    // ==================== Funkcje - Sekcja 1: Podstawowe ====================
    
    /**
     * append() - Dodaje element na koniec listy
     * text() - Ustawia tekstową treść elementu
     * addClass() - Dodaje klasę CSS do elementu
     */
    function addProduct() {
        const productName = $productInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        const $newItem = $('<li></li>')
            .addClass('list-group-item')
            .text(productName)
            .addClass('fade-in');

        $shoppingList.append($newItem);
        
        // Animacja pulse
        $newItem.addClass('pulse-item');
        setTimeout(() => $newItem.removeClass('pulse-item'), 600);

        $productInput.val('').focus();
        updateItemCount();
    }

    /**
     * :last - Selektor jQuery dla ostatniego elementu
     * remove() - Usuwa element z DOM
     */
    function removeLastProduct() {
        const $lastItem = $shoppingList.find('li:last');
        
        if ($lastItem.length === 0) {
            alert('Lista jest pusta!');
            return;
        }

        $lastItem.addClass('fade-out');
        setTimeout(() => {
            $lastItem.remove();
            updateItemCount();
        }, 400);
    }

    /**
     * empty() - Usuwa całą zawartość elementu (te WSZYSTKIE elementy)
     * Różnica: empty() usuwa zawartość, remove() usuwa sam element
     */
    function clearList() {
        if ($shoppingList.find('li').length === 0) {
            alert('Lista jest już pusta!');
            return;
        }

        if (confirm('Czy na pewno chcesz wyczyścić listę?')) {
            $shoppingList.find('li').addClass('fade-out');
            setTimeout(() => {
                $shoppingList.empty();
                updateItemCount();
            }, 400);
        }
    }

    /**
     * html() - Wstawia HTML zawartość (mogą być tagi)
     * find() - Szuka elementów wewnątrz wybranego elementu
     */
    function restoreList() {
        $shoppingList.empty();
        
        defaultItems.forEach((item, index) => {
            setTimeout(() => {
                const $item = $('<li></li>')
                    .addClass('list-group-item fade-in')
                    .text(item);
                $shoppingList.append($item);
            }, index * 150);
        });

        setTimeout(() => {
            updateItemCount();
            enableDragDrop();
        }, defaultItems.length * 150);
    }

    // ==================== Funkcje - Sekcja 2: Manipulacja treścią ====================
    
    /**
     * prepend() - Dodaje element na POCZĄTEK
     * append() - Dodaje element na KONIEC
     * Różnica: prepend() umieszcza jako pierwszy dziecko, append() jako ostatnie
     */
    function addAtBeginning() {
        const productName = $prependInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        const $newItem = $('<li></li>')
            .addClass('list-group-item fade-in')
            .text(productName);

        $shoppingList.prepend($newItem);
        
        $newItem.addClass('pulse-item');
        setTimeout(() => $newItem.removeClass('pulse-item'), 600);

        $prependInput.val('').focus();
        updateItemCount();
    }

    function addAtEnd() {
        const productName = $appendInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        const $newItem = $('<li></li>')
            .addClass('list-group-item fade-in')
            .text(productName);

        $shoppingList.append($newItem);
        
        $newItem.addClass('pulse-item');
        setTimeout(() => $newItem.removeClass('pulse-item'), 600);

        $appendInput.val('').focus();
        updateItemCount();
    }

    // ==================== Funkcje - Sekcja 3: Atrybuty i klasy ====================
    
    /**
     * :even - Selektor jQuery dla elementów z parzystymi indeksami (0-based)
     * css() - Zmienia style CSS elementu
     * addClass() - Dodaje klasę CSS
     */
    function colorEverySecond() {
        $shoppingList.find('li').each(function(index) {
            if (index % 2 === 1) { // co drugi element (indeks 1, 3, 5...)
                $(this).addClass('colored-even');
            }
        });
    }

    function resetColors() {
        $shoppingList.find('li').removeClass('colored-even active');
    }

    // ==================== Funkcje - Sekcja 4: Zaawansowane ====================
    
    /**
     * Sortowanie alfabetyczne A-Z
     * get() - Zmienia jQuery obiekt na zwykłą tablicę
     * sort() - Sortuje tablicę
     * each() - Iteruje po każdym elemencie
     */
    function sortAlphabetically() {
        const items = $shoppingList.find('li')
            .get()
            .sort((a, b) => {
                return $(a).text().localeCompare($(b).text(), 'pl');
            });

        $shoppingList.empty();
        
        items.forEach((item, index) => {
            setTimeout(() => {
                $shoppingList.append($(item).addClass('fade-in'));
            }, index * 100);
        });

        setTimeout(() => enableDragDrop(), items.length * 100);
    }

    /**
     * Sortowanie odwrotne Z-A
     */
    function sortReverse() {
        const items = $shoppingList.find('li')
            .get()
            .sort((a, b) => {
                return $(b).text().localeCompare($(a).text(), 'pl');
            });

        $shoppingList.empty();
        
        items.forEach((item, index) => {
            setTimeout(() => {
                $shoppingList.append($(item).addClass('fade-in'));
            }, index * 100);
        });

        setTimeout(() => enableDragDrop(), items.length * 100);
    }

    /**
     * Filtrowanie listy
     * filter() - Filtruje elementy na podstawie warunku
     * indexOf() - Sprawdza czy ciąg znajduje się w tekście
     * show()/hide() - Pokazuje/ukrywa elementy
     */
    function filterList(searchTerm) {
        $shoppingList.find('li').each(function() {
            const itemText = $(this).text().toLowerCase();
            const searchText = searchTerm.toLowerCase();
            
            if (itemText.indexOf(searchText) === -1 && searchTerm !== '') {
                $(this).hide(200);
            } else {
                $(this).show(200);
            }
        });
    }

    function resetFilter() {
        $filterInput.val('');
        $shoppingList.find('li').show(200);
    }

    // ==================== Funkcje - Dynamiczna edycja ====================
    
    /**
     * text() - Pobiera tekstową treść elementu
     * html() - Wstawia HTML zawartość
     */
    function editItem($item) {
        const currentText = $item.text();
        
        $item.addClass('editing');
        $item.html(`<input type="text" value="${currentText}" autofocus>`);
        
        $item.find('input').focus().select();
    }

    function saveEdit($item) {
        const $input = $item.find('input');
        const newText = $input.val().trim();

        if (newText === '') {
            $item.removeClass('editing');
            $item.text('(puste)').css('color', '#999');
            return;
        }

        $item.removeClass('editing');
        $item.text(newText);
    }

    // ==================== Drag & Drop ====================
    
    /**
     * sortable() - Metoda z jQuery UI do drag & drop
     */
    function enableDragDrop() {
        $shoppingList.sortable({
            items: 'li',
            cursor: 'move',
            opacity: 0.7,
            placeholder: 'ui-sortable-placeholder',
            update: function(event, ui) {
                // Opcjonalnie: dodaj animację
                ui.item.addClass('pulse-item');
                setTimeout(() => ui.item.removeClass('pulse-item'), 600);
            }
        });

        $shoppingList.disableSelection();
    }

    // ==================== Helper funkcje ====================
    
    /**
     * Aktualizuje licznik elementów
     */
    function updateItemCount() {
        const count = $shoppingList.find('li:visible').length;
        $(itemCountSelector).text(count);
    }

    // Aktualizuj licznik przy filtrowaniu
    $(document).on('change', '#shoppingList', updateItemCount);
});

// ==================== NOTATKA: Różnice między metodami ====================

/**
 * 📚 RÓŻNICE MIĘDZY METODAMI jQuery:
 * 
 * 1. append() a prepend()
 *    - append():   dodaje element na KONIEC (jako ostatnie dziecko)
 *    - prepend():  dodaje element na POCZĄTEK (jako pierwsze dziecko)
 *    
 *    Przykład:
 *    <ul>
 *        <li>prepend dodany tutaj</li>  // prepend()
 *        <li>Element 1</li>
 *        <li>append dodany tutaj</li>   // append()
 *    </ul>
 * 
 * 2. remove() a empty()
 *    - remove():  usuwa CAŁY element z DOM (razem z elementem rodzica)
 *    - empty():   usuwa ZAWARTOŚĆ elementu, ale sam element pozostaje
 *    
 *    $('li').remove();  // Usuwa element <li>
 *    $('ul').empty();   // Usuwa zawartość <ul>, ale <ul> pozostaje
 * 
 * 3. text() a html()
 *    - text():   pobiera/ustawia TYLKO tekst (bez tagów HTML)
 *    - html():   pobiera/ustawia tekst z TAGAMI HTML
 *    
 *    Przykład:
 *    elem.html('<strong>Bold</strong>');  // Tworzy element <strong>
 *    elem.text('<strong>Bold</strong>');  // Wyświetla dosłownie: "<strong>Bold</strong>"
 * 
 * Użyte metody w aplikacji:
 * - addClass(), removeClass(), toggleClass() - Zarządzanie klasami CSS
 * - on() - Dodawanie event listenerów
 * - find() - Wyszukiwanie elementów wewnątrz
 * - each() - Iteracja po każdym elemencie
 * - get() - Konwersja jQuery obiektu na tablicę
 * - val() - Pobieranie wartości z input/textarea
 * - closest() - Szukanie elementu rodzica
 * - show(), hide() - Pokazywanie/ukrywanie elementów
 * - sortable() - jQuery UI metoda do drag & drop
 */
