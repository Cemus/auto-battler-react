import { Component } from "react";
import { UserContext } from "../context/UserContext";
import GameLoop from "../components/GameLoop";

export default class Battle extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      fighters: {},
      quest: {},
      enemies: [],
    };
  }
  componentDidMount() {
    const battleInformations = this.context.battleInformations;
    this.setState({
      fighters: battleInformations.fighters,
      quest: battleInformations.quest,
      enemies: battleInformations.quest.enemies,
    });
  }
  render() {
    return (
      <div className="arena-container">
        {this.state.fighters && this.state.enemies && (
          <GameLoop fighters={this.state.fighters} quest={this.state.quest} />
        )}
      </div>
    );
  }
}
