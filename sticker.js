const selectedSticker = localStorage.getItem("selectedSticker");
  const stickerImg = document.getElementById("selected-sticker");

  // Check if a sticker was selected
  if (selectedSticker) {
    stickerImg.src = selectedSticker;
  } else {
    alert("Geen sticker geselecteerd!");
    window.location.href = "sticker-page.html"; 
  }

