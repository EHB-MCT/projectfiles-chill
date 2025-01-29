    // Get the sticker, color filter, and typography from localStorage
    const stickerImg = document.getElementById("selected-sticker");
    const selectedSticker = localStorage.getItem('selectedSticker');
    const colorFilter = localStorage.getItem('colorFilter');
    const selectedTypography = localStorage.getItem('selectedTypography');
  
    // Apply the sticker if available
    if (selectedSticker) {
      stickerImg.src = selectedSticker;
    }
  
    // Apply the color filter if available
    if (colorFilter) {
      stickerImg.style.filter = colorFilter;
    }
  
    // Apply the typography style if available
    if (selectedTypography) {
      const stickerMessage = document.getElementById("sticker-message");
      stickerMessage.classList.add(selectedTypography);
    }
  