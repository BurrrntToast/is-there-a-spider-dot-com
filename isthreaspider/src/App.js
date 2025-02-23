import { useState } from "react";
import "./styles.css";

const games = [
  { title: "Game 1", hasSpiders: false, description: "Game 1 does not have spiders." },
  { title: "Game 2", hasSpiders: true, description: "Game 2 contains spiders!" },
  { title: "Game 3", hasSpiders: false, description: "Game 3 does not have spiders." },
  { title: "Game 4", hasSpiders: false, description: "Game 4 does not have spiders." },
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
          <a
            key={index}
            href={`/${game.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="result-item"
          >
            <strong>{game.title}</strong> - {game.hasSpiders ? "Yes, it has spiders." : "No, it does not have spiders."}
          </a>
        ))}
      </div>
    </div>
  );
}


//export default App;
