// Get the sticker selection and store it in localStorage
const selectedSticker = localStorage.getItem("selectedSticker"); 
const stickerImg = document.getElementById("selected-sticker");

// Check if a sticker was selected
if (selectedSticker) {
  stickerImg.src = selectedSticker;
  localStorage.setItem('selectedSticker', selectedSticker); // Store in localStorage
} else {
  alert("Geen sticker geselecteerd!");
  window.location.href = "sticker-page.html"; 
}

// Hue for stickers
const colorCheckboxes = document.querySelectorAll(
  "#color-red, #color-orange, #color-yellow, #color-green, #color-blue"
);

// Default color (red) when no other is selected
const defaultColor = "hue-rotate(0deg)";

function resetOtherCheckboxes(selectedCheckbox) {
  colorCheckboxes.forEach((checkbox) => {
    if (checkbox !== selectedCheckbox) {
      checkbox.checked = false;
    }
  });
}

// Function to apply color filter
function applyColorFilter() {
  const selectedSticker = document.getElementById("selected-sticker");

  if (selectedSticker) {
    if (document.getElementById("color-red").checked) {
      selectedSticker.style.filter = "hue-rotate(0deg)";
      localStorage.setItem('colorFilter', 'hue-rotate(0deg)'); // Save to localStorage
    } else if (document.getElementById("color-orange").checked) {
      selectedSticker.style.filter = "hue-rotate(30deg)";
      localStorage.setItem('colorFilter', 'hue-rotate(30deg)');
    } else if (document.getElementById("color-yellow").checked) {
      selectedSticker.style.filter = "hue-rotate(60deg)";
      localStorage.setItem('colorFilter', 'hue-rotate(60deg)');
    } else if (document.getElementById("color-green").checked) {
      selectedSticker.style.filter = "hue-rotate(120deg)";
      localStorage.setItem('colorFilter', 'hue-rotate(120deg)');
    } else if (document.getElementById("color-blue").checked) {
      selectedSticker.style.filter = "hue-rotate(240deg)";
      localStorage.setItem('colorFilter', 'hue-rotate(240deg)');
    } else {
      // Reset the filter if no checkbox is selected
      selectedSticker.style.filter = "none";
      localStorage.removeItem('colorFilter');
    }
  }
}

colorCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    resetOtherCheckboxes(event.target); // Uncheck other boxes
    applyColorFilter(); // Apply the selected color filter
  });
});

// Typography for stickers
function applyTypography(event) {
  const typographyOptions = document.querySelectorAll(".dropdown-typo-content > div");
  typographyOptions.forEach((option) => option.classList.remove("active"));

  event.target.classList.add("active");

  const selectedTypography = event.target.classList[0]; 
  const stickerMessage = document.getElementById("sticker-message");
  stickerMessage.className = ""; 
  stickerMessage.classList.add(selectedTypography); 

  // Save typography selection in localStorage
  localStorage.setItem('selectedTypography', selectedTypography);
}

const typographyOptions = document.querySelectorAll(".dropdown-typo-content > div");
typographyOptions.forEach((option) => {
  option.addEventListener("click", applyTypography);
});

// Set default color to red (if no color is selected)
window.addEventListener('load', () => {
  const colorFilter = localStorage.getItem('colorFilter');
  const redCheckbox = document.getElementById("color-red");

  // If no color is stored, apply the default red filter and check the red checkbox
  if (!colorFilter) {
    document.getElementById("selected-sticker").style.filter = defaultColor;
    redCheckbox.checked = true;
    localStorage.setItem('colorFilter', defaultColor); // Store default color in localStorage
  }
});
