const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const sorrybox = document.querySelector(".sorrybox");
const suggestionsContainer = document.querySelector(".suggestions");

let userResponses = {}; // Object to store user data

// Function to create a chat item
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  const chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<img src="./icons/Chatbot.png" alt="Smart Toy Icon" class="smart-toy-icon" /><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").innerHTML = message;
  return chatLi;
};

// Function to handle chat communication
const handleChat = async () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Add user's message to the chat
  sorrybox.appendChild(createChatLi(userMessage, "outgoing"));
  sorrybox.scrollTo(0, sorrybox.scrollHeight);
  chatInput.value = "";
  chatInput.style.height = "40px";

  // Add a typing indicator
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
    // Send the message to the server and wait for the AI's response
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage, context: userResponses }),
    });
    const data = await response.json();

    // Remove the typing indicator
    typingIndicator.remove();

    // Add the AI's response to the chat
    sorrybox.appendChild(createChatLi(data.reply, "incoming"));
    sorrybox.scrollTo(0, sorrybox.scrollHeight);

    // Update user context if provided by the server
    if (data.context) {
      userResponses = { ...userResponses, ...data.context };
    }
  } catch (error) {
    typingIndicator.remove();
    sorrybox.appendChild(
      createChatLi("Er is een fout opgetreden. Probeer het opnieuw.", "incoming")
    );
  }
};

// Auto-resize textarea
chatInput.addEventListener("input", () => {
  chatInput.style.height = "40px";
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle Enter key press
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

// Handle Send button click
sendChatBtn.addEventListener("click", handleChat);
