import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppWrapper from "./components/UI/AppWrapper";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={authCtx.isLoggedIn ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
