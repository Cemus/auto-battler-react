import { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLogin } from "@mdi/js";
import "../styles/App.css";
import getUserData from "../utils/other/getUserData";
import { UserConsumer } from "../context/UserContext";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      disconnect: false,
    };
  }
  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    if (userInfos) this.setState({ username: userInfos.username });
  }

  render() {
    return (
      <UserConsumer>
        {(userContext) => (
          <div>
            <header className="header--global">
              <h1 aria-label="Title">
                <Link to="/">Auto Battler</Link>
              </h1>
              <div className="header--log">
                {this.state.username && (
                  <p className="header--log-text">
                    Logged as <span>{userContext.user.username}</span>
                  </p>
                )}
                <button
                  className="header--exit-session"
                  onClick={userContext.logout}
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
            {userContext.user && (
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
            )}
          </div>
        )}
      </UserConsumer>
    );
  }
}

export default Header;
