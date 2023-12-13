import { Component } from "react";
import getUserData from "../utils/other/getUserData";
import { UserContext } from "../context/UserContext";

export default class Arena extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fighters: [],
      selectedFighters: {
        oneVersus: {
          selectedFighter1: null,
        },
        twoVersus: {
          selectedFighter1: null,
          selectedFighter2: null,
        },
        threeVersus: {
          selectedFighter1: null,
          selectedFighter2: null,
          selectedFighter3: null,
        },
      },
    };
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
  handleFighterSelect(versusKey) {
    const { fighters, selectedFighters } = this.state;
    const selectedVersus = selectedFighters[versusKey];

    const fighterOptions = fighters
      .filter(
        (fighter) => !Object.values(selectedVersus).includes(fighter.name)
      )
      .map((fighter, index) => (
        <option value={fighter.name} key={index}>
          {fighter.name}
        </option>
      ));

    fighterOptions.unshift(
      <option value="" key="none">
        --No choice--
      </option>
    );

    return fighterOptions;
  }
  handleChange = (event, versusKey, fighterKey) => {
    const { value } = event.target;

    const selectedValue = value === "" ? null : value;

    this.setState((prevState) => ({
      selectedFighters: {
        ...prevState.selectedFighters,
        [versusKey]: {
          ...prevState.selectedFighters[versusKey],
          [fighterKey]: selectedValue,
        },
      },
    }));
  };
  render() {
    return (
      <>
        <main>
          <header className="header--main">
            <h2>Arena</h2>
          </header>

          <section className="arena--container">
            <h4>Enlist in the brawl</h4>

            <form action="#">
              <div>
                <h4>1 vs 1</h4>
                <label htmlFor="oneOnOneFighterSelect">Character</label>
                <select
                  name="oneOnOneFighter"
                  id="oneOnOneFighterSelect"
                  onChange={(event) =>
                    this.handleChange(event, "oneVersus", "selectedFighter1")
                  }
                >
                  {this.state.selectedFighters.oneVersus.selectedFighter1 && (
                    <option value="">
                      {this.state.selectedFighters.oneVersus.selectedFighter1 ||
                        "--No choice--"}
                    </option>
                  )}
                  {this.handleFighterSelect("oneVersus")}
                </select>
              </div>

              <div>
                <h4>2 vs 2</h4>
                {this.state.fighters.length >= 2 ? (
                  <>
                    <label htmlFor="twoOnTwoFirstFighterSelect">
                      Character 1
                    </label>
                    <select
                      name="twoOnTwoFirstFighter"
                      id="twoOnTwoFirstFighterSelect"
                      onChange={(event) =>
                        this.handleChange(
                          event,
                          "twoVersus",
                          "selectedFighter1"
                        )
                      }
                    >
                      {this.state.selectedFighters.twoVersus
                        .selectedFighter1 && (
                        <option value="">
                          {this.state.selectedFighters.twoVersus
                            .selectedFighter1 || "--No choice--"}
                        </option>
                      )}
                      {this.handleFighterSelect("twoVersus")}
                    </select>
                    <label htmlFor="twoOnTwoSecondFighterSelect">
                      Character 2
                    </label>
                    <select
                      name="twoOnTwoSecondFighter"
                      id="twoOnTwoSecondFighterSelect"
                      onChange={(event) =>
                        this.handleChange(
                          event,
                          "twoVersus",
                          "selectedFighter2"
                        )
                      }
                    >
                      {this.state.selectedFighters.twoVersus
                        .selectedFighter2 && (
                        <option value="">
                          {this.state.selectedFighters.twoVersus
                            .selectedFighter2 || "--No choice--"}
                        </option>
                      )}
                      {this.handleFighterSelect("twoVersus")}
                    </select>
                  </>
                ) : (
                  <p>Not enough fighters</p>
                )}
              </div>

              <div>
                <h4>3 vs 3</h4>
                {this.state.fighters.length >= 3 ? (
                  <>
                    <label htmlFor="threeOnThreeFirstFighterSelect">
                      Character 1
                    </label>
                    <select
                      name="threeOnThreeeFirstFighter"
                      id="threeOnThreeFirstFighterSelect"
                      onChange={(event) =>
                        this.handleChange(
                          event,
                          "threeVersus",
                          "selectedFighter1"
                        )
                      }
                    >
                      {this.state.selectedFighters.threeVersus
                        .selectedFighter1 && (
                        <option value="">
                          {this.state.selectedFighters.threeVersus
                            .selectedFighter1 || "--No choice--"}
                        </option>
                      )}
                      {this.handleFighterSelect("threeVersus")}
                    </select>
                    <label htmlFor="threeOnThreeFirstFighterSelect">
                      Character 2
                    </label>
                    <select
                      name="threeOnThreeeFirstFighter"
                      id="threeOnThreeFirstFighterSelect"
                      onChange={(event) =>
                        this.handleChange(
                          event,
                          "threeVersus",
                          "selectedFighter2"
                        )
                      }
                    >
                      {this.state.selectedFighters.threeVersus
                        .selectedFighter2 && (
                        <option value="">
                          {this.state.selectedFighters.threeVersus
                            .selectedFighter2 || "--No choice--"}
                        </option>
                      )}
                      {this.handleFighterSelect("threeVersus")}
                    </select>
                    <label htmlFor="threeOnThreeFirstFighterSelect">
                      Character 3
                    </label>
                    <select
                      name="threeOnThreeeFirstFighter"
                      id="threeOnThreeFirstFighterSelect"
                      onChange={(event) =>
                        this.handleChange(
                          event,
                          "threeVersus",
                          "selectedFighter3"
                        )
                      }
                    >
                      {this.state.selectedFighters.threeVersus
                        .selectedFighter3 && (
                        <option value="">
                          {this.state.selectedFighters.threeVersus
                            .selectedFighter3 || "--No choice--"}
                        </option>
                      )}
                      {this.handleFighterSelect("threeVersus")}
                    </select>
                  </>
                ) : (
                  <p>Not enough fighters</p>
                )}
              </div>
            </form>
          </section>
        </main>
      </>
    );
  }
}
