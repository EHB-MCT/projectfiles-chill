const buttons = document.querySelectorAll(".emotiebuttons button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Verwijder de klasse 'selected' van alle knoppen
        buttons.forEach((btn) => btn.classList.remove("selected"));
        // Voeg de klasse 'selected' toe aan de geklikte knop
        button.classList.add("selected");
    });
});
