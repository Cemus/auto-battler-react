import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";
import getUserData from "../utils/other/getUserData";

export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      deck: [],
      cardSlots: [null, null, null, null, null],
      currentlyDragged: null,
    };
    console.log(this.state.cardSlots);
  }
  getToken = () => {};

  deckCreator = () => {
    return this.state.deck.map((card, index) => (
      <li
        id={`card${index}`}
        key={`card${index}`}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, index)}
      >
        {card}
      </li>
    ));
  };
  cardSlotsCreator = () => {
    return this.state.cardSlots.map((card, index) => (
      <li
        id={`slot${index}`}
        key={index}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, index)}
        onDragOver={(e) => this.handleDragOver(e, index)}
        onDrop={(e) => this.handleDrop(e, index)}
      >
        {card ? card : "[emplacement vide]"}
      </li>
    ));
  };

  handleDragStart = (e) => {
    if (this.state.currentlyDragged === null) {
      this.setState({ currentlyDragged: e.target.id });
    }
  };

  handleDragOver = (e) => {
    e.preventDefault();
    console.log("dragover");
  };

  handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const regexDigitsOnly = /\d/g;
    const regexTextOnly = /\D+/g;
    const currentlyDragged = this.state.currentlyDragged;
    if (regexTextOnly.exec(currentlyDragged)[0] === "card") {
      const cardIndex = regexDigitsOnly.exec(currentlyDragged);
      const newDeck = [...this.state.deck];
      const draggedCard = newDeck[cardIndex];
      newDeck.splice(cardIndex, 1);

      const newCardSlots = [...this.state.cardSlots];
      newCardSlots[slotIndex] = draggedCard;

      this.setState({
        deck: newDeck,
        cardSlots: newCardSlots,
        currentlyDragged: null,
      });
    } else {
      const thisSlotCard = this.state.cardSlots[slotIndex];
      const slotDragged = regexDigitsOnly.exec(currentlyDragged);
      const newCardSlots = [...this.state.cardSlots];
      newCardSlots[slotIndex] = this.state.cardSlots[slotDragged];
      newCardSlots[slotDragged] = thisSlotCard;
      this.setState({
        cardSlots: newCardSlots,
        currentlyDragged: null,
      });
    }
  };

  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    console.log(userInfos);
    this.setState({ user: userInfos });
    userInfos.cards.map((card) => {
      this.setState((prevState) => ({
        deck: [...prevState.deck, card.card_id],
      }));
    });
  }

  render() {
    return (
      <>
        <main className="main--party">
          <header className="header--main">
            <h2>Party!</h2>
          </header>
          <article className="article--party">
            <section className="characterSelection">
              <header>
                <h2>Select a Character</h2>
              </header>
              <ul>
                {this.state.user?.fighters &&
                  this.state.user.fighters.map((fighter) => (
                    <li key={fighter.fighter_id}>{fighter.name}</li>
                  ))}
              </ul>
            </section>
            <section className="cardSequence">
              <header>
                <h2>Card Sequences</h2>
              </header>
              <ol>{this.cardSlotsCreator()}</ol>
            </section>
          </article>
          <aside>
            <header>
              <h2>Deck</h2>
            </header>
            <ul>{this.deckCreator()}</ul>
          </aside>
        </main>
        <GlowingParticles />
      </>
    );
  }
}
