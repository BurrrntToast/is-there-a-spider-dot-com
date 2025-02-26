import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import GamePage from './GamePage';

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



// import { BrowserRouter } from 'react-router-dom';

// function App() {
//   // Defaults to '/' if PUBLIC_URL is not set
//   const basename = process.env.PUBLIC_URL || '/';

//   return (
//     <BrowserRouter basename={basename}>
//       {/* Your Routes */}
//     </BrowserRouter>
//   );
// }
