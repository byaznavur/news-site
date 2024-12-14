import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
export class Header extends Component {
  render() {
    return (
      <header>
        <nav className="container">
          <Link className="logo" to="/">
            News
          </Link>

          <ul>
            <li>
              <NavLink to="">Home</NavLink>
            </li>
            <li>
              <NavLink to="business">Business</NavLink>
            </li>
            <li>
              <NavLink to="entertainment">Entertainment</NavLink>
            </li>
            <li>
              <NavLink to="general">General</NavLink>
            </li>
            <li>
              <NavLink to="health">Health</NavLink>
            </li>
            <li>
              <NavLink to="science">Science</NavLink>
            </li>
            <li>
              <NavLink to="sports">Sports</NavLink>
            </li>
            <li>
              <NavLink to="technology">Technology</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
