import "./Navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const authLinks = (
    <ul>
      <li>
        <NavLink exact activeClassName="active" to="/books">
          Books
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/signin">
          SignOut
        </NavLink>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <NavLink exact activeClassName="active" to="/signin">
          SignIn
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/signup">
          SignUp
        </NavLink>
      </li>
    </ul>
  );
  return (
    <header id="header">
      <div className="container">
        <div className="row center-xs end-sm end-md end-lg end-lg middle-xs middle-sm middle-md middle-lg">
          <NavLink to="/" className="col-xs-12 col-sm-4 col-md-2 col-lg-2">
            <h1 className="title">Biblioteca</h1>
          </NavLink>
          <nav id="navbar" className="col-xs-12 col-sm-8 col-md-10 col-lg-10">
            {/* {!loading && (isLoggedIn ? authLinks : guestLinks)} */}
            {guestLinks}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
