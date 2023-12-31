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
      currentFighter: null,
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
          enemies: ["beast", "beast", "beast"],
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

  handleAvailablesFightersDisplay() {
    const { fighters, selectedFighters } = this.state;

    const availableFighters = fighters.filter(
      (fighter) =>
        !selectedFighters.some(
          (selectedFighter) => selectedFighter.fighter_id === fighter.fighter_id
        )
    );

    const fightersDisplay = availableFighters.map((fighter) => (
      <li key={fighter.fighter_id}>
        <button type="button" onClick={() => this.handleFighterSelect(fighter)}>
          {fighter.name}
        </button>
      </li>
    ));

    return fightersDisplay;
  }
  handleFighterSelect(fighter) {
    this.setState({
      currentFighter: fighter,
    });
  }
  handleSelectedFightersUnselect(fighter) {
    const fighterToRemove = fighter;
    this.setState((prevState) => ({
      selectedFighters: prevState.selectedFighters.filter(
        (fighter) => fighter !== fighterToRemove
      ),
    }));
  }
  handleSelectedFightersDisplay() {
    const { selectedFighters } = this.state;
    return selectedFighters.map((fighter) => (
      <li key={`selected${fighter.fighter_id}`}>
        <button
          type="button"
          onClick={() => this.handleSelectedFightersUnselect(fighter)}
        >
          {`${fighter.name} (${fighter.grid_x}-${fighter.grid_y})`}
        </button>
      </li>
    ));
  }

  handleContext() {
    this.context.battle(this.state.selectedFighters, this.state.currentQuest);
  }
  handleGridDisplay() {
    const gridElements = [];
    for (let i = 4; i < 8; i++) {
      gridElements.push(
        <div key={`row-${i}`} className="formation--row" data-coordinate-x={i}>
          {this.generateSquareElements(i)}
        </div>
      );
    }

    return gridElements;
  }
  generateSquareElements(rowIndex) {
    const { selectedFighters } = this.state;

    const squareElements = [];
    for (let j = 0; j < 8; j++) {
      const isOccupied = selectedFighters.some(
        (fighter) => fighter.grid_x === rowIndex && fighter.grid_y === j
      );

      squareElements.push(
        <div
          key={`square-${rowIndex}-${j}`}
          className={
            isOccupied
              ? "formation--square formation--square-occupied"
              : "formation--square"
          }
          data-coordinate-y={j}
          onClick={() => this.handleFighterConfirmed(rowIndex, j)}
        >
          {`${rowIndex}-${j}`}
        </div>
      );
    }

    return squareElements;
  }
  handleFighterConfirmed(gridX, gridY) {
    this.setState((prevState) => {
      const updatedCurrentFighter = {
        ...prevState.currentFighter,
        grid_x: gridY,
        grid_y: gridX,
      };

      return {
        currentFighter: null,
        selectedFighters: [
          ...prevState.selectedFighters,
          updatedCurrentFighter,
        ],
      };
    });
  }
  render() {
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
                <p>Select your fighters :</p>
                <ul>{this.handleAvailablesFightersDisplay()}</ul>
                {this.state.currentFighter && (
                  <>
                    <p>
                      <span>
                        {this.state.currentFighter.name}
                        {"'s "}
                      </span>
                      formation :
                    </p>
                    <div className="formation--container">
                      {this.handleGridDisplay()}
                    </div>
                  </>
                )}

                {this.state.selectedFighters.length > 0 && (
                  <div>
                    <p>Selected Fighters :</p>
                    <ul>{this.handleSelectedFightersDisplay()}</ul>
                  </div>
                )}
                {this.state.currentQuest &&
                  this.state.selectedFighters.length > 0 &&
                  this.state.currentQuest.nbFighter >=
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
