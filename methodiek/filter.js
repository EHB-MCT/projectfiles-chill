document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchBar");
  const clearFiltersButton = document.querySelector(".clear-filters");
  const clearFiltersButtonMobile = document.querySelector(
    ".clear-filters-mobile"
  );

  document
    .querySelectorAll(".age-filter, .methodiek-filter, .level-filter")
    .forEach((filter) => {
      filter.addEventListener("change", applyFilters);
    });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", clearFilters);
  }

  if (clearFiltersButtonMobile) {
    clearFiltersButtonMobile.addEventListener("click", clearFilters);
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
    document.getElementById("searchBar")?.value.trim().toLowerCase() || "";

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

  applyFilters();
}
