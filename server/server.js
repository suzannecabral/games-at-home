const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const PORT = process.env.PORT || 3001;
const TEST_ID = process.env.TEST_ID || null;

// this turns req to json
app.use(express.json());
app.use(express.static("dist"));

app.get("/api", (req, res) => {
	res.send("Api is running!");
});

app.get("/api/testid", (req, res) => {
	res.status(200).json(TEST_ID);
});

app.post("/api/games", (req, res) => {
	const { steamId } = req.body;
	axios
		.get(
			`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=false`
		)
		.then((response) => {
			res.status(201).json(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send({ message: "Error requesting Steam data." });
		});
});

app.post("/api/games/detailed");

if (process.env.ENVIRONMENT === "development") {
	app.listen(PORT, () => {
		console.log(`Development app listening at port ${PORT}`);
	});
} else {
	app.listen(PORT, () => {
		console.log(`Production app listening at port ${PORT}`);
	});
}
// else {
// 	app.listen(DEV_PORT, () => {
// 		console.log(`Development app listening at http://localhost:${DEV_PORT}`);
// 	});
// }
