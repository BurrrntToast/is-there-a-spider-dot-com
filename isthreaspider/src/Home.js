import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    fetch("/is-there-a-spider-dot-com/games.json")
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT</a>
        </div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
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
              {games
                .filter(game =>
                  game.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((game, index) => (
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
      {/* <footer className="footer">made with ❤️ and hatred for spiders</footer> */}
      <footer className="footer">made with hatred for spiders ❤️</footer>
    </div>
  );
}
