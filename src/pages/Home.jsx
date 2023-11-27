import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default class Home extends Component {
  static contextType = UserContext;

  render() {
    const { user } = this.context;
    if (!user) {
      return <Navigate to="/login" />;
    }

    return (
      <main>
        <header className="header--main">
          <h2>Home!</h2>
        </header>
        <GlowingParticles />
      </main>
    );
  }
}
