import "./Navigation.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Navigation({ handleRegisterModal, handleLoginModal, handleLogOut }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      {!currentUser && (
        <>
          <button
            type="button"
            className="navigation__button"
            onClick={handleRegisterModal}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="navigation__button"
            onClick={handleLoginModal}
          >
            Log In
          </button>
        </>
      )}
      {location.pathname !== "/" && (
        <Link to="/" className="navigation__button">
          Main
        </Link>
      )}
      {location.pathname !== "/about" && (
        <Link to="/about" className="navigation__button">
          About
        </Link>
      )}
      {currentUser && (
        <button
          type="button"
          onClick={handleLogOut}
          className="navigation__button"
        >
          Log Out
        </button>
      )}
    </nav>
  );
}

export default Navigation;
