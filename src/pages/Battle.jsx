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
      allCards: [],
    };
  }
  async componentDidMount() {
    const allCards = await this.getCards();
    const battleInformations = this.context.battleInformations;
    this.setState(
      {
        players: battleInformations.fighters,
        quest: battleInformations.quest,
        enemies: battleInformations.quest.enemies,
        allCards: allCards,
      },
      () => {
        console.log("launch");
        this.launchGameLoop();
      }
    );
  }
  async getCards() {
    try {
      const response = await fetch("http://localhost:3000/api/get-cards");
      const allCards = await response.json();
      console.log(allCards);
      return allCards;
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes:", error);
    }
  }
  launchGameLoop() {
    console.log("started");
    this.setState({ gameLoopStarted: true });
  }
  render() {
    console.log(this.state.players, this.state.enemies);
    console.log(this.state.allCards[0]);
    return (
      <div className="arena-container">
        {this.state.gameLoopStarted && (
          <GameLoop
            players={this.state.players}
            enemies={this.state.enemies}
            allCards={this.state.allCards}
          />
        )}
      </div>
    );
  }
}
