import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";
import getUserData from "../utils/other/getUserData";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  render() {
    const userInfos = JSON.parse(getUserData(false));
    if (!userInfos) {
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
