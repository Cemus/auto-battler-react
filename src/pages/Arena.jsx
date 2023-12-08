import { Component } from "react";
import GameLoop from "../components/GameLoop";

export default class Arena extends Component {
  render() {
    return (
      <>
        <main>
          <h2>Fight!</h2>
          <section className="container">
            <GameLoop />
          </section>
        </main>
      </>
    );
  }
}
