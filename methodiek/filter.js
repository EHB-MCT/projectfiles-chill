    const filterToggleButton = document.querySelector(".filter-toggle");
    const filterSection = document.querySelector(".filters-mobile");
    const clearButton = document.querySelector(".clear-filters");
    const clearButtonMobile = document.querySelector(".clear-filters-mobile");
    const searchBarMobile = document.querySelector(".search-bar-mobile"); // Targeting mobile search bar

    filterToggleButton.addEventListener("click", function() {
        filterSection.classList.toggle("active");
        filterSection.style.display = filterSection.classList.contains("active") ? "block" : "none";
    });

    function filterContent() {
        const ageFilters = Array.from(document.querySelectorAll(".age-filter:checked")).map(input => input.value);
        const methodiekFilters = Array.from(document.querySelectorAll(".methodiek-filter:checked")).map(input => input.value);
        const levelFilters = Array.from(document.querySelectorAll(".level-filter:checked")).map(input => input.value);
        const searchQuery = searchBarMobile ? searchBarMobile.value.toLowerCase() : ''; // Get the search query from mobile search bar

        const articles = document.querySelectorAll(".article");
        articles.forEach(article => {
            const articleAge = article.getAttribute("leeftijd");
            const articleMethodiek = article.getAttribute("methodiek");
            const articleLevel = article.getAttribute("ontwikkelingsniveau");
            const articleTitle = article.querySelector("titel").textContent.toLowerCase();

            const matchesSearch = articleTitle.includes(searchQuery);

            if (
                (ageFilters.length === 0 || ageFilters.includes(articleAge)) &&
                (methodiekFilters.length === 0 || methodiekFilters.includes(articleMethodiek)) &&
                (levelFilters.length === 0 || levelFilters.includes(articleLevel)) &&
                (searchQuery === "" || matchesSearch)
            ) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }

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
