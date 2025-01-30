document.addEventListener("DOMContentLoaded", () => {
  const searchInputDesktop = document.getElementById("searchBar");
  const searchInputMobile = document.getElementById("searchBar-mobile");
  const clearFiltersButton = document.querySelector(".clear-filters");
  const clearFiltersButtonMobile = document.querySelector(
    ".clear-filters-mobile"
  );
  const filterToggleButton = document.querySelector(".filter-toggle");
  const filtersMobile = document.querySelector(".filters-mobile");

  document
    .querySelectorAll(".age-filter, .methodiek-filter, .level-filter")
    .forEach((filter) => {
      filter.addEventListener("change", applyFilters);
    });

  if (searchInputDesktop) {
    searchInputDesktop.addEventListener("input", applyFilters);
  }

  if (searchInputMobile) {
    searchInputMobile.addEventListener("input", applyFilters);
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", clearFilters);
  }

  if (clearFiltersButtonMobile) {
    clearFiltersButtonMobile.addEventListener("click", clearFilters);
  }

  if (filterToggleButton && filtersMobile) {
    filterToggleButton.addEventListener("click", () => {
      if (
        filtersMobile.style.display === "none" ||
        filtersMobile.style.display === ""
      ) {
        filtersMobile.style.display = "block";
      } else {
        filtersMobile.style.display = "none";
      }
    });
  }
});

function applyFilters() {
  const ageFilters = Array.from(
    document.querySelectorAll(".age-filter:checked")
  ).map((input) => input.value);
  const methodiekFilters = Array.from(
    document.querySelectorAll(".methodiek-filter:checked")
  ).map((input) => input.value);
  const levelFilters = Array.from(
    document.querySelectorAll(".level-filter:checked")
  ).map((input) => input.value);
  const searchQuery =
    document.getElementById("searchBar")?.value.trim().toLowerCase() ||
    document.getElementById("searchBar-mobile")?.value.trim().toLowerCase() ||
    "";

  const filteredMethodieken = originalMethodieken.filter((methodiek) => {
    const matchesAge =
      ageFilters.length === 0 ||
      ageFilters.some((filter) => methodiek.leeftijd.includes(filter));
    const matchesMethodiek =
      methodiekFilters.length === 0 ||
      methodiekFilters.some((filter) => methodiek.methodiek.includes(filter));
    const matchesLevel =
      levelFilters.length === 0 ||
      levelFilters.some((filter) =>
        methodiek.ontwikkelingsniveau.includes(filter)
      );
    const matchesSearch =
      !searchQuery || methodiek.titel.toLowerCase().includes(searchQuery);

    return matchesAge && matchesMethodiek && matchesLevel && matchesSearch;
  });

  showMethodieken(filteredMethodieken);
}

function clearFilters() {
  document
    .querySelectorAll(".age-filter, .methodiek-filter, .level-filter")
    .forEach((checkbox) => {
      checkbox.checked = false;
    });

  document.getElementById("searchBar").value = "";
  document.getElementById("searchBar-mobile").value = "";

  applyFilters();
}
