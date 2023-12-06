import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"
import Register from "./pages/Register"
import PlayerInfo from "./pages/PlayerInfo"
import PlayerSearch from "./pages/PlayerSearch"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/leaderboard"} element={<Leaderboard />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/playerInfo/:email"} element={<PlayerInfo />} />
        <Route path={"/playerSearch"} element={<PlayerSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
