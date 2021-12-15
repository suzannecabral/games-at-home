import React from "react";
import axios from "axios";
import GameCard from "./components/GameCard";
import "./styles.css";

const App = () => {
	const [steamId, setSteamId] = React.useState("");
	const [steamGames, setSteamGames] = React.useState([]);
	const [totalGames, setTotalGames] = React.useState(0);
	const [errorStatus, setErrorStatus] = React.useState(false);
	const [loaded, setLoaded] = React.useState(true);

	const loadSteamGames = (allGames) => {
		games.forEach((row) => {
			row.forEach((game) => {
				setSteamGames([...steamGames, game]);
			});
		});
	};

	const loadTestId = () => {};

	// React.useEffect(() => {
	// 	// renter game cards on change
	// 	steamGames.map((game) => {
	// 		return <GameCard game={game} />;
	// 	});
	// }, [steamGames]);

	React.useEffect(() => {
		axios
			.get("/api/testid")
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}, []);

	const handleClick = () => {
		setLoaded(false);
		setTotalGames(0);
		axios
			.post("/api/games", { steamId })
			.then((res) => {
				setSteamGames(res.data.response.games);
				setTotalGames(res.data.response.games.length);
				console.log(res.data.response.games);
				console.log("length: ", res.data.response.games.length);
			})
			.catch((err) => {
				setErrorStatus(true);
				console.error(err);
			})
			.finally(() => {
				setLoaded(true);
			});
	};

	return (
		<div className="container">
			<h1>Pick a Game:</h1>
			<input value={steamId} onChange={(e) => setSteamId(e.target.value)} />
			<button onClick={handleClick}>Submit</button>
			<div>
				<h2>Your Games {totalGames}</h2>
				<p>Status: {errorStatus ? "Error" : "Ok"}</p>
				<p>Done Loading: {loaded ? "Yes" : "No"}</p>
				<GameCard game={steamGames[0]} />
				{/* {
          steamGames && {
            steamGames.map((game)=>{return <p>{game.name}</p>});
          }
        } */}
			</div>
		</div>
	);
};

export default App;
