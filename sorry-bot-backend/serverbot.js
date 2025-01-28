require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

// Endpoint for generating a sorry letter
app.post("/generate-sorry-letter", async (req, res) => {
  const { emotion, situation } = req.body;

  // Short and simple prompt for kids
  const prompt = `Schrijf een korte en eenvoudige sorry-brief voor een kind. Houd rekening met deze informatie:
  - Emotie: ${emotion}.
  - Situatie: ${situation}.
  Zorg dat de brief niet langer is dan 5 zinnen. De brief moet verontschuldigen op een eenvoudige, oprechte manier, met nadruk op verantwoordelijkheid nemen en beloven om het beter te doen. 
    Zorg ervoor dat de brief positief, liefdevol en begrijpelijk is voor een kind.`;

  try {
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    // Parse the response
    const data = await response.json();
    const apologyLetter = data.choices[0].message.content.trim();

    // Send the apology letter back to the client
    res.status(200).send({ apologyLetter });
  } catch (error) {
    console.error("Openai API Error:", error.message);
    res.status(500).send({
      error: "Er ging iets mis bij het genereren van de sorry-brief.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
