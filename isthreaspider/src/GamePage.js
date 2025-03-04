import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";

export default function GamePage() {
  const { gameTitle } = useParams();
  const [game, setGame] = useState(null);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/games.json`)
      .then(response => response.json())
      .then(data => {
        const foundGame = data.find(g => g.title.replace(/\s+/g, "-").toLowerCase() === gameTitle);
        setGame(foundGame);
      });
  }, [gameTitle]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="/">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT</a>
        </div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </nav>

      {/* Game Content */}
      <div className="game-container">
        {!game ? (
          <h1>game not found</h1>
        ) : (
          <>
            <h1 className="game-title">{game.title}</h1>
            <img src={game.image} alt={game.title} className="game-image" />
            <p className="game-description">{game.description}</p>
            <p className="game-spiders">
              {game.hasSpiders ? "this game has spiders" : "this game does not have spiders"}
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">Made with Love</footer>
    </>
  );
}
