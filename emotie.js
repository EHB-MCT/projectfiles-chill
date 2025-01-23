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

// als geen button geselecteerd word dan wordt het niet gedisplayed
const hideNextStepButton = () => {
	const selectedButton = document.querySelector(".emotiebuttons button.selected");
	if (!selectedButton) {
		nextStepButton.style.display = "none";
	}
};

// Check and hide the 'Next Step' button when page loads or if no emotion is selected
hideNextStepButton();
