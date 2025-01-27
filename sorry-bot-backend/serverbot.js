const fetch = require("node-fetch"); // Import fetch for API calls
const express = require("express"); // Express for setting up the server
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Your Cohere API key
const COHERE_API_KEY = "aELBuIbAeSnMbyg3FkAZqgspYfPVxjrAuD90FE5L";

app.use(cors());
app.use(bodyParser.json());

// Endpoint for generating a sorry letter
app.post("/generate-sorry-letter", async (req, res) => {
  const { emotion, situation } = req.body;

  // Short and simple prompt for kids
  const prompt = `Schrijf een korte en eenvoudige sorry-brief voor een kind. Houd rekening met deze informatie:
  - Emotie: ${emotion}.
  - Situatie: ${situation}.
  Zorg dat de brief niet langer is dan 5 zinnen.`;

  try {
    // Call Cohere API
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-xlarge-nightly", // The AI model to use
        prompt: prompt,
        max_tokens: 150, // Limit the number of generated tokens
        temperature: 0.7, // Adjust creativity (0.7 is balanced)
      }),
    });

    // Parse the response
    const data = await response.json();
    const apologyLetter = data.generations[0].text.trim();

    // Send the apology letter back to the client
    res.status(200).send({ apologyLetter });
  } catch (error) {
    console.error("Cohere API Error:", error.message);
    res.status(500).send({
      error: "Er ging iets mis bij het genereren van de sorry-brief.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
