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
      effectPower: null,
      generateToken: [],
      conditions: {},
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/cards/${this.props.cardId}`)
      .then((response) => response.json())
      .then((cardDetails) => {
        console.log(cardDetails);
        this.setState({
          cardName: cardDetails.name,
          type: cardDetails.type,
          effectPower: cardDetails.effectPower,
          requiredToken: cardDetails,
          generateToken: cardDetails.generateToken,
          conditions: { ...cardDetails.conditions },
        });
      })
      .catch((error) => {
        this.context.logout();
        console.error("Cannot find card's details.", error);
      });
  }

  conditionParser(condition) {
    let conditionParsed;
    console.log(condition[0]);
    switch (condition[0]) {
      case "enemyDistance":
        conditionParsed = `When fighter is ${condition[1]} next to the target.`;
        break;
    }
    return conditionParsed;
  }

  handleConditionsDisplay() {
    console.log(this.state.conditions);
    const conditionsArray = Object.entries(this.state.conditions);

    if (conditionsArray.length > 0) {
      return conditionsArray.map((condition, index) => (
        <li key={index}>{this.conditionParser(condition)}</li>
      ));
    }
  }

  render() {
    return (
      <>
        {this.state.cardName && !this.props.small ? (
          <div className="card-template">
            <header>
              <h3>{this.state.cardName}</h3>
            </header>
            <img src={template} alt={`${this.state.cardName} image`}></img>
            <ul>{this.handleConditionsDisplay()}</ul>
            <span>
              <p>{this.state.effectPower}</p>
            </span>
          </div>
        ) : (
          <div className="card-template-small">
            <header>
              <h3>{this.state.cardName}</h3>
            </header>
            <img src={template} alt={`${this.state.cardName} image`}></img>
            <ul>{this.handleConditionsDisplay()}</ul>
            <span>
              <p>{this.state.effectPower}</p>
            </span>
          </div>
        )}
      </>
    );
  }
}
