// Controleer of de variabelen al bestaan voordat je ze declareert
if (typeof emotionDuring === "undefined") {
	var emotionDuring = localStorage.getItem("selectedEmotion-during");
}

if (typeof emotionAfter === "undefined") {
	var emotionAfter = localStorage.getItem("selectedEmotion-after");
}

// Wissel tussen de GIF's (indien beschikbaar)
if (emotionDuring && emotionAfter) {
	const gifElement = document.getElementById("combinedGif");
	let showDuring = true;

	setInterval(() => {
		gifElement.src = showDuring ? emotionDuring : emotionAfter;
		showDuring = !showDuring;
	}, 2000); // Wissel elke 2 seconden
} else {
	console.error("Emoties zijn niet correct opgeslagen in localStorage.");
}

// Event listeners voor emotie-selectie
const buttons = document.querySelectorAll(".emotiebuttons button");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		// Verwijder de klasse 'selected' van alle knoppen
		buttons.forEach((btn) => btn.classList.remove("selected"));
		// Voeg de klasse 'selected' toe aan de geklikte knop
		button.classList.add("selected");
	});
});

const emotionButtons = document.querySelectorAll(".emotiebuttons button");

const emotieImages = {
	blij: "images/joy.gif",
	afschuw: "images/disgust.gif",
	bang: "images/fear.gif",
	boos: "images/angry.gif",
	triestig: "images/sad.gif",
	verrast: "images/shock.gif",
};

const emotieImage = document.getElementById("emotieImage");
const nextStepButton = document.getElementById("nextStep");

emotionButtons.forEach((button) => {
	button.addEventListener("click", () => {
		emotionButtons.forEach((btn) => btn.classList.remove("selected"));
		button.classList.add("selected");

		const emotie = button.getAttribute("data-emotie");
		const newSrc = emotieImages[emotie] || "icons/heart2.png"; // Default image
		emotieImage.src = newSrc;

		if (newSrc.endsWith(".gif")) {
			emotieImage.id = "gifImage";
		} else {
			emotieImage.id = "pngImage";
		}

		nextStepButton.style.display = "block";
	});
});

// Verberg de "Next Step" knop indien geen selectie
const hideNextStepButton = () => {
	const selectedButton = document.querySelector(".emotiebuttons button.selected");
	if (!selectedButton) {
		nextStepButton.style.display = "none";
	}
};

// Direct uitvoeren om de knop te verbergen
hideNextStepButton();

// Functie om een deelbare link te genereren
const generateShareableLink = () => {
	const emotietext = document.getElementById("emotietext").value;

	if (!emotionDuring || !emotionAfter) {
		alert("Emoties zijn niet geselecteerd.");
		return;
	}

	// Genereer de deelbare URL
	const baseUrl = window.location.origin + "/emotiefinishTEST.html";
	const shareableLink = `${baseUrl}?during=${encodeURIComponent(emotionDuring)}&after=${encodeURIComponent(emotionAfter)}&text=${encodeURIComponent(emotietext)}`;

	// Kopieer de link naar het klembord
	navigator.clipboard
		.writeText(shareableLink)
		.then(() => {
			console.log("Link gekopieerd naar het klembord!");
			// Feedback tonen
			const linkFeedback = document.getElementById("linkFeedback");
			const shareLink = document.getElementById("shareLink");

			shareLink.textContent = shareableLink;
			shareLink.href = shareableLink;
			linkFeedback.style.display = "block";
		})
		.catch(() => {
			alert("Kon de link niet kopiëren. Probeer het opnieuw.");
		});
};

// Event listener voor de "Genereer Link" knop
document.getElementById("generateLinkButton").addEventListener("click", generateShareableLink);

// Zorg ervoor dat emotie wordt opgeslagen in localStorage bij selectie
emotionButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const emotie = button.getAttribute("data-emotie");
		const newSrc = emotieImages[emotie] || "icons/heart2.png";

		// Opslaan in localStorage
		const currentStep = window.location.pathname.includes("emotie-na-het-conflict") ? "after" : "during";
		localStorage.setItem(`selectedEmotion-${currentStep}`, newSrc);

		emotieImage.src = newSrc;
		nextStepButton.style.display = "block";
	});
});
