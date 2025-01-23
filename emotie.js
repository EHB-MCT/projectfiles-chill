const buttons = document.querySelectorAll(".emotiebuttons button");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		// Verwijder de klasse 'selected' van alle knoppen
		buttons.forEach((btn) => btn.classList.remove("selected"));
		// Voeg de klasse 'selected' toe aan de geklikte knop
		button.classList.add("selected");
	});
});

// Get the image element and buttons
const emotieImage = document.getElementById("emotieImage");
const emotieButtons = document.querySelectorAll(".emotiebuttons button");

// Object mapping emotions to images
const emotieImages = {
	blij: "images/joy.gif",
	afschuw: "images/disgust.gif",
	bang: "images/fear.gif",
	boos: "images/angry.gif",
	triestig: "images/sad.gif",
	verrast: "images/shock.gif",
};

// Add click event listeners to buttons
emotieButtons.forEach((button) => {
	button.addEventListener("click", () => {
		// Remove 'selected' class from all buttons
		emotieButtons.forEach((btn) => btn.classList.remove("selected"));

		// Add 'selected' class to clicked button
		button.classList.add("selected");

		// Update the image source
		const emotie = button.getAttribute("data-emotie");
		emotieImage.src = emotieImages[emotie] || "icons/heart2.png"; // Default image
	});
});
