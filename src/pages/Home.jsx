import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";

export default class Home extends Component {
  render() {
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
