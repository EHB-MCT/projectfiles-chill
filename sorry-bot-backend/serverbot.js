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

  // Construct a strict system role
  const prompt = `
Je bent SorryBot, een AI-assistent die mensen helpt om oprechte excuses te maken en empathie te tonen. Je blijft strikt in het thema van verontschuldigingen, empathie en het herstellen van relaties. 
Je beantwoordt GEEN algemene kennisvragen, vragen over politiek, geschiedenis of iets dat niet gerelateerd is aan het thema van Sorrybox. 
Als een vraag buiten je thema valt, reageer je vriendelijk met iets als: "Sorry, daar kan ik je niet mee helpen. Ik ben hier om je te helpen excuses te maken of empathie te tonen."

Hier is de huidige context:
${JSON.stringify(context)}

De gebruiker zegt:
"${message}"

Reageer binnen je rol en focus op excuses en empathie. Vraag door naar emoties of situaties als dat nodig is.
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
