let originalMethodieken = []; 
async function fetchmethodieken() {
	try {
		const response = await fetch(
			`http://localhost:3000/methodieken`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch players");
		}
		const methodieken = await response.json();
		originalMethodieken = methodieken; // Save the original list
		Showmethodieken(methodieken); // Display all methodieken initially
	} catch (error) {
		console.error("Error: no methodieken available:", error);
	}
}

// Display players on the screen
function Showmethodieken(methodieken) {
	const box = document.getElementById("article-1");
	box.innerHTML = ""; // Clear previous content

	if (!methodieken || methodieken.length === 0) {
		box.innerHTML = `<p class="no-results">No methodieken found.</p>`;
		return;
	}

methodieken.forEach((methodieken) => {
		const metho = document.createElement("div");
		metho.classList.add("article-1");

		metho.innerHTML = `
      <div class="article" id="article-2">
                            <div class="icon-donwload">
                               <a href="${methodieken.pdf}">  <img src="./icons/donwload-icon.svg" " alt="Icon for article 1"> </a>
                            </div>
                            <div class="text">
                                <h3>${methodieken.alpha} - ${methodieken.titel}</h3>
                                <p>${methodieken.tekst}</p>
								<p>${methodieken.date}</p>

                            </div>
                        </div>
        `;
		box.appendChild(metho);
	});
}

fetchmethodieken(); 
