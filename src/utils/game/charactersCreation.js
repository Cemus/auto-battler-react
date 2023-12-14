import { Player } from "../../entities/player";
import getEnemies from "../../entities/enemies";

const createEntities = (players, enemies) => {
  const playersList = [];
  const enemiesList = [];
  console.log(players);
  console.log(enemies);
  players.forEach((fighter) => {
    const cards = {
      slot_1: fighter.slot_1,
      slot_2: fighter.slot_2,
      slot_3: fighter.slot_3,
      slot_4: fighter.slot_4,
    };
    const stats = {
      maxHp: fighter.max_hp,
      atk: fighter.atk,
      def: fighter.def,
      agi: fighter.agi,
    };
    const newFighter = new Player(
      true,
      fighter.name,
      fighter.grid_x,
      fighter.grid_y,
      stats,
      cards
    );
    playersList.push(newFighter);
  });

  const usedCoordinates = new Set();
  function getUniqueCoordinates() {
    const x = Math.floor(Math.random() * (7 - 0 + 1) + 0);
    const y = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    return [x, y];
  }

  enemies.forEach((enemy, index) => {
    const { cards, stats } = getEnemies(enemy);
    let gridX, gridY;
    do {
      const [x, y] = getUniqueCoordinates();
      gridX = x;
      gridY = y;
    } while (usedCoordinates.has(`${gridX}-${gridY}`));
    usedCoordinates.add(`${gridX}-${gridY}`);

    const newEnemy = new Player(
      false,
      `${enemy}${index}`,
      gridX,
      gridY,
      stats,
      cards
    );
    enemiesList.push(newEnemy);
  });

  return { playersList, enemiesList };
};

export { createEntities };
