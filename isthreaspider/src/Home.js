import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  // fetch game data from the json file
  useEffect(() => {
    fetch("/games.json")
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  // filter games based on search input
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">is there a spider?</h1>

      <input
        type="text"
        placeholder="search for a game..."
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
            <strong>{game.title}</strong> - <span>{game.hasSpiders ? "yes, it has spiders" : "no, it does not have spiders"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
