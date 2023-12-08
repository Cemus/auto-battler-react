import { Component } from "react";
import getUserData from "../utils/other/getUserData";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import CardTemplate from "../components/CardTemplate";

export default class Party extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      characterSelected: null,
      deck: [],
      cardSlots: [null, null, null, null, null],
      currentlyDragged: null,
      isSubmitting: false,
    };
    console.log(this.state.cardSlots);
  }

  deckCreator = () => {
    return this.state.deck.map((card, index) => (
      <li
        id={`card${card}`}
        key={`card${index}`}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, index)}
      >
        <CardTemplate cardId={card} small={true} />
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
        {card ? card : "[empty slot]"}
      </li>
    ));
  };

  handleDragStart = (e) => {
    this.setState({ currentlyDragged: e.target.id });

    console.log(this.state.currentlyDragged);
  };

  handleDragOver = (e) => {
    e.preventDefault();
    console.log(this.state.currentlyDragged);
    console.log("dragover");
  };

  handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const regexDigitsOnly = /\d/g;
    const regexTextOnly = /\D+/g;
    if (this.state.characterSelected) {
      const currentlyDragged = this.state.currentlyDragged;
      console.log(this.state.currentlyDragged);
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
        if (thisSlotCard) {
          const slotDragged = regexDigitsOnly.exec(currentlyDragged);
          const newCardSlots = [...this.state.cardSlots];
          newCardSlots[slotIndex] = this.state.cardSlots[slotDragged];
          newCardSlots[slotDragged] = thisSlotCard;
          this.setState({
            cardSlots: newCardSlots,
            currentlyDragged: null,
          });
        } else {
          const slotDragged = regexDigitsOnly.exec(currentlyDragged);
          const newCardSlots = [...this.state.cardSlots];
          const newDeck = [...this.state.deck];

          newDeck.push(newCardSlots[slotDragged]);
          this.setState({
            deck: newDeck,
          });

          newCardSlots[slotDragged] = null;
          this.setState({
            cardSlots: newCardSlots,
            currentlyDragged: null,
          });
        }
      }
    }
  };

  handleSlotsValidation = () => {
    const { characterSelected, cardSlots } = this.state;
    const modifications = {
      fighterId: characterSelected.fighter_id,
      cardSlots: cardSlots,
    };
    const token = localStorage.getItem("token");
    this.setState({
      isSubmitting: true,
    });
    fetch("http://localhost:3000/api/character_change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(modifications),
    })
      .then((response) => {
        if (response.status === 401) {
          this.context.logout();
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        this.context.updateUser();
      })
      .catch((error) => {
        console.error("Error during the request", error);
        if (error.message === "401") {
          this.context.logout();
        }
      })
      .finally(() => {
        this.setState({
          isSubmitting: false,
        });
      });
  };

  handleCharacterChange(fighterName) {
    const selectedFighter = this.state.user.fighters.find(
      (fighter) => fighter.name === fighterName
    );
    this.setState({ characterSelected: selectedFighter });
    const updatedCardSlots = [
      selectedFighter.slot_1,
      selectedFighter.slot_2,
      selectedFighter.slot_3,
      selectedFighter.slot_4,
      selectedFighter.slot_5,
    ];

    this.setState({ cardSlots: updatedCardSlots });
  }

  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    this.setState({ user: userInfos });

    userInfos.cards.map((card) => {
      if (!card.is_used)
        this.setState((prevState) => ({
          deck: [...prevState.deck, card.card_id],
        }));
    });
  }

  render() {
    const { user } = this.context;
    if (!user) {
      return <Navigate to="/login" />;
    }
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
                    <li key={fighter.fighter_id}>
                      <button
                        type="button"
                        onClick={() => this.handleCharacterChange(fighter.name)}
                      >
                        {fighter.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </section>
            {this.state.characterSelected && (
              <section className="cardSequence">
                <header>
                  <h2>Card Sequences</h2>
                </header>
                <ol>{this.cardSlotsCreator()}</ol>
                {!this.state.isSubmitting && (
                  <button type="button" onClick={this.handleSlotsValidation}>
                    Validate
                  </button>
                )}
              </section>
            )}
          </article>
          <aside>
            <header>
              <h2>Deck</h2>
            </header>
            <ul
              className="deck"
              onDrop={(e) => this.handleDrop(e)}
              draggable={false}
              onDragOver={(e) => this.handleDragOver(e)}
            >
              {this.deckCreator()}
            </ul>
          </aside>
        </main>
      </>
    );
  }
}
