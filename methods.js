/* Heart */
const functionHeart = document.querySelector(".icons-1");
const heartIcon = functionHeart.querySelector(".icon-img");

functionHeart.addEventListener("mouseover", () => {
	heartIcon.src = "./icons/Heart_hover.svg";
});

functionHeart.addEventListener("mouseout", () => {
	heartIcon.src = "./icons/Heart.svg";
});

/* Sticker */

const functionSticker = document.querySelector(".icons-2");
const stickerIcon = functionSticker.querySelector(".icon-img");

functionSticker.addEventListener("mouseover", () => {
	stickerIcon.src = "./icons/Sticker_hover.svg";
});

functionSticker.addEventListener("mouseout", () => {
	stickerIcon.src = "./icons/Sticker.svg";
});

/* Origami */

const functionOrigami = document.querySelector(".icons-3");
const origamiIcon = functionOrigami.querySelector(".icon-img");

functionOrigami.addEventListener("mouseover", () => {
	origamiIcon.src = "./icons/Origami_hover.svg";
});

functionOrigami.addEventListener("mouseout", () => {
	origamiIcon.src = "./icons/Origami.svg";
});
