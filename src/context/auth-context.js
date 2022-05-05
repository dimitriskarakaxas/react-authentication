import { useState, createContext } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainintTime = (expirationTime) => {
  const currentTime = new Date();
  const currentTimeMilliseconds = currentTime.getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTimeMilliseconds;
  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token", token);
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    const remainingTime = calculateRemainintTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
