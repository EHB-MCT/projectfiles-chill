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
    </p>`;
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

// Functie om Ja/Nee opties te tonen voor de sorry-brief
const showGoodOrNotSuggestions = () => {
  suggestionsContainer.innerHTML = ""; // Wis oude suggesties
  chatInput.disabled = true; // Zet de tekstinvoer uit (disabled) voor de Ja/Nee suggesties
  chatInput.placeholder = ""; // Verwijder de placeholder tekst

  ["Ja", "Nee"].forEach((text) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => {
      sorrybox.appendChild(createChatLi(text, "outgoing"));
      sorrybox.scrollTo(0, sorrybox.scrollHeight);

      setTimeout(() => {
        if (text === "Nee") {
          generateResponse(
            "Geen probleem! Ik zal een nieuwe sorry-brief voor je genereren.",
            null
          );
          setTimeout(generateSorryLetter, 1200); // Genereer opnieuw
        } else if (text === "Ja") {
          generateResponse(
            "Goed gedaan! Kies wat je nu wilt doen:<br>- Ontdek hoe je sorry kunt zeggen met de 3 methodes<br>- Start een nieuwe chat om je te excuseren.",
            null
          );
          setTimeout(() => {
            const button1 = document.createElement("button");
            button1.textContent = "Ga naar de 3 methodes";
            button1.addEventListener("click", () => {
              window.location.href = "./4methods.html";
            });

            const button2 = document.createElement("button");
            button2.textContent = "Maak een nieuwe chat om je te excuseren";
            button2.addEventListener("click", () => {
              window.location.href = "./chatbot.html";
            });

            suggestionsContainer.appendChild(button1);
            suggestionsContainer.appendChild(button2);
          }, 800);
        }
      }, 800);

      // Verwijder suggesties, maar pas de textarea niet aan
      suggestionsContainer.innerHTML = "";
      if (text !== "Ja") {
        chatInput.disabled = false; // Zet de tekstinvoer weer aan (enabled) voor "Ja"
      }
    });
    suggestionsContainer.appendChild(button);
  });
};

// Functie om de chatbot respons te genereren
const generateResponse = (responseText, followUp = null) => {
  // Eerst de typing indicator tonen met robotafbeelding
  const typingIndicator = document.createElement("li");
  typingIndicator.classList.add("chat", "incoming");
  typingIndicator.innerHTML = `
    <img src="./icons/Chatbot.png" alt="Robot" class="smart-toy-icon" />
    <p class="typing-indicator">
      <span>.</span><span>.</span><span>.</span>
    </p>`;
  sorrybox.appendChild(typingIndicator);
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  // Wacht even voor de laadanimatie voordat je het echte antwoord toont
  setTimeout(() => {
    // Verwijder de typing indicator
    typingIndicator.remove();

    // Voeg het echte antwoord toe
    const incomingChatLi = createChatLi(responseText, "incoming");
    sorrybox.appendChild(incomingChatLi);
    sorrybox.scrollTo(0, sorrybox.scrollHeight);

    // Voeg de vervolgvraag toe als followUp niet null is
    if (followUp) {
      setTimeout(() => {
        const followUpQuestion = createChatLi(followUp, "incoming");
        sorrybox.appendChild(followUpQuestion);
        sorrybox.scrollTo(0, sorrybox.scrollHeight);

        if (followUp === "Wil je sorry zeggen?") {
          showYesNoSuggestions();
        }
      }, 1000);
    }
  }, 1000); // Na 2 seconden het antwoord tonen (je kunt de tijd aanpassen)
};

// Function to show suggestions with random responses
// Array of follow-up question variations
const followUpQuestions = [
  "Wat is er gebeurd?",
  "Kun je me vertellen wat er precies is gebeurd?",
  "Wil je uitleggen wat er aan de hand is?",
];

const showSuggestions = () => {
  suggestionsContainer.innerHTML = ""; // Clear old suggestions
  chatInput.disabled = false; // Ensure the textarea remains active
  chatInput.placeholder = "Schrijf hier je antwoord..."; // Show the placeholder

  suggestions.forEach(({ text, response }) => {
    const button = document.createElement("button");
    button.textContent = text;

    // When a suggestion is clicked
    button.addEventListener("click", () => {
      userResponses.emotion = text; // Save the selected emotion
      sorrybox.appendChild(createChatLi(text, "outgoing")); // Show the clicked suggestion as outgoing
      sorrybox.scrollTo(0, sorrybox.scrollHeight);

      // Pick a random response
      const randomResponse =
        response[Math.floor(Math.random() * response.length)];

      // Pick a random follow-up question
      const randomFollowUp =
        followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];

      // Clear suggestions after selection
      suggestionsContainer.innerHTML = "";

      setTimeout(() => {
        generateResponse(randomResponse, randomFollowUp); // Generate response
      }, 800);
    });

    suggestionsContainer.appendChild(button);
  });
};

// Functie om Ja/Nee suggesties te tonen voor de derde vraag
const showYesNoSuggestions = () => {
  suggestionsContainer.innerHTML = ""; // Clear old suggestions
  chatInput.disabled = false; // Keep textarea active
  chatInput.placeholder = "Schrijf hier je antwoord..."; // Ensure placeholder stays visible

  ["Ja", "Nee"].forEach((text) => {
    const button = document.createElement("button");
    button.textContent = text;

    // Handle button click
    button.addEventListener("click", () => {
      sorrybox.appendChild(createChatLi(text, "outgoing")); // Append outgoing message
      sorrybox.scrollTo(0, sorrybox.scrollHeight);

      // Clear suggestions after selection
      suggestionsContainer.innerHTML = "";

      setTimeout(() => {
        if (text === "Ja") {
          const positiveResponses = [
            "Dat is een mooie beslissing. Laten we samen werken aan een goed sorry.",
            "Top dat je die keuze maakt! We gaan samen iets goeds bedenken.",
          ];
          const randomResponse =
            positiveResponses[
              Math.floor(Math.random() * positiveResponses.length)
            ];

          generateResponse(randomResponse);
          setTimeout(generateSorryLetter, 1200); // Generate the apology letter
        } else {
          generateResponse(
            "Ik begrijp dat het moeilijk kan zijn om sorry te zeggen. Wil je er nog eens over nadenken?",
            "Wil je sorry zeggen?" // Re-prompt
          );
        }
      }, 800);
    });

    suggestionsContainer.appendChild(button);
  });
};

// Functie om de chat af te handelen voor gebruikersinvoer
const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user input
  if (!userMessage) return; // Skip empty input

  sorrybox.appendChild(createChatLi(userMessage, "outgoing")); // Display user message
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  userResponses.situation = userMessage; // Save user input
  chatInput.value = ""; // Clear textarea
  chatInput.style.height = "40px"; // Reset height

  // Clear suggestions after user input
  suggestionsContainer.innerHTML = "";

  const thankYouResponses = [
    "Dank je dat je dit met me deelt.",
    "Goed dat je het zegt, zo kunnen we er samen naar kijken.",
  ];
  const randomThankYou =
    thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];

  setTimeout(() => {
    generateResponse(randomThankYou, "Wil je sorry zeggen?");
  }, 100);
};

// Event Listeners
chatInput.addEventListener("input", () => {
  chatInput.style.height = "40px"; // Reset de hoogte
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Pas aan aan de inhoud
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);

// Toon suggesties bij het starten
showSuggestions();
