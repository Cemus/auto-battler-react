import { Component } from "react";
import { UserContext } from "../context/UserContext";
import GameLoop from "../components/GameLoop";

export default class Battle extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      players: {},
      quest: {},
      enemies: [],
      gameLoopStarted: false,
    };
  }
  componentDidMount() {
    const battleInformations = this.context.battleInformations;
    this.setState(
      {
        players: battleInformations.fighters,
        quest: battleInformations.quest,
        enemies: battleInformations.quest.enemies,
      },
      () => {
        console.log("launch");
        this.launchGameLoop();
      }
    );
  }
  launchGameLoop() {
    console.log("started");
    this.setState({ gameLoopStarted: true });
  }
  render() {
    console.log(this.state.players, this.state.enemies);
    console.log(this.state.gameLoopStarted);
    return (
      <div className="arena-container">
        {this.state.gameLoopStarted && (
          <GameLoop players={this.state.players} enemies={this.state.enemies} />
        )}
      </div>
    );
  }
}
