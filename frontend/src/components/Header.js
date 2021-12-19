import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { UserContext } from "./logContext";
import { useContext } from "react";

const Header = () => {
    // const token = localStorage.getItem("token");
    // const username = localStorage.getItem("username");
    const {user} = useContext(UserContext)

  return (
    <div>
      <nav className="navbar transparent navbar-expand-lg navbar-inverse">
        <div className="container-fluid">
          <a className="navbar-brand">EastStore</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>

                {/* <Link to='/'>Home</Link> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contact">
                  Contact
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/cart">
                  Cart
                </Link>{" "}
              </li>
              <li className="nav-item">
               {user ? <Link className="nav-link active" to="/profile">
                  {user.username}
                </Link> : <Link className="nav-link active" to="/login">
                  Login
                </Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
