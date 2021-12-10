const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const PORT = process.env.DEV_PORT;

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
			res.status(400).send({ message: "Error requesting Steam data." });
		});
});

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
