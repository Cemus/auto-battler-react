import { Player } from "../entities/player";

const createEntities = () => {
  const playersList = [];
  const enemiesList = [];
  const stats = { maxHp: 10, atk: 5, def: 5, agi: 3 };

  let playerChar1 = new Player(true, "Gentil joueur", "mage", 1, 2, stats);
  let enemyChar1 = new Player(false, "Gérard l'archer", "archer", 5, 4, stats);
  let enemyChar2 = new Player(false, "Archibald Mage", "mage", 3, 5, stats);
  let enemyChar3 = new Player(false, "Emmental Kombat", "warrior", 2, 3, stats);

  playersList.push(playerChar1);
  enemiesList.push(enemyChar1, enemyChar2, enemyChar3);

  return { playersList, enemiesList };
};

export { createEntities };
