import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"
import Register from "./pages/Register"
import UserInfo from "./pages/UserInfo"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/leaderboard"} element={<Leaderboard />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/userInfo/:userID"} element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
