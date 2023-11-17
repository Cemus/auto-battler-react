import {
  drawSquare,
  drawCircle,
  drawTriangle,
  drawCross,
} from "../utils/draw.js";

class Player {
  constructor(isPlayer, name, job, gridX, gridY, stats) {
    this.isPlayer = isPlayer;
    this.name = name;
    this.job = job;
    this.gridX = gridX;
    this.gridY = gridY;
    this.stats = stats;
    this.hp = this.stats.maxHp;
    this.behaviourStates = {
      currentState: "IDLE",
      target: null,
      hasAttacked: false,
      hasMoved: false,
    };
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
    switch (this.job) {
      case "warrior":
        drawTriangle(x, y, drawingColor, ctx);
        break;
      case "mage":
        drawCircle(x, y, drawingColor, ctx);
        break;
      case "archer":
        drawCross(x, y, drawingColor, ctx);
        break;
      default:
        drawSquare(x, y, drawingColor, ctx);
        break;
    }
  }
}

export { Player };
