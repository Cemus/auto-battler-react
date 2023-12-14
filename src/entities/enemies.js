export default function getEnemies(enemy) {
  let cards = {};
  let stats = {};
  switch (enemy) {
    case "beast":
      cards = {
        slot_1: 1100,
        slot_2: 1001,
        slot_3: null,
        slot_4: null,
      };
      stats = {
        maxHp: 50,
        atk: 3,
        def: 1,
        agi: 1,
      };
      break;
    case "warrior":
      cards = {
        slot_1: 1100,
        slot_2: 1001,
        slot_3: 1002,
        slot_4: null,
      };
      stats = {
        maxHp: 75,
        atk: 2,
        def: 2,
        agi: 1,
      };
      break;
    default:
      break;
  }
  return { cards, stats };
}
