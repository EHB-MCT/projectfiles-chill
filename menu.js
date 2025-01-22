const dropdown = document.querySelector(".dropdown");

if (dropdown) {
	dropdown.addEventListener("click", () => {
		dropdown.classList.toggle("active");
	});
}

const menuHamburger = document.querySelector(".menu-hamburger");
const navLinks = document.querySelector(".nav-right");

menuHamburger.addEventListener("click", () => {
	navLinks.classList.toggle("mobile-menu");

	if (navLinks.classList.contains("mobile-menu")) {
		menuHamburger.src = "./icons/X.svg";
	} else {
		menuHamburger.src = "./icons/Hamburger.svg";
	}
});
