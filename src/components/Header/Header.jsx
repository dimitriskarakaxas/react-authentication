import { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);

  const activeClassName = "text-green-300";
  const styleNavLink = ({ isActive }) =>
    isActive ? activeClassName : undefined;

  return (
    <header className="text-white bg-blue-500 px-8 py-4 mb-12 flex justify-between items-center w-11/12 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">React Auth</h1>
      <nav>
        <ul className="flex items-center">
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth" className={styleNavLink}>
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="ml-4">
              <NavLink to="/" className={styleNavLink}>
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="ml-4">
              <button
                to="/auth"
                className="border border-green-300 py-1 px-2 rounded"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
