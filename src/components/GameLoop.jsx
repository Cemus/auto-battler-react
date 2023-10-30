import React, { Component } from "react";
import { updateEnemyBehavior } from "../entities/enemies.js";

import { playersList, enemiesList } from "../utils/charactersCreation.js";

class GameLoop extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.numCols = 8;
    this.numRows = 8;
    this.cellSize = 64;
    this.gridSize = this.numCols * this.numRows;
    this.state = {
      ctx: null,
      currentPlayerIndex: 0,
    };
    this.gameLoop = this.gameLoop.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
  }
  nextPlayer() {
    console.log("hi");
    this.setState((prevState) => ({
      currentPlayerIndex:
        (prevState.currentPlayerIndex + 1) % enemiesList.length,
    }));
    console.log("hi");
    enemiesList[this.state.currentPlayerIndex].hasAttacked = false;
  }
  createGrid(ctx) {
    const cellColor = "black";
    const cellSpacing = 1;

    ctx.strokeStyle = "white";
    for (let i = 0; i <= this.numCols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.cellSize, 0);
      ctx.lineTo(i * this.cellSize, this.numRows * this.cellSize);
      ctx.stroke();
    }

    for (let i = 0; i <= this.numRows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * this.cellSize);
      ctx.lineTo(this.numCols * this.cellSize, i * this.cellSize);
      ctx.stroke();
    }

    for (let col = 0; col < this.numCols; col++) {
      for (let row = 0; row < this.numRows; row++) {
        ctx.fillStyle = cellColor;
        ctx.fillRect(
          col * this.cellSize + cellSpacing,
          row * this.cellSize + cellSpacing,
          this.cellSize - 2 * cellSpacing,
          this.cellSize - 2 * cellSpacing
        );
      }
    }
  }

  gameLoop() {
    this.state.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.createGrid(this.state.ctx);
    if (this.state.currentPlayerIndex < enemiesList.length) {
      const currentPlayer = enemiesList[this.state.currentPlayerIndex];
      playersList.forEach((player) => {
        if (player !== currentPlayer) {
          player.sprite(this.state.ctx);
        }
      });
      enemiesList.forEach((enemy) => {
        if (enemy !== currentPlayer) {
          enemy.sprite(this.state.ctx);
        }
      });
      /*     console.log(currentPlayer); */
      updateEnemyBehavior(
        currentPlayer,
        playersList,
        enemiesList,
        this.nextPlayer,
        this.gridSize,
        this.canvasRef,
        this.state.ctx
      );
      console.log(this.state.currentPlayerIndex);
    } else {
      this.setState({ currentPlayerIndex: 0 });
    }

    setTimeout(() => {
      requestAnimationFrame(this.gameLoop);
    }, 250);
  }
  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;
    this.createGrid(ctx);
    this.setState({ ctx }, () => {
      this.gameLoop();
    });
  }
  componentDidUpdate() {}
  render() {
    return (
      <>
        <canvas
          className="game-canvas"
          ref={this.canvasRef}
          width={this.canvasRef.width}
          height={this.canvasRef.height}
        ></canvas>
      </>
    );
  }
}

export default GameLoop;
