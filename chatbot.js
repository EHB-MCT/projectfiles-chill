const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const sorrybox = document.querySelector(".sorrybox");

let userMessage;

// Suggereerbare keuzes
const suggestions = [
  "Ik voel me verdrietig.",
  "Ik voel me gefrustreerd.",
  "Ik voel me schuldig.",
  "Ik voel me alleen.",
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
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Functie om de chatbot respons te genereren
const generateResponse = (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector("p");

  // Hier genereren we een simpele respons gebaseerd op de gebruikersinput of een suggestie
  const responses = [
    "Dat klinkt als een goede manier om sorry te zeggen.",
    "Ik weet zeker dat ze dat zullen waarderen.",
    "Laten we verdergaan om je sorry-tool te maken!",
  ];
  const responseText = responses[Math.floor(Math.random() * responses.length)];

  setTimeout(() => {
    messageElement.textContent = responseText;
    sorrybox.scrollTo(0, sorrybox.scrollHeight);
  }, 800); // Wacht even voordat de reactie verschijnt
};

// Functie om een suggestie te tonen
const showSuggestions = () => {
  const suggestionContainer = document.createElement("div");
  suggestionContainer.classList.add("suggestions");

  suggestions.forEach((text) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => {
      chatInput.value = text;
    });
    suggestionContainer.appendChild(button);
  });

  sorrybox.appendChild(suggestionContainer);
};

// Functie om de chat af te handelen
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  sorrybox.appendChild(createChatLi(userMessage, "outgoing"));
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  const incomingChatLi = createChatLi("Even nadenken...", "incoming");
  sorrybox.appendChild(incomingChatLi);
  sorrybox.scrollTo(0, sorrybox.scrollHeight);

  generateResponse(incomingChatLi);
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
