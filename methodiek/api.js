let originalMethodieken = [];
let currentPage = 1;
const itemsPerPage = 10;

async function fetchmethodieken() {
  try {
    const response = await fetch(`http://localhost:3000/methodieken`);
    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }
    const methodieken = await response.json();
    originalMethodieken = methodieken;
    showPagination(methodieken);
    showMethodieken(methodieken);
  } catch (error) {
    console.error("Error: no methodieken available:", error);
  }
}

function showMethodieken(methodieken) {
  const box = document.getElementById("article-1");
  box.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = methodieken.slice(startIndex, endIndex);

  if (!pageItems || pageItems.length === 0) {
    box.innerHTML = `<p class="no-results">No methodieken found.</p>`;
    return;
  }

  pageItems.forEach((methodiek) => {
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
}

function showPagination(methodieken) {
  const totalPages = Math.ceil(methodieken.length / itemsPerPage);
  const paginationBox = document.getElementById("pagination");

  paginationBox.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("page-button");
    button.onclick = () => changePage(i);
    paginationBox.appendChild(button);
  }
}

function changePage(page) {
  currentPage = page;
  showMethodieken(originalMethodieken);
}

fetchmethodieken();
