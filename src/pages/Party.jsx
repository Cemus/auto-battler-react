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
      fighters: [],
      isSubmitting: false,
    };
  }

  deckCreator = () => {
    return this.state.deck.map((card, index) => (
      <li
        id={`card${card}`}
        key={`card${index}`}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, `card${card}`)}
        onDrop={(e) => this.handleDrop(e, `card${index}`)}
      >
        <CardTemplate key={`cardTemplate${index}`} cardId={card} />
      </li>
    ));
  };
  cardSlotsCreator = () => {
    return this.state.cardSlots.map((card, index) => (
      <li
        id={`slot${index}`}
        key={index}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, `slot${index}`)}
        onDragOver={(e) => this.handleDragOver(e)}
        onDrop={(e) => this.handleDrop(e, `slot${index}`)}
      >
        {card ? card : "[empty slot]"}
      </li>
    ));
  };

  handleDragStart = (e, id) => {
    this.setState({ currentlyDragged: id });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e, droppedOn) => {
    e.preventDefault();
    const regexDigitsOnly = /\d+/;
    const regexTextOnly = /\D+/;

    if (this.state.characterSelected) {
      const currentlyDragged = this.state.currentlyDragged;
      const draggedElementTextOnly = regexTextOnly.exec(
        currentlyDragged.toString()
      )[0];
      const draggedElementDigitOnly = regexDigitsOnly.exec(
        currentlyDragged.toString()
      )[0];

      const droppedOnDigitOnly = regexDigitsOnly.exec(droppedOn)[0];
      const droppedOnTextOnly = regexTextOnly.exec(droppedOn)[0].toString();

      if (draggedElementTextOnly === "card" && droppedOnTextOnly === "slot") {
        //Put card in a slot
        const cardId = parseInt(
          regexDigitsOnly.exec(draggedElementDigitOnly)[0]
        );
        const newDeck = this.state.deck.filter((card) => card !== cardId);
        const newCardSlots = [...this.state.cardSlots];
        newCardSlots[droppedOnDigitOnly] = cardId;

        this.setState({
          deck: newDeck,
          cardSlots: newCardSlots,
          currentlyDragged: null,
        });
      } else {
        if (draggedElementTextOnly === "slot") {
          //Switch slots
          if (droppedOnTextOnly === "slot") {
            const currentlyDraggedContent =
              this.state.cardSlots[droppedOnDigitOnly];
            const slotDragged = parseInt(
              regexDigitsOnly.exec(currentlyDragged)[0]
            );

            const newCardSlots = [...this.state.cardSlots];
            newCardSlots[droppedOnDigitOnly] =
              this.state.cardSlots[slotDragged];
            newCardSlots[slotDragged] = currentlyDraggedContent;

            this.setState({
              cardSlots: newCardSlots,
              currentlyDragged: null,
            });
          } else if (droppedOnTextOnly === "card") {
            //Put card back in the deck
            const currentlyDraggedContent =
              this.state.cardSlots[draggedElementDigitOnly];

            const slotDragged = parseInt(
              regexDigitsOnly.exec(currentlyDragged)[0]
            );

            const newCardSlots = [...this.state.cardSlots];
            const newDeck = [...this.state.deck];
            newDeck.push(currentlyDraggedContent);

            newCardSlots[slotDragged] = this.state.cardSlots[null];
            this.setState({
              cardSlots: newCardSlots,
              deck: newDeck,
              currentlyDragged: null,
            });
          }
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

    userInfos.cards.forEach((card) => {
      if (!card.is_used) {
        this.setState((prevState) => ({
          deck: [...prevState.deck, card.card_id],
        }));
      }
    });

    userInfos.fighters.forEach((fighter) => {
      this.setState(
        (prevState) => ({
          fighters: [...prevState.fighters, fighter],
        }),
        () => {
          this.handleCharacterChange(this.state.fighters[0].name);
        }
      );
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
                {this.state.fighters &&
                  this.state.fighters.map((fighter) => (
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
                  <h2>Card Sequence</h2>
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
