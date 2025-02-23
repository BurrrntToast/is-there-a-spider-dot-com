import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GamePage from "./GamePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameTitle" element={<GamePage />} />
      </Routes>
    </Router>
  );
}
