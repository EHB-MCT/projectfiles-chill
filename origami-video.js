const choices = document.querySelectorAll(".origami-choice");

choices.forEach((choice) => {
	choice.addEventListener("click", (event) => {
		event.preventDefault();
		const videoURL = choice.getAttribute("data-video");
		localStorage.setItem("selectedVideo", videoURL);
		window.location.href = choice.getAttribute("href");
	});
});

const iframeElement = document.getElementById("origami-video");
const selectedVideo = localStorage.getItem("selectedVideo");

if (selectedVideo) {
	iframeElement.src = selectedVideo;
} else {
	alert("Geen video geselecteerd! Keer terug naar de vorige pagina.");
	window.location.href = "./origami2.html";
}
