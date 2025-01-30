document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.querySelector(".sorrybox");
  const inputField = document.querySelector(".chat-input textarea");
  const sendBtn = document.getElementById("send-btn");
  const sorryLetterBtn = document.querySelector(".makeSorryLetter");
  const yesOrNoButtons = document.querySelector(".yes-or-no");
  const choicesContainer = document.querySelector(".choices-container");

  let questionCount = 0;
  let userAnswerCount = 0;
  const maxQuestions = 3;
  let conversationHistory = []; // Conversation history for context
  let typingIndicator;

  // Function to add a message to the chat
  function addMessage(text, isUser = false, isTyping = false) {
    const chatItem = document.createElement("li");
    chatItem.classList.add("chat", isUser ? "outgoing" : "incoming");

    if (!isUser) {
      const icon = document.createElement("img");
      icon.src = isUser ? "./icons/User.png" : "./icons/Chatbot.svg";
      icon.alt = isUser ? "User Icon" : "Chatbot Icon";
      icon.classList.add("smart-toy-icon");
      chatItem.appendChild(icon);
    }

    const messageText = document.createElement("p");

    if (isTyping) {
      messageText.classList.add("typing-indicator");
      messageText.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
    } else {
      messageText.textContent = text;
    }

    chatItem.appendChild(messageText);
    chatBox.appendChild(chatItem);
    chatBox.scrollTop = chatBox.scrollHeight;

    return chatItem;
  }

  // Send the message to the chat
  function sendMessage() {
    const message = inputField.value.trim();
    if (message === "") return;

    addMessage(message, true);
    inputField.value = "";
    sendBtn.disabled = true;

    // Save the message in the conversation history
    conversationHistory.push({ role: "user", content: message });
    userAnswerCount++;

    // Voeg typanimatie toe, but skip it if questionCount > 1
    if (questionCount < 3) {
      typingIndicator = addMessage("", false, true); // Add typing animation
    }

    // Send the message to the backend
    setTimeout(() => {
      fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context: { messages: conversationHistory },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Show chatbot reply if questionCount < 3
          if (questionCount < maxQuestions) {
            if (questionCount < 3) {
              typingIndicator.remove(); // Verwijder typanimatie
            }
            addMessage(data.reply);
            questionCount++;
          }

          // After 4th user input, show the buttons
          if (userAnswerCount >= 4) {
            sorryLetterBtn.style.display = "block"; // Show the button
            inputField.disabled = true; // Disable input
            sendBtn.disabled = true; // Disable send button
          }
        })
        .catch((error) => {
          console.error("Error while sending:", error);
          if (questionCount < 3) {
            typingIndicator.remove(); // Verwijder typanimatie
          }
          addMessage("Sorry, something went wrong. Please try again.");
        })
        .finally(() => {
          sendBtn.disabled = false;
        });
    }, 2000);
  }

  // Event listener for sending message
  sendBtn.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Make sorry letter button
  sorryLetterBtn.addEventListener("click", () => {
    addMessage("Ik maak een sorrybrief voor je...");

    // Create the sorry letter by sending the request
    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "maak een sorrybrief",
        context: { messages: conversationHistory },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addMessage(data.reply);
        localStorage.setItem("sorryLetter", data.reply);
        addMessage("Vind je deze brief goed?");
        sorryLetterBtn.style.display = "none"; // Hide the button
        yesOrNoButtons.style.display = "block"; // Show the Yes/No buttons
      })
      .catch((error) => {
        console.error("Error generating the sorry letter:", error);
        addMessage("Sorry, there was an issue generating the letter.");
      });
  });

  // Handle the "Yes" button click
  document
    .querySelector(".yes-or-no .buttonbrief:nth-child(1)")
    .addEventListener("click", () => {
      addMessage("Goed dat je tevreden bent! Hier zijn je keuzes.");
      yesOrNoButtons.style.display = "none"; // Hide the Yes/No buttons
      choicesContainer.style.display = "block"; // Show the choices container
    });

  // Handle the "No" button click
  document
    .querySelector(".yes-or-no .buttonbrief:nth-child(2)")
    .addEventListener("click", () => {
      addMessage(
        "Sorry dat je deze brief niet goed vond. druk op de button om een nieuwe te maken."
      );
      yesOrNoButtons.style.display = "none"; // Hide the Yes/No buttons
      sorryLetterBtn.style.display = "block"; // Show the sorry letter button again
    });
});
