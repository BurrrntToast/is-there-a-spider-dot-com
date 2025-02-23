import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const games = [
  { title: "Game 1", hasSpiders: false, description: "Game 1 does not have spiders.", image: "game1.jpg" },
  { title: "Game 2", hasSpiders: true, description: "Game 2 contains spiders!", image: "game2.jpg" },
  { title: "Game 3", hasSpiders: false, description: "Game 3 does not have spiders.", image: "game3.jpg" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredGames = games.filter(game => game.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h1 className="title">Is There a Spider?</h1>
      <input
        type="text"
        placeholder="Search for a game..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="results">
        {filteredGames.map((game, index) => (
          <Link
            key={index}
            to={`/game/${game.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="result-item"
          >
            <strong>{game.title}</strong> - <span>{game.hasSpiders ? "Yes, it has spiders." : "No, it does not have spiders."}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
