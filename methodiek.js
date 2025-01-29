let currentPage = 1;
let articlesPerPage = 10;

async function fetchmethodieken() {
    try {
        const response = await fetch(`http://localhost:3000/methodieken`);
        if (!response.ok) {
            throw new Error("Failed to fetch players");
        }
        const methodieken = await response.json();
        originalMethodieken = methodieken;
        Showmethodieken(methodieken);
    } catch (error) {
        console.error("Error: no methodieken available:", error);
    }
}

function Showmethodieken(methodieken) {
    const box = document.getElementById("article-1");
    box.innerHTML = "";

    if (!methodieken || methodieken.length === 0) {
        box.innerHTML = `<p class="no-results">No methodieken found.</p>`;
        return;
    }

    // Calculate the starting index and end index based on the current page
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = methodieken.slice(start, end);

    // Display articles for the current page
    paginatedArticles.forEach((methodiek) => {
        const metho = document.createElement("div");
        metho.classList.add("article-1");

        metho.innerHTML = `
            <div class="article" id="article-2">
                <div class="icon-donwload">
                    <a href="${methodiek.pdf}">  
                        <img src="./icons/donwload-icon.svg" alt="Download icon"> 
                    </a>
                </div>
                <div class="text">
                    <h3>${methodiek.alpha} - ${methodiek.titel}</h3>
                    <p>${methodiek.tekst}</p>
                    <p>${methodiek.date}</p>
                </div>
            </div>
        `;
        box.appendChild(metho);
    });

    // Show/hide pagination buttons based on the current page
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage * articlesPerPage >= methodieken.length;
}

// Event listeners for pagination buttons
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        Showmethodieken(originalMethodieken);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage * articlesPerPage < originalMethodieken.length) {
        currentPage++;
        Showmethodieken(originalMethodieken);
    }
});

fetchmethodieken();
