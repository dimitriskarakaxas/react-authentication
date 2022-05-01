import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log("hey");
            const errorMessage =
              data?.error?.message ?? "Something went wrong!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-white p-6 bg-blue-500 max-w-lg mx-auto text-center">
      <h2 className="font-bold text-2xl">{isLogin ? "Login" : "Register"}</h2>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-lg font-bold mb-1">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-black py-1 px-2 rounded outline-none"
            ref={emailInputRef}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="text-lg font-bold mb-1">
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-black py-1 px-2 rounded outline-none"
            ref={passwordInputRef}
          />
        </div>

        <button
          type="submit"
          className="block w-fit mx-auto bg-blue-400 px-8 py-2 text-lg rounded transition-colors hover:bg-blue-800 mb-4"
        >
          {isLoading && "Sending request..."}
          {!isLoading && isLogin && "Login"}
          {!isLoading && !isLogin && "Create Account"}
        </button>
      </form>
      <button
        className="block w-fit mx-auto text-sm text-blue-200"
        onClick={switchAuthModeHandler}
      >
        {isLogin ? "Create new Account" : "Login with existing account"}
      </button>
    </div>
  );
};

export default AuthForm;
