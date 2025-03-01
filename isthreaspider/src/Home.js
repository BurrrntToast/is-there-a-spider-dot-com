import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch("/is-there-a-spider-dot-com/games.json")
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <a href="#">HOME</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT</a>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">HATE SPIDERS?</h1>
        <p className="description">
          Us too! That's why we created this website to let you know
          which games have spiders, and which games don't!
        </p>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="SEARCH"
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
      
      {/* Footer */}
      <footer className="footer">Made with Love</footer>
    </div>
  );
}
