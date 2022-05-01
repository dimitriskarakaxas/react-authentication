import { Routes, Route } from "react-router-dom";

import AppWrapper from "./components/UI/AppWrapper";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
