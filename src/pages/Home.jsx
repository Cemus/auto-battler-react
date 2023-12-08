import { Component } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import test from "../assets/test.png";

export default class Home extends Component {
  static contextType = UserContext;

  render() {
    const { user } = this.context;
    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <main>
        <header className="header--pixel">
          <h2>Home!</h2>
          <img src={test} alt="test" />
        </header>
      </main>
    );
  }
}
