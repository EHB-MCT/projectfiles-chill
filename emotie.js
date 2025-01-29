// Select all buttons within the emotiebuttons container
const buttons = document.querySelectorAll(".emotiebuttons button");

// Handle button selection
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("selected")); // Remove 'selected' class from all buttons
    button.classList.add("selected"); // Add 'selected' class to clicked button
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

// Update the emotion image and handle selections
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

    if (nextStepButton) {
      nextStepButton.style.display = "block";
    }

    const currentStep = window.location.pathname.includes(
      "emotie-na-het-conflict"
    )
      ? "after"
      : "during";
    localStorage.setItem(`selectedEmotion-${currentStep}`, newSrc);
  });
});

// Hide the next step button if no selection
const hideNextStepButton = () => {
  if (nextStepButton) {
    const selectedButton = document.querySelector(
      ".emotiebuttons button.selected"
    );
    nextStepButton.style.display = selectedButton ? "block" : "none";
  }
};

// Ensure the button visibility on page load
if (nextStepButton) hideNextStepButton();

// Listen for changes to button selections
emotionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (nextStepButton) hideNextStepButton();
  });
});

// Handle link generation
const generateLinkButton = document.getElementById("generateLinkButton");
const messageContainer = document.getElementById("messageContainer");

generateLinkButton.addEventListener("click", () => {
  const emotietext = document.getElementById("emotietext").value;

  // Retrieve emotions from localStorage
  const emotionDuring = localStorage.getItem("selectedEmotion-during");
  const emotionAfter = localStorage.getItem("selectedEmotion-after");

  if (!emotionDuring || !emotionAfter) {
    alert("Emoties zijn niet geselecteerd.");
    return;
  }

  const baseUrl = window.location.origin + "/emotiefinishTEST.html";
  const shareableLink = `${baseUrl}?during=${encodeURIComponent(
    emotionDuring
  )}&after=${encodeURIComponent(emotionAfter)}&text=${encodeURIComponent(
    emotietext
  )}`;

  navigator.clipboard
    .writeText(shareableLink)
    .then(() => {
      messageContainer.innerHTML = `
        <p>Link gekopieerd naar het klembord!</p>
        <p><a href="${shareableLink}" target="_blank">${shareableLink}</a></p>
      `;
    })
    .catch(() => {
      messageContainer.innerHTML = `<p>Failed to copy the link. Please try again.</p>`;
    });
});

