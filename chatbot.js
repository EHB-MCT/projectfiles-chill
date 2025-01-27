const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const sorrybox = document.querySelector(".sorrybox");
const suggestionsContainer = document.querySelector(".suggestions");

let userMessage;
let userResponses = {}; // Object om gebruikersgegevens op te slaan

// Suggereerbare keuzes en hun bijbehorende reacties
const suggestions = [
  {
    text: "Ik voel me verdrietig.",
    response: [
      "Het spijt me dat je je zo voelt. Het is helemaal oké om verdrietig te zijn.",
      "Ik kan me voorstellen dat het zwaar is. Het is goed om je emoties te erkennen.",
      "Het spijt me dat je verdrietig bent. Misschien kan ik je helpen om je beter te voelen.",
    ],
  },
  {
    text: "Ik voel me gefrustreerd.",
    response: [
      "Dat klinkt echt lastig. Frustratie kan erg vervelend zijn.",
      "Ik begrijp dat je gefrustreerd bent.",
      "Het is normaal om gefrustreerd te zijn.",
    ],
  },
  {
    text: "Ik voel me schuldig.",
    response: [
      "Het is goed dat je je bewust bent van je gevoelens. Iedereen maakt wel eens fouten.",
      "Het kan helpen om je gevoelens van schuld te verwerken.",
      "Het is oké om je schuldig te voelen.",
    ],
  },
  {
    text: "Ik voel me alleen.",
    response: [
      "Het spijt me dat je je zo voelt. Je bent niet alleen.",
      "Dat klinkt moeilijk. Je hoeft je niet alleen te voelen.",
      "Het is echt erg om je alleen te voelen.",
    ],
  },
];

// Functie om suggesties weer te geven
const showSuggestions = () => {
  suggestionsContainer.innerHTML = ""; // Reset eerst de container

  suggestions.forEach((suggestion) => {
    const button = document.createElement("button");
    button.textContent = suggestion.text;
    button.addEventListener("click", () => {
      chatInput.value = suggestion.text;
      showResponse(suggestion.response);
    });

    suggestionsContainer.appendChild(button);
  });

  suggestionsContainer.style.display = "flex"; // Toon de suggesties
};

// Functie om een reactie weer te geven op basis van de keuze
const showResponse = (responses) => {
  responses.forEach((response) => {
    sorrybox.appendChild(createChatLi(response, "incoming"));
  });
  sorrybox.scrollTo(0, sorrybox.scrollHeight);
};

// Functie om een chat-item aan te maken
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  const chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<img src="./icons/Chatbot.png" alt="Smart Toy Icon" class="smart-toy-icon" /><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").innerHTML = message; // Gebruik innerHTML voor HTML-inhoud
  return chatLi;
};

// Functie om een sorry-brief te genereren
const generateSorryLetter = async () => {
  const { emotion, situation } = userResponses;

  // Voeg de laadindicator toe voordat de brief wordt gegenereerd
  const typingIndicator = document.createElement("li");
  typingIndicator.classList.add("chat", "incoming");
  typingIndicator.innerHTML = `
    <img src="./icons/Chatbot.png" alt="Robot" class="smart-toy-icon" />
    <p class="typing-indicator">
      <span>.</span><span>.</span><span>.</span>
    </p>
  `;
  sorrybox.appendChild(typingIndicator);
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  try {
    // Wacht 2 seconden voordat de brief wordt gegenereerd (laadanimatie)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simuleer de tijd die het kost om de brief te genereren

    // Hier kan de API-aanroep komen voor het genereren van de brief (of een andere logica)
    const response = await fetch(
      "http://localhost:3000/generate-sorry-letter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emotion, situation }),
      }
    );

    const data = await response.json();
    const apologyLetter = data.apologyLetter;

    // Verwijder de laadindicator nadat de brief is gegenereerd
    typingIndicator.remove();

    // Toon de gegenereerde sorry-brief in de chat
    sorrybox.appendChild(
      createChatLi("Hier is jouw gegenereerde sorry-brief:", "incoming")
    );
    sorrybox.appendChild(createChatLi(apologyLetter, "incoming"));
    sorrybox.scrollTo(0, sorrybox.scrollHeight);

    setTimeout(() => {
      generateResponse("Is deze sorry-brief goed?", null);
      showGoodOrNotSuggestions(); // Toon "Ja" en "Nee"-opties
    }, 1200);
  } catch (error) {
    // Verwijder de laadindicator bij een fout
    typingIndicator.remove();
    sorrybox.appendChild(
      createChatLi(
        "Er is een fout opgetreden bij het genereren van de sorry-brief.",
        "incoming"
      )
    );
  }
};

// Eventlistener voor verzendknop
sendChatBtn.addEventListener("click", () => {
  userMessage = chatInput.value;
  chatInput.value = "";
  chatInput.placeholder = "Schrijf hier je antwoord...";
  chatInput.disabled = false;
  chatInput.focus();

  // Voeg gebruikersbericht toe
  sorrybox.appendChild(createChatLi(userMessage, "outgoing"));
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  if (!userMessage) {
    return;
  }

  userResponses = {
    emotion: userMessage,
    situation: "Gesprek met Sorry Bot",
  };

  generateSorryLetter(); // Genereer sorry-brief
});

// Toon suggesties bij het laden van de pagina
showSuggestions();
