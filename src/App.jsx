import { Routes, Route } from "react-router-dom";

import AppWrapper from "./components/UI/AppWrapper";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
