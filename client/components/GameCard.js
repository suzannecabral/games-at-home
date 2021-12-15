import React from "react";

const GameCard = (props) => {
	const { game } = props;

	return (
		<div className="gamecard">
			<imgGameIcon />
			<img
				// replace "logo" with "icon" for small game icons
				src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}
				alt={`${game.name} logo`}
			/>
			<h3>{game.name}</h3>
		</div>
	);
};

export default GameCard;
