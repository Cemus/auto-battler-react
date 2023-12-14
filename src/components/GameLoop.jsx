import React, { Component } from "react";
import { updateBehaviour } from "../ai/updateBehaviour.js";
import { createEntities } from "../utils/game/charactersCreation.js";
import AfterBattle from "./AfterBattle.jsx";

export default class GameLoop extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.numCols = 8;
    this.numRows = 8;
    this.cellSize = 64;
    this.gridSize = this.numCols * this.numRows;
    const { playersList, enemiesList } = createEntities(
      this.props.players,
      this.props.enemies
    );
    this.playersList = playersList;
    this.enemiesList = enemiesList;
    console.log(playersList);
    console.log(enemiesList);
    this.state = {
      ctx: null,
      currentPlayerIndex: 0,
      allEntitiesList: [...this.playersList, ...this.enemiesList],
      victory: null,
    };
    this.gameLoop = this.gameLoop.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
  }

  nextPlayer() {
    this.setState((prevState) => ({
      currentPlayerIndex:
        (prevState.currentPlayerIndex + 1) % this.state.allEntitiesList.length,
    }));
    this.setState((prevState) => {
      const updatedEntitiesList = [...prevState.allEntitiesList];
      updatedEntitiesList[prevState.currentPlayerIndex].hasAttacked = false;
      return {
        allEntitiesList: updatedEntitiesList,
      };
    });
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

  checkIfSomebodyWon(updatedPlayerList, updatedEnemiesList) {
    if (updatedPlayerList.length === 0 || updatedEnemiesList.length === 0) {
      let tempVictory = null;
      if (updatedPlayerList.length === 0) {
        tempVictory = false;
      }
      if (updatedEnemiesList.length === 0) {
        tempVictory = true;
      }
      setTimeout(() => {
        this.setState({ victory: tempVictory });
        clearInterval(this.gameLoopInterval);
        return;
      }, 1000);
    }
  }

  gameLoop() {
    this.state.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.createGrid(this.state.ctx);

    const updatedPlayerList = this.playersList.filter(
      (entity) => entity.hp > 0
    );
    const updatedEnemiesList = this.enemiesList.filter(
      (entity) => entity.hp > 0
    );

    this.checkIfSomebodyWon(updatedPlayerList, updatedEnemiesList);

    console.log(this.state.allEntitiesList);
    if (this.state.currentPlayerIndex < this.state.allEntitiesList.length) {
      const currentPlayer =
        this.state.allEntitiesList[this.state.currentPlayerIndex];
      this.state.allEntitiesList.forEach((entity) => {
        if (entity !== currentPlayer) {
          entity.sprite(this.state.ctx);
        }
      });
      updateBehaviour(
        currentPlayer,
        updatedPlayerList,
        updatedEnemiesList,
        this.state.allEntitiesList,
        this.nextPlayer,
        this.gridSize,
        this.canvasRef,
        this.state.ctx
      );
    } else {
      this.setState({ currentPlayerIndex: 0 });
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;
    this.createGrid(ctx);
    this.setState({ ctx }, () => {
      this.gameLoopInterval = setInterval(this.gameLoop, 120);
    });
  }
  componentWillUnmount() {
    clearInterval(this.gameLoopInterval);
  }
  render() {
    console.log(this.props);
    if (this.state.victory === null) {
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
    } else {
      return <AfterBattle victory={this.state.victory} />;
    }
  }
}
