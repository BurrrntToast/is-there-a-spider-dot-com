import { useParams } from "react-router-dom";
import "./styles.css";

// list of games with details
const games = [
  { title: "Game 1", hasSpiders: false, description: "Game 1 does not have spiders.", image: "game1.jpg" },
  { title: "Game 2", hasSpiders: true, description: "Game 2 contains spiders", image: "game2.jpg" },
  { title: "Game 3", hasSpiders: false, description: "Game 3 does not have spiders.", image: "game3.jpg" },
];

export default function GamePage() {
  // get the game title from the url
  const { gameTitle } = useParams();

  // find the matching game from the list
  const game = games.find(g => g.title.replace(/\s+/g, "-").toLowerCase() === gameTitle);

  // if no game is found, show error message
  if (!game) {
    return <h2>game not found</h2>;
  }

  return (
    <div className="game-container">
      {/* display game details */}
      <h1 className="game-title">{game.title}</h1>
      <img src={game.image} alt={game.title} className="game-image" />
      <p className="game-description">{game.description}</p>
      <p className="game-spiders">
        {game.hasSpiders ? "this game has spiders" : "this game does not have spiders"}
      </p>
    </div>
  );
}
