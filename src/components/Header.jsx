import { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLogin } from "@mdi/js";
import "../styles/App.css";
import { UserContext } from "../context/UserContext";

class Header extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      disconnect: false,
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.setState({ username: user.username });
    }
  }

  exitSession() {
    this.context.logout();
  }

  render() {
    const { user } = this.context;

    return (
      <div>
        <header className="header--global">
          <h1 aria-label="Title">
            <Link to="/">Auto Battler</Link>
          </h1>
          <div className="header--log">
            {user && (
              <p className="header--log-text">
                Logged as <span>{user.username}</span>
              </p>
            )}
            <button
              className="header--exit-session"
              onClick={() => this.exitSession()}
              type="button"
            >
              <Icon
                className="login"
                path={mdiLogin}
                title="User Profile"
                color="white"
              />
            </button>
          </div>
        </header>
        {user && (
          <nav className="navigation-left" aria-label="Main menu">
            <ul>
              <li>
                <Link to="/party">Party</Link>
              </li>
              <li>
                <Link to="/collection">Collection</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/challenge">Challenge</Link>
              </li>
              <li>
                <Link to="/arena">Arena</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    );
  }
}

export default Header;
