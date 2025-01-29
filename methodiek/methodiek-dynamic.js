const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

// Mongo config
const client = new MongoClient(process.env.DATABASE_URL);
const port = process.env.PORT ;
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

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

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

