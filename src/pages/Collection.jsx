import { Component } from "react";
import { Navigate } from "react-router-dom";
import CardTemplate from "../components/CardTemplate";
import getUserData from "../utils/other/getUserData";
import { UserContext } from "../context/UserContext";

export default class Collection extends Component {
  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      user: null,
      deck: [],
    };
  }
  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    this.setState({ user: userInfos });

    userInfos.cards.map((card) => {
      console.log(card);
      this.setState((prevState) => ({
        deck: [...prevState.deck, card.card_id],
      }));
    });
  }

  handleCardDisplay() {
    return this.state.deck.map((card, index) => (
      <li key={index}>
        <CardTemplate key={card} cardId={card} />
      </li>
    ));
  }
  render() {
    const { user } = this.context;
    console.log(this.state.deck);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return (
      <main>
        <header className="header--main">
          <h2>Your collection</h2>
        </header>
        <ol className="collection--card-container">
          {this.handleCardDisplay()}
        </ol>
      </main>
    );
  }
}
