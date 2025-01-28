document.addEventListener("DOMContentLoaded", () => {
    const articles = document.querySelectorAll(".article");
    const articlesPerPage = 10;
    const container = document.querySelector(".content");

    const createPagination = (totalArticles, articlesPerPage) => {
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.className = "page-button";
            pageButton.dataset.page = i;
            paginationContainer.appendChild(pageButton);
        }
        container.appendChild(paginationContainer);

        const buttons = paginationContainer.querySelectorAll(".page-button");
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const page = parseInt(e.target.dataset.page);
                showPage(page, articles, articlesPerPage);
            });
        });
    };

    const showPage = (page, articles, articlesPerPage) => {
        articles.forEach((article, index) => {
            const start = (page - 1) * articlesPerPage;
            const end = start + articlesPerPage;
            if (index >= start && index < end) {
                article.style.display = "flex";
            } else {
                article.style.display = "none";
            }
        });
    };

    if (articles.length > articlesPerPage) {
        createPagination(articles.length, articlesPerPage);
        showPage(1, articles, articlesPerPage);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.querySelector(".filter-toggle");
    const filters = document.querySelector(".filters");

    filterToggle.addEventListener("click", () => {
        filters.classList.toggle("open"); // Toggle 'open' class
        filterToggle.textContent = filters.classList.contains("open")
            ? "Close Filters"
            : "Filters";
    });
});