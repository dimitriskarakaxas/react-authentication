import { useRef, useContext } from "react";

import AuthContext from "../../context/auth-context";

const ProfileForm = () => {
  const newPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    console.log(enteredNewPassword);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            console.log("hey");
            const errorMessage =
              data?.error?.message ?? "Something went wrong!";
            throw new Error(errorMessage);
          });
        }

        // Assumbtion that succeed
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-white p-6 bg-blue-500 max-w-lg mx-auto text-center">
      <h2 className="font-bold text-2xl">Change Password</h2>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="text-lg font-bold mb-1">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-black py-1 px-2 rounded outline-none"
            ref={newPasswordRef}
          />
        </div>

        <button
          type="submit"
          className="block w-fit mx-auto bg-blue-400 px-8 py-2 text-lg rounded transition-colors hover:bg-blue-800 mb-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
