import { Component } from "react";
import getUserData from "../utils/other/getUserData";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default class Challenge extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fighters: [],
      fight: false,
      selectedFighters: [],
      quests: [
        {
          title: "Duel",
          desc: "Fight against a duelist.",
          nbFighter: 1,
          gold: 60,
          xp: 60,
          enemies: ["warrior"],
        },
        {
          title: "Another Duel",
          desc: "Fight against another duelist.",
          nbFighter: 3,
          gold: 80,
          xp: 80,
          enemies: ["beasts", "beasts", "beasts"],
        },
      ],
      currentQuest: null,
    };
    this.handleQuest = this.handleQuest.bind(this);
    this.handleContext = this.handleContext.bind(this);
  }

  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    this.setState({ user: userInfos });

    userInfos.fighters.forEach((fighter) => {
      this.setState((prevState) => ({
        fighters: [...prevState.fighters, fighter],
      }));
    });
  }

  handleQuest(quest) {
    console.log(quest);
    console.log(this.state.quests[quest]);
    if (quest !== null) {
      this.setState({ currentQuest: this.state.quests[quest] });
    }
    this.setState(() => ({
      fighters: [],
      selectedFighters: [],
    }));

    this.state.user.fighters.forEach((fighter) => {
      this.setState((prevState) => ({
        fighters: [...prevState.fighters, fighter],
      }));
    });

    this.setState((prevState) => ({ fight: !prevState.fight }));
  }

  handleFighterSelect(fighter) {
    this.setState((prevSelected) => ({
      selectedFighters: [...prevSelected.selectedFighters, fighter],
    }));
  }

  handleAvailablesFightersDisplay() {
    const { fighters, selectedFighters } = this.state;
    const fightersDisplay = fighters
      .filter((fighter) => !selectedFighters.includes(fighter))
      .map((fighter) => (
        <li key={fighter.fighter_id}>
          <button
            type="button"
            onClick={() => this.handleFighterSelect(fighter)}
          >
            {fighter.name}
          </button>
        </li>
      ));
    return fightersDisplay;
  }
  handleSelectedFightersDisplay() {
    const { selectedFighters } = this.state;
    return selectedFighters.map((fighter) => (
      <li key={`selected${fighter.fighter_id}`}>
        <button
          type="button"
          onClick={() => this.handleSelectedFightersUnselect(fighter)}
        >
          {fighter.name}
        </button>
      </li>
    ));
  }
  handleSelectedFightersUnselect(fighter) {
    const fighterToRemove = fighter;
    this.setState((prevState) => ({
      selectedFighters: prevState.selectedFighters.filter(
        (fighter) => fighter !== fighterToRemove
      ),
    }));
  }
  handleContext() {
    this.context.battle(this.state.selectedFighters, this.state.currentQuest);
  }
  render() {
    if (this.state.currentQuest) {
      console.log(this.state.currentQuest);
      console.log(this.state.currentQuest.nbFighter);
    }

    console.log(this.state.selectedFighters);
    return (
      <>
        <main>
          <header className="header--main">
            <h2>Challenge</h2>
          </header>
          {!this.state.fight && (
            <section className="quest--container">
              <h3>Select a quest</h3>
              {this.state.quests.map((quest, index) => (
                <div key={`quest${index}`} className="arena--group">
                  <h4>{quest.title}</h4>
                  <p>{quest.desc}</p>
                  <div>
                    <p>Number of fighters allowed</p>
                    <p>{quest.nbFighter}</p>
                  </div>
                  <div>
                    <p>Rewards</p>
                    <ul>
                      <li>{quest.gold}</li>
                      <li>{quest.xp}</li>
                    </ul>
                  </div>

                  <button onClick={() => this.handleQuest(index)} type="button">
                    Join
                  </button>
                </div>
              ))}
            </section>
          )}

          {this.state.fight && (
            <section className="arena--container">
              <h3>You need one character to add</h3>
              <div className="arena--group">
                <p>Your fighters :</p>
                <ul>{this.handleAvailablesFightersDisplay()}</ul>
                <p>Selected fighters :</p>
                <ul>{this.handleSelectedFightersDisplay()}</ul>
                {this.state.currentQuest &&
                  this.state.currentQuest.nbFighter ===
                    this.state.selectedFighters.length && (
                    <Link
                      to="/battle"
                      onClick={this.handleContext}
                      className="header--main"
                    >
                      Join
                    </Link>
                  )}
              </div>
              <button type="button" onClick={this.handleQuest}>
                Go back
              </button>
            </section>
          )}
        </main>
      </>
    );
  }
}
