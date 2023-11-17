import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";

export default class Home extends Component {
  render() {
    return (
      <>
        <main className="main--home">
          <header className="header--main">
            <h2>Welcome!</h2>
          </header>
        </main>
        <GlowingParticles />
      </>
    );
  }
}
