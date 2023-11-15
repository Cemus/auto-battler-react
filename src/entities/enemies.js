import {
  drawSquare,
  drawCircle,
  drawTriangle,
  drawCross,
} from "../utils/draw.js";

class Enemy {
  constructor(isPlayer, name, job, gridX, gridY) {
    this.isPlayer = isPlayer;
    this.name = name;
    this.job = job;
    this.gridX = gridX;
    this.gridY = gridY;
    this.stats = { atk: 5, def: 5, agi: 3 };
    this.behaviourStates = {
      currentState: "IDLE",
      target: null,
      hasAttacked: false,
      hasMoved: false,
    };
  }
  sprite(ctx) {
    const cellSize = 64;
    const cellSpacing = 1;
    const x = this.gridX * (cellSize * cellSpacing) + cellSize / 2;
    const y = this.gridY * (cellSize * cellSpacing) + cellSize / 2;
    switch (this.job) {
      case "warrior":
        drawTriangle(x, y, "red", ctx);
        break;
      case "mage":
        drawCircle(x, y, "red", ctx);
        break;
      case "archer":
        drawCross(x, y, "red", ctx);
        break;
      default:
        drawSquare(x, y, "red", ctx);
        break;
    }
  }
}

export { Enemy };
