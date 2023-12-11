import { Component } from "react";
import template from "../../src/assets/blocking-old-karate.jpg";
import { UserContext } from "../context/UserContext";

export default class CardTemplate extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      cardName: null,
      type: null,
      effects: {},
      conditions: {},
    };
    this.conditionsImages = [
      "mustEnemyAdj",
      "mustEnemyAxial",
      "mustEnemyDiag",
      "needEarth",
      "needFire",
      "needWind",
      "needWater",
      "notEnemyAxial",
      "notAllyAdj",
      "notDiag",
      "notEarth",
      "notEnemyAdj",
      "notFire",
      "notWater",
      "notWind",
    ];
    this.effectsImages = [
      "addEarth",
      "addFire",
      "addWater",
      "addWind",
      "attack",
      "move",
    ];
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cardId !== this.props.cardId) {
      this.fetchCard();
    }
  }
  fetchCard() {
    fetch(`http://localhost:3000/api/cards/${this.props.cardId}`)
      .then((response) => response.json())
      .then((cardDetails) => {
        this.setState({
          cardName: cardDetails.name,
          type: cardDetails.type,
          effects: { ...cardDetails.effects },
          conditions: { ...cardDetails.conditions },
        });
      })
      .catch((error) => {
        this.context.logout();
        console.error("Cannot find card's details.", error);
      });
  }
  componentDidMount() {
    this.fetchCard();
  }

  conditionParser(condition) {
    let conditionParsed = {};
    switch (condition[1]) {
      case "adjoiningEnemy":
        conditionParsed = {
          src: this.conditionsImages[0],
          alt: "Must adjoining enemy",
        };
        break;
      case "diagonalEnemy":
        conditionParsed = {
          src: this.conditionsImages[2],
          alt: "Diagonal enemy",
        };
        break;
      case "requiredTokenFire":
        conditionParsed = {
          src: this.conditionsImages[4],
          alt: "Required token fire",
        };
        break;
      case "notAdjoiningEnemy":
        conditionParsed = {
          src: this.conditionsImages[11],
          alt: "Not adjoining enemy",
        };
        break;
    }

    return conditionParsed;
  }

  effectParser(effect) {
    let effectParsed = {};
    if (effect[0] === "attack" || effect[0] === "move") {
      switch (effect[0]) {
        case "attack":
          effectParsed = {
            src: this.effectsImages[4],
            alt: `Attack for ${effect[1]} damage`,
          };
          break;
        case "move":
          effectParsed = {
            src: this.effectsImages[5],
            alt: `Move for ${effect[1]}`,
          };
          break;
      }
    } else {
      switch (effect[1]) {
        case "addTokenEarth":
          effectParsed = {
            src: this.effectsImages[0],
            alt: "Generate an earth token",
          };
          break;

        case "addTokenFire":
          effectParsed = {
            src: this.effectsImages[1],
            alt: "Generate a fire token",
          };
          break;
        case "addTokenWater":
          effectParsed = {
            src: this.effectsImages[2],
            alt: "Generate a water token",
          };
          break;
        case "addTokenWind":
          effectParsed = {
            src: this.effectsImages[3],
            alt: "Generate a wind token",
          };
          break;
      }
    }

    return effectParsed;
  }

  handleConditionsDisplay() {
    const conditionsArray = Object.entries(this.state.conditions);

    const bubbleClasses = [
      "top-mid",
      "top-mid-left",
      "top-mid-right",
      "top-back-left",
      "top-back-right",
    ];

    if (conditionsArray.length > 0) {
      return conditionsArray.map((condition, index) => {
        const { src, alt } = this.conditionParser(condition);
        return (
          <li key={index} className={`bubble ${bubbleClasses[index]}`}>
            <img title={alt} src={`/assets/conditions/${src}.png`} alt={alt} />
          </li>
        );
      });
    }
  }

  handleEffectsDisplay() {
    const effectsArray = Object.entries(this.state.effects);

    const bubbleClasses = [
      "bottom-mid",
      "bottom-mid-left",
      "bottom-mid-right",
      "bottom-back-left",
      "bottom-back-right",
    ];

    if (effectsArray.length > 0) {
      return effectsArray.map((effect, index) => {
        const { src, alt } = this.effectParser(effect);
        return (
          <li key={index} className={`bubble ${bubbleClasses[index]}`}>
            <img title={alt} src={`/assets/effects/${src}.png`} alt={alt} />
            {effect[0] === "attack" && (
              <span title={alt} className="card-number">
                {effect[1]}
              </span>
            )}
            {effect[0] === "move" && (
              <span title={alt} className="card-number">
                {effect[1]}
              </span>
            )}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <>
        <div className="card-template-container">
          <header>
            <h3>{this.state.cardName}</h3>
          </header>
          <div className="card-template-content">
            <div className="card-template-img-container">
              <img src={template} alt={`${this.state.cardName} image`}></img>
            </div>
            <ul>{this.handleConditionsDisplay()}</ul>
          </div>
          <ul>{this.handleEffectsDisplay()}</ul>
        </div>
      </>
    );
  }
}
