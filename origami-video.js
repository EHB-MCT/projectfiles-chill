const choices = document.querySelectorAll(".origami-choice");

choices.forEach((choice) => {
	choice.addEventListener("click", (event) => {
		event.preventDefault();
		const videoPath = choice.getAttribute("data-video");
		localStorage.setItem("selectedVideo", videoPath);
		window.location.href = choice.getAttribute("href");
	});
});

const videoElement = document.getElementById("origami-video");
const videoSource = videoElement.querySelector("source");

const selectedVideo = localStorage.getItem("selectedVideo");

if (selectedVideo) {
	videoSource.src = selectedVideo;
	videoElement.load();
} else {
	alert("Geen video geselecteerd! Keer terug naar de vorige pagina.");
	window.location.href = "./origami2.html";
}
