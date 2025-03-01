import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  // fetch game data from the json file with dynamic public url
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/games.json`)
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

      <div className="search-container">
        <input
          type="text"
          placeholder="search for a game..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          className="search-bar"
        />

        {showResults && (
          <div className="search-results">
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
        )}
      </div>
    </div>
  );
}
