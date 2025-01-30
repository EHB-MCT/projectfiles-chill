const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectionString = "http://localhost:3000/linken";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Schema and Model
const linkSchema = new mongoose.Schema({
  link: String,
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.model("Link", linkSchema);

// API Endpoints

// Save a new link
app.post("/linken", async (req, res) => {
  try {
    const { link } = req.body;
    const newLink = new Link({ link });
    await newLink.save();
    res.status(201).json({ message: "Link saved successfully", link: newLink });
  } catch (error) {
    res.status(500).json({ error: "Failed to save the link" });
  }
});

// Fetch all links
app.get("/linken", async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
