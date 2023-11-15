import "./styles/App.css";
import { Component } from "react";
import Header from "./components/Header";
import GameLoop from "./components/GameLoop";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <GameLoop />
        <Footer />
      </div>
    );
  }
}

export default App;
