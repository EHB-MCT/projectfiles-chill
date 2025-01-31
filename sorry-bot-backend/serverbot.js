const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const client = new MongoClient(process.env.DATABASE_URL);
const port = process.env.PORT;

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  app.use(cors({
    origin: "https://automatic-spoon-j7y4oq3.pages.github.io", 
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
  }));
  app.use(bodyParser.json());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, context } = req.body;

  // Zorg ervoor dat context altijd een geldige structuur heeft
  const updatedContext =
    context && context.messages
      ? [...context.messages, { role: "user", content: message }]
      : [{ role: "user", content: message }];

  // Als de gebruiker vraagt om een sorrybrief te maken, genereer deze
  if (message.toLowerCase() === "maak een sorrybrief") {
    const prompt = `
    Genereer een sorrybrief op basis van de volgende conversatie:
    ${JSON.stringify(updatedContext)}
    De gebruiker zegt:
    "${message}"
    Maak een sorrybrief van maximaal 6 zinnen. Gebruik korte zinnen en makkelijke woorden. Zorg ervoor dat kinderen van 10 tot 14 jaar (taalniveau A1-B1) de tekst goed begrijpen.
    `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
        }
      );

      const data = await response.json();
      const reply = data.choices[0].message.content;

      res.json({
        reply,
        context: {
          messages: updatedContext.concat({
            role: "assistant",
            content: reply,
          }),
        },
      });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      res.status(500).json({ error: "Error generating response" });
    }
  } else {
    // Standaard reactie op gewone berichten
    const prompt = `
    Je bent SorryBot, een empathische AI-assistent die mensen helpt oprechte excuses te maken en verhoudingen te herstellen. Je helpt gebruikers reflecteren op hun situatie, emoties, gedachten, gedrag en de gevolgen van hun acties. Gebruik korte zinnen en makkelijke woorden. Zorg ervoor dat kinderen van 10 tot 14 jaar (taalniveau A1-B1) de tekst goed begrijpen.
    Je beantwoordt GEEN algemene kennisvragen, vragen over politiek, geschiedenis of iets dat niet gerelateerd is aan het thema van Sorrybox. 
    Als een vraag buiten je thema valt, reageer je vriendelijk met iets als: "Sorry, daar kan ik je niet mee helpen. Ik ben hier om je te helpen excuses te maken of empathie te tonen."
    
    Je taak:
    
    Begin met een open vraag die de gebruiker uitnodigt om na te denken over de situatie en hun gevoelens. Stel **slechts één vraag per chat** en stop daarna. Stel maximaal drie vervolgvragen in totaal, en stop daarna.
    
    Je antwoorden moeten niet lang zijn.
    
    Hier is de huidige context van het gesprek:
    ${JSON.stringify(updatedContext)}
    
    De gebruiker zegt:
    "${message}"
    
    Reageer empathisch en reflectief zonder oordeel. Stel vragen die de gebruiker verder helpen bij het herstel van de situatie. Gebruik de "je"-vorm en niet de "u"-vorm.
`;
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
        }
      );

      const data = await response.json();
      const reply = data.choices[0].message.content;

      // Verzend het antwoord van de AI en werk de context bij
      res.json({
        reply,
        context: {
          messages: updatedContext.concat({
            role: "assistant",
            content: reply,
          }),
        },
      });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      res.status(500).json({ error: "Error generating response" });
    }
  }
});

// Get all players
app.get("/methodieken", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Sorrybox").collection("Methodieken");
    const query = {};
    const collection = await db.find(query).toArray();
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send({
      error: "An error has occurred",
      value: error,
    });
  } finally {
    await client.close();
  }
});

// Start serverr
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
