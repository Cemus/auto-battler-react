import {
  /*   drawSquare, */
  drawCircle,
  /*   drawTriangle,
  drawCross, */
} from "../utils/game/draw.js";

class Player {
  constructor(isPlayer, name, gridX, gridY, stats, cards) {
    this.isPlayer = isPlayer;
    this.name = name;
    this.gridX = gridX;
    this.gridY = gridY;
    this.stats = stats;
    this.cards = cards;
    this.hp = this.stats.maxHp;
    this.behaviourStates = {
      currentState: "IDLE",
      target: null,
      hasAttacked: false,
      hasMoved: false,
    };
    this.tokens = [];
  }
  sprite(ctx) {
    let drawingColor = this.isPlayer ? "blue" : "red";
    if (this.hp <= 0) {
      drawingColor = "gray";
    }
    const cellSize = 64;
    const cellSpacing = 1;
    const x = this.gridX * (cellSize * cellSpacing) + cellSize / 2;
    const y = this.gridY * (cellSize * cellSpacing) + cellSize / 2;

    drawCircle(x, y, drawingColor, ctx);
  }
}

export { Player };
