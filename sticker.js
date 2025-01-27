const selectedSticker = localStorage.getItem("selectedSticker");
  const stickerImg = document.getElementById("selected-sticker");

  // Check if a sticker was selected
  if (selectedSticker) {
    stickerImg.src = selectedSticker;
  } else {
    alert("Geen sticker geselecteerd!");
    window.location.href = "sticker-page.html"; 
  }

//Hue for stickers
 const colorCheckboxes = document.querySelectorAll(
  "#color-red, #color-orange, #color-yellow, #color-green, #color-blue"
);

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
    } else if (document.getElementById("color-orange").checked) {
      selectedSticker.style.filter = "hue-rotate(30deg)";
    } else if (document.getElementById("color-yellow").checked) {
      selectedSticker.style.filter = "hue-rotate(60deg)";
    } else if (document.getElementById("color-green").checked) {
      selectedSticker.style.filter = "hue-rotate(120deg)";
    } else if (document.getElementById("color-blue").checked) {
      selectedSticker.style.filter = "hue-rotate(240deg)";
    } else {
      // Reset the filter if no checkbox is selected
      selectedSticker.style.filter = "none";
    }
  }
}

colorCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    resetOtherCheckboxes(event.target); // Uncheck other boxes
    applyColorFilter(); // Apply the selected color filter
  });
});

//Typography for stickers
function applyTypography(event) {

  const typographyOptions = document.querySelectorAll(".dropdown-typo-content > div");
	typographyOptions.forEach((option) => option.classList.remove("active"));

	event.target.classList.add("active");

	const selectedTypography = event.target.classList[0]; 
	const stickerMessage = document.getElementById("sticker-message");
	stickerMessage.className = ""; 
	stickerMessage.classList.add(selectedTypography); 
}

const typographyOptions = document.querySelectorAll(".dropdown-typo-content > div");
typographyOptions.forEach((option) => {
	option.addEventListener("click", applyTypography);
});

