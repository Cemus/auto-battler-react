import * as ai from "../utils/game/aiFunctions.js";

//States

function updateBehaviour(
  self,
  playersList,
  enemiesList,
  allEntitiesList,
  nextPlayer,
  gridSize,
  canvasRef,
  ctx,
  allCards
) {
  self.sprite(ctx);
  const opponentList = self.isPlayer ? enemiesList : playersList;
  const allyList = self.isPlayer
    ? playersList.filter((ally) => ally.id !== self.id)
    : enemiesList.filter((ally) => ally.id !== self.id);

  let cardApplied = false;

  for (let i = 1; i <= 5; i++) {
    const slotKey = `slot_${i}`;
    console.log(slotKey);
    const currentCard = self.cards[slotKey];
    if (currentCard && !cardApplied) {
      const getCurrentCardInfos = allCards.find((c) => c.id === currentCard);
      console.log(getCurrentCardInfos);
      if (
        checkConditions(
          getCurrentCardInfos.conditions,
          self,
          opponentList,
          allyList
        )
      ) {
        console.log("condition checked ok");
        const target = findTarget(
          getCurrentCardInfos.target,
          self,
          opponentList,
          allyList
        );
        console.log(target);
        if (target) {
          applyEffects(
            getCurrentCardInfos.effects,
            target,
            self,
            opponentList,
            allyList
          );
          cardApplied = true;
          break;
        }
      }
    }
  }

  if (cardApplied) {
    nextPlayer();
    return;
  }

  nextPlayer();
}
function checkConditions(conditions, self, opponentList, allyList) {
  console.log(conditions);
  let allClear = true;
  if (conditions !== null) {
    conditions.forEach((cdt) => {
      let conditionMet;

      switch (cdt[1]) {
        case "adjoiningEnemy":
          conditionMet = ai.getAdjoiningEntities(self, opponentList);
          break;
        case "notAdjoiningEnemy":
          conditionMet = !ai.getAdjoiningEntities(self, opponentList);
          break;
        case "diagonalEnemy":
          conditionMet = ai.getDiagonalEntities(self, opponentList);
          break;
        case "axialEnemy":
          conditionMet = ai.getAxialEntities(self, opponentList);
          break;
        case "adjoiningAlly":
          conditionMet = ai.getAdjoiningEntities(self, allyList);
          break;
        case "notAdjoiningAlly":
          conditionMet = !ai.getAdjoiningEntities(self, allyList);
          break;
        case "requiredTokenFire": {
          const tokenNeeded = conditions.filter(
            (token) => token === cdt[1]
          ).length;
          const tokenPossessed = self.tokens.filter(
            (token) => token === "fire"
          ).length;
          conditionMet = tokenPossessed >= tokenNeeded;
          break;
        }
        default:
          conditionMet = false;
          break;
      }

      if (!conditionMet) {
        allClear = false;
      }
    });
  }
  return allClear;
}

function findTarget(target, self, opponentList, allyList) {
  const targetList = [];

  target.forEach((trgt) => {
    console.log("TARGET", trgt);
    switch (trgt) {
      case "adjoiningEnemy":
        {
          const adjoiningEnemies = ai.getAdjoiningEntities(self, opponentList);
          if (adjoiningEnemies) {
            targetList.push(...adjoiningEnemies);
          }
        }
        break;
      case "diagonalEnemy":
        {
          const diagonalEnemies = ai.getDiagonalEntities(self, opponentList);
          if (diagonalEnemies) {
            targetList.push(...diagonalEnemies);
          }
        }
        break;
      case "axialEnemy":
        {
          const axialEnemies = ai.getAxialEntities(self, opponentList);
          if (axialEnemies) {
            targetList.push(...axialEnemies);
          }
        }
        break;
      case "self":
        targetList.push(self);
        break;
      case "closestEnemy":
        {
          const closestEnemy = ai.getClosestTarget(self, opponentList);
          if (closestEnemy) {
            targetList.push(closestEnemy);
          }
        }
        break;
    }
  });
  console.log(targetList);
  return targetList;
}

function applyEffects(effects, target, self, opponentList, allyList) {
  effects.forEach((efct) => {
    console.log(efct);
    switch (efct) {
      case "attack":
        console.log(efct[1]);
        break;
      case "move":
        console.log(efct[1]);
        break;
      case "addTokenFire":
        target[0].tokens.push("fire");
        console.log("OK TOKENS", self.tokens);
        break;
    }
  });
  return;
}
/* 
  switch (self.behaviourStates.currentState) {
    case STATE_IDLE:
      if (self.behaviourStates.hasAttacked === true || self.hp <= 0) {
        nextPlayer();
        ai.setDefaultState(self);
      } else {
        self.behaviourStates.currentState = STATE_ENGAGE;
      }
      break;
    case STATE_FIND:
      {
        const entityTargeted = ai.findTarget(self, opponentList);
        if (entityTargeted) {
          self.behaviourStates.target = entityTargeted;
          self.behaviourStates.currentState = STATE_IDLE;
        } else {
          self.behaviourStates.currentState = STATE_FIND;
        }
      }
      break;
    case STATE_ENGAGE:
      if (self.behaviourStates.target) {
        const path = ai.aStar(
          self,
          self.behaviourStates.target,
          allEntitiesList,
          gridSize
        );
        if (!ai.isNextToEnemy(self, self.behaviourStates.target)) {
          if (path) {
            ai.move(self, path);
          }
        } else {
          self.behaviourStates.currentState = STATE_ATTACK;
        }
      } else {
        self.behaviourStates.currentState = STATE_FIND;
      }
      break;
    case STATE_ATTACK:
      if (!self.behaviourStates.hasAttacked) {
        ai.Attack(self, self.behaviourStates.target, allEntitiesList, gridSize);
        self.behaviourStates.currentState = STATE_IDLE;
      } else {
        self.behaviourStates.currentState = STATE_IDLE;
      }
      break;
  }
  self.sprite(ctx); */

export { updateBehaviour };
