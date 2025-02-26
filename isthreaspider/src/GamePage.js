import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";

export default function GamePage() {
  const { gameTitle } = useParams();
  const [game, setGame] = useState(null);

  // fetch game data from json
  useEffect(() => {
    fetch("/is-there-a-spider-dot-com/games.json")
      .then(response => response.json())
      .then(data => {
        const foundGame = data.find(g => g.title.replace(/\s+/g, "-").toLowerCase() === gameTitle);
        setGame(foundGame);
      });
  }, [gameTitle]);

  // if game is not found, show error
  if (!game) {
    return <h2>game not found</h2>;
  }

  return (
    <div className="game-container">
      <h1 className="game-title">{game.title}</h1>
      <img src={game.image} alt={game.title} className="game-image" />
      <p className="game-description">{game.description}</p>
      <p className="game-spiders">
        {game.hasSpiders ? "this game has spiders" : "this game does not have spiders"}
      </p>
    </div>
  );
}
