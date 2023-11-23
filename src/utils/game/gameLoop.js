import { updateEnemyBehavior } from "../my-react-vite/src/entities/enemies.js";
import {
  playersList,
  enemiesList,
} from "../my-react-vite/src/utils/charactersCreation.js";
import "./styles/style.css";
import { canvas, createGrid, ctx } from "../my-react-vite/src/utils/canvas.js";

let currentPlayerIndex = 0;
function nextPlayer() {
  currentPlayerIndex++;
  if (currentPlayerIndex >= enemiesList.length) {
    currentPlayerIndex = 0;
  }
  enemiesList[currentPlayerIndex].hasAttacked = false;
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createGrid(ctx);
  if (currentPlayerIndex < enemiesList.length) {
    const currentPlayer = enemiesList[currentPlayerIndex];
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
    updateEnemyBehavior(currentPlayer, playersList, enemiesList, nextPlayer);
  } else {
    currentPlayerIndex = 0;
  }

  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 100);
}

gameLoop();
