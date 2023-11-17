import { Component } from "react";

export default class AfterBattle extends Component {
  constructor(props) {
    super(props);
    this.victory = props.victory;
  }
  render() {
    return <h1>{this.victory ? "Victory!" : "Defeated..."}</h1>;
  }
}
