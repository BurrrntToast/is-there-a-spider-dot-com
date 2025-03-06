import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/games.json`)
      .then((response) => response.json())
      .then((data) => setGames(data));
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
      {/* Navigation */}
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
          Us too! That's why we created this website to let you know which games have spiders and which don't!
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="SEARCH"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Render Cards Only When Search is Not Empty */}
        {search.length > 0 && (
          <div className="game-card-container">
            {games
              .filter((game) =>
                game.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((game, index) => {
                let spiderText;
                let spiderClass;
                if (game.hasSpiders === "yes") {
                  spiderText = "Yes";
                  spiderClass = "has-spiders";
                } else if (game.hasSpiders === "no-but") {
                  spiderText = "No, but...";
                  spiderClass = "no-but";
                } else {
                  spiderText = "No";
                  spiderClass = "no-spiders";
                }
                return (
                  <Link
                    key={index}
                    to={`/game/${game.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="game-card"
                  >
                    <h3>{game.title}</h3>
                    <p className={spiderClass}>{spiderText}</p>
                  </Link>
                );
              })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">Made with Love</footer>
    </div>
  );
}
