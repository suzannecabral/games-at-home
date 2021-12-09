import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="panel">
				<p>Enter your steam url:</p>
				<p class="caption">
					(Must be set to public) It looks like this:
					https://steamcommunity.com/profiles/[[
					<strong>thislongnumberhere</strong>]
				</p>
				<input />
				<button class="secondary-button">Save</button>
			</div>
			<h1>Pick a game:</h1>
			<div className="panel half">
				<p>Your Result</p>
			</div>
			<button>Another!</button>
			<button className="secondary-button">Store Page</button>

			<h2>Your games library:</h2>
			<div className="panel">
				<ul>
					<li>thing</li>
					<li>thing</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
