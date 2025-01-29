// Select all buttons within the emotiebuttons container
const buttons = document.querySelectorAll(".emotiebuttons button");
const emotionButtons = document.querySelectorAll(".emotiebuttons button");

// Mapping emotions to corresponding image sources
const emotieImages = {
  blij: "images/joy.gif",
  afschuw: "images/disgust.gif",
  bang: "images/fear.gif",
  boos: "images/angry.gif",
  triestig: "images/sad.gif",
  verrast: "images/shock.gif",
};

// Select the image element and the next step button
const emotieImage = document.getElementById("emotieImage");
const nextStepButton = document.getElementById("nextStep");

// Function to hide or show the next step button
const updateNextStepVisibility = () => {
  const selectedButton = document.querySelector(
    ".emotiebuttons button.selected"
  );
  nextStepButton.style.display = selectedButton ? "block" : "none";
};

// Add click event listeners to all emotion buttons
emotionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'selected' class from all buttons
    emotionButtons.forEach((btn) => btn.classList.remove("selected"));
    // Add 'selected' class to the clicked button
    button.classList.add("selected");

    // Retrieve emotion and update the image
    const emotie = button.getAttribute("data-emotie");
    const newSrc = emotieImages[emotie] || "icons/heart2.png"; // Default to heart icon
    emotieImage.src = newSrc;

    // Update the ID based on the image file type
    emotieImage.id = newSrc.endsWith(".gif") ? "gifImage" : "pngImage";

    // Save the selected emotion in localStorage
    const currentStep = window.location.pathname.includes(
      "emotie-na-het-conflict"
    )
      ? "after"
      : "during";
    localStorage.setItem(`selectedEmotion-${currentStep}`, newSrc);

    // Ensure the next step button is displayed
    updateNextStepVisibility();
  });
});

// Initial setup: Hide the next step button if no emotion is selected
updateNextStepVisibility();
