import { Component } from "react";
import { updateEnemyBehavior } from "../entities/enemies.js";
import PropTypes from "prop-types";

import { playersList, enemiesList } from "../utils/charactersCreation.js";

class GameLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerIndex: 0,
    };
  }
  nextPlayer() {
    this.setState((prevState) => ({
      currentPlayerIndex: (prevState.currentPlayerIndex + 1) % enemiesList,
    }));
    enemiesList[this.state.currentPlayerIndex].hasAttacked = false;
  }

  gameLoop() {
    this.props.ctx.clearRect(
      0,
      0,
      this.props.canvas.width,
      this.props.canvas.height
    );
    this.props.createGrid(this.props.ctx);
    if (this.state.currentPlayerIndex < enemiesList.length) {
      const currentPlayer = enemiesList[this.state.currentPlayerIndex];
      playersList.forEach((player) => {
        if (player !== currentPlayer) {
          player.sprite();
        }
      });
      enemiesList.forEach((enemy) => {
        if (enemy !== currentPlayer) {
          enemy.sprite();
        }
      });
      /*     console.log(currentPlayer); */
      updateEnemyBehavior(
        currentPlayer,
        playersList,
        enemiesList,
        () => this.nextPlayer
      );
    } else {
      this.setState({ currentPlayerIndex: 0 });
    }

    setTimeout(() => {
      requestAnimationFrame(() => this.gameLoop());
    }, 100);
  }
  render() {
    return false;
  }
}

GameLoop.propTypes = {
  ctx: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  createGrid: PropTypes.object.isRequired,
};

export default GameLoop;
