import { Component } from "react";
import template from "../../src/assets/blocking-old-karate.jpg";

export default class CardTemplate extends Component {
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
          generateToken: cardDetails.generateToken,
          conditions: { ...cardDetails.conditions },
        });
      })
      .catch((error) => console.error("Cannot find card's details.", error));
  }

  handleConditionsDisplay() {
    console.log(this.state.conditions);
    const conditionsArray = Object.entries(this.state.conditions);

    if (conditionsArray.length > 0) {
      return conditionsArray.map((condition, index) => (
        <li key={index}>{condition}</li>
      ));
    }
  }

  render() {
    return (
      <>
        {this.state.cardName && (
          <div className="card-template">
            <header>
              <h3>{this.state.cardName}</h3>
            </header>
            <img src={template} alt={`${this.state.cardName} image`}></img>
            <ul>{this.handleConditionsDisplay()}</ul>
          </div>
        )}
      </>
    );
  }
}
