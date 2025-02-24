import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GamePage from "./GamePage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* home page route */}
        <Route path="/" element={<Home />} />

        {/* dynamic game page route */}
        <Route path="/game/:gameTitle" element={<GamePage />} />
      </Routes>
    </Router>
  );
}
