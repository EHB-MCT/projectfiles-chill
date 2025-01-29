    const filterToggleButton = document.querySelector(".filter-toggle");
    const filterSection = document.querySelector(".filters-mobile");
    const clearButton = document.querySelector(".clear-filters");
    const clearButtonMobile = document.querySelector(".clear-filters-mobile");
    const searchBarMobile = document.querySelector(".search-bar-mobile");

    filterToggleButton.addEventListener("click", function() {
        filterSection.classList.toggle("active");
        filterSection.style.display = filterSection.classList.contains("active") ? "block" : "none";
    });

    document.querySelectorAll(".age-filter, .methodiek-filter, .level-filter").forEach(checkbox => {
        checkbox.addEventListener("change", filterContent);
    });

    if (searchBarMobile) {
        searchBarMobile.addEventListener("input", filterContent);
    }

    clearButton.addEventListener("click", function() {
        document.querySelectorAll(".age-filter, .methodiek-filter, .level-filter").forEach(checkbox => {
            checkbox.checked = false;
        });
        if (searchBarMobile) searchBarMobile.value = "";
        filterContent();
    });

    clearButtonMobile.addEventListener("click", function() {
        document.querySelectorAll(".age-filter, .methodiek-filter, .level-filter").forEach(checkbox => {
            checkbox.checked = false;
        });
        if (searchBarMobile) searchBarMobile.value = "";
        filterContent();
    });

    filterContent();


    document.addEventListener("DOMContentLoaded", () => {
        const searchBar = document.querySelector(".search-bar");
        const ageFilters = document.querySelectorAll(".age-filter");
        const methodiekFilters = document.querySelectorAll(".methodiek-filter");
        const levelFilters = document.querySelectorAll(".level-filter");
        const clearFiltersBtn = document.querySelector(".clear-filters");
    
        // Event listeners for filtering
        searchBar.addEventListener("input", filterMethodieken);
        ageFilters.forEach(filter => filter.addEventListener("change", filterMethodieken));
        methodiekFilters.forEach(filter => filter.addEventListener("change", filterMethodieken));
        levelFilters.forEach(filter => filter.addEventListener("change", filterMethodieken));
        clearFiltersBtn.addEventListener("click", clearFilters);
    
        function filterMethodieken() {
            let filteredMethodieken = originalMethodieken;
    
            // Search filter
            const searchQuery = searchBar.value.toLowerCase();
            if (searchQuery) {
                filteredMethodieken = filteredMethodieken.filter(methodiek =>
                    methodiek.titel.toLowerCase().includes(searchQuery) ||
                    methodiek.tekst.toLowerCase().includes(searchQuery)
                );
            }
    
            // Age filter
            const selectedAges = [...ageFilters].filter(f => f.checked).map(f => f.value);
            if (selectedAges.length > 0) {
                filteredMethodieken = filteredMethodieken.filter(methodiek =>
                    selectedAges.includes(methodiek.leeftijd)
                );
            }
    
            // Methodiek filter
            const selectedMethodieken = [...methodiekFilters].filter(f => f.checked).map(f => f.value);
            if (selectedMethodieken.length > 0) {
                filteredMethodieken = filteredMethodieken.filter(methodiek =>
                    selectedMethodieken.includes(methodiek.methodiek.toString())
                );
            }
    
            // Ontwikkelingsniveau filter
            const selectedLevels = [...levelFilters].filter(f => f.checked).map(f => f.value);
            if (selectedLevels.length > 0) {
                filteredMethodieken = filteredMethodieken.filter(methodiek =>
                    selectedLevels.includes(methodiek.niveau.toString())
                );
            }
    
            Showmethodieken(filteredMethodieken);
        }
    
        function clearFilters() {
            searchBar.value = "";
            ageFilters.forEach(f => (f.checked = false));
            methodiekFilters.forEach(f => (f.checked = false));
            levelFilters.forEach(f => (f.checked = false));
            Showmethodieken(originalMethodieken);
        }
    });
    