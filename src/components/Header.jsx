import { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLogin } from "@mdi/js";
import "../styles/App.css";
class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header className="header--global">
        <nav className="navigation-left" aria-label="Main menu">
          <ul>
            <li>
              <Link to="/party">Party</Link>
            </li>
            <li>
              <Link to="/cards">Cards</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/arena">Arena</Link>
            </li>
          </ul>
        </nav>
        <h1 aria-label="Title">
          <Link to="/">Auto Battler</Link>
        </h1>
        <nav className="navigation-right">
          <ul>
            <Icon
              className="login"
              path={mdiLogin}
              title="User Profile"
              color="white"
            />
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
