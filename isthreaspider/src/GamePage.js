import { useParams } from "react-router-dom";
import "./styles.css";

const games = [
  { title: "Game 1", hasSpiders: false, description: "Game 1 does not have spiders.", image: "game1.jpg" },
  { title: "Game 2", hasSpiders: true, description: "Game 2 contains spiders!", image: "game2.jpg" },
  { title: "Game 3", hasSpiders: false, description: "Game 3 does not have spiders.", image: "game3.jpg" },
];

export default function GamePage() {
  const { gameTitle } = useParams();
  const game = games.find(g => g.title.replace(/\s+/g, "-").toLowerCase() === gameTitle);

  if (!game) {
    return <h2>Game not found</h2>;
  }

  return (
    <div className="game-container">
      <h1 className="game-title">{game.title}</h1>
      <img src={game.image} alt={game.title} className="game-image" />
      <p className="game-description">{game.description}</p>
      <p className="game-spiders">
        {game.hasSpiders ? "This game has spiders." : "This game does not have spiders."}
      </p>
    </div>
  );
}
