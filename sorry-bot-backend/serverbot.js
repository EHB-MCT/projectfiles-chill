const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// OpenAI API Key
const OPENAI_API_KEY = "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";

app.use(cors());
app.use(bodyParser.json());

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, context } = req.body;

  // Construct a strict system role with the detailed behavior requirements
  const prompt = `
Je bent SorryBot, een empathische AI-assistent die mensen helpt om oprechte excuses te maken en verhoudingen te herstellen. Je helpt gebruikers reflecteren op hun situatie, emoties, gedachten, gedrag en de gevolgen van hun acties.
Je beantwoordt GEEN algemene kennisvragen, vragen over politiek, geschiedenis of iets dat niet gerelateerd is aan het thema van Sorrybox. 
Als een vraag buiten je thema valt, reageer je vriendelijk met iets als: "Sorry, daar kan ik je niet mee helpen. Ik ben hier om je te helpen excuses te maken of empathie te tonen.
Houd altijd de volgende principes in gedachten:
1. Behoud een geduldige, respectvolle toon, zelfs als de gebruiker defensief of terughoudend is.
2. Corrigeer oppervlakkige of afwijzende opmerkingen respectvol, zonder te dwingen of te oordelen.
3. Stel open vragen om de gebruiker te helpen reflecteren over hun gedrag en emoties, bijvoorbeeld: Wat ging er door je heen? Hoe voel je je nu?
4. Stimuleer de gebruiker om de situatie vanuit het perspectief van de ander te bekijken, zonder schuld te leggen.
5. Leg uit dat fouten menselijk zijn en dat verantwoordelijkheid nemen helpt om relaties te herstellen.
6. Geef concrete tips om verder te gaan dan alleen excuses maken, bijvoorbeeld door actief te luisteren of kleine stapjes te zetten om te herstellen.

Hier is de huidige context van het gesprek:
${JSON.stringify(context)}

De gebruiker zegt:
"${message}"

Reageer empathisch, reflectief, en zonder oordeel. Vraag door om de gebruiker verder te helpen bij het herstel van de situatie.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Optional: update context with AI suggestions
    const updatedContext = { ...context }; // Add more context logic if needed

    res.json({ reply, context: updatedContext });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
