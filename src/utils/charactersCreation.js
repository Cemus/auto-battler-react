import { Player } from "../entities/player.js";
import { Enemy } from "../entities/enemies.js";

const playersList = [];
const enemiesList = [];

/* const enemiesStats2 = {
  atk: 5,
  def: 5,
  agi: 6,
}; */

let playerChar1 = new Player(true, "Gentil joueur", "mage", 1, 2);
/* let playerChar2 = new Player("Jean", "mage", 2, 4, 100);
let playerChar3 = new Player("Jean", "mage", 5, 6, 100); */
let enemyChar1 = new Enemy(false, "Gérard l'archer", "archer", 5, 4);
let enemyChar2 = new Enemy(false, "Archibald Mage", "mage", 3, 5);
let enemyChar3 = new Enemy(false, "Emmental Kombat", "warrior", 2, 3);

playersList.push(playerChar1);
enemiesList.push(enemyChar1, enemyChar2, enemyChar3);

export { playersList, enemiesList };
