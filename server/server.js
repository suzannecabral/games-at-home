const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

// this turns req to json
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
	res.send("Api is running...!");
});

app.post("/api/games", (req, res) => {
	const { steamId } = req.body;
	console.log(steamId);
	axios
		.get(
			`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`
		)
		.then((response) => {
			res.status(201).json(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send({ message: "Network error" });
		});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
