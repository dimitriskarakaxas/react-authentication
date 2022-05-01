import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, logout } = authCtx;

  const logoutBtnClickHandler = () => {
    logout();
  };

  const activeClassName = "text-green-300";
  const styleNavLink = ({ isActive }) =>
    isActive ? activeClassName : undefined;

  return (
    <header className="text-white bg-blue-500 px-8 py-4 mb-12 flex justify-between items-center w-11/12 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">
        <Link to="/">React Auth</Link>
      </h1>
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
              <NavLink to="/profile" className={styleNavLink}>
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="ml-4">
              <button
                to="/auth"
                className="border border-green-300 py-1 px-2 rounded"
                onClick={logoutBtnClickHandler}
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
