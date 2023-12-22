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
  allCards,
  handleConsoleText
) {
  self.sprite(ctx);
  const opponentList = self.isPlayer ? enemiesList : playersList;
  const allyList = self.isPlayer
    ? playersList.filter((ally) => ally.id !== self.id)
    : enemiesList.filter((ally) => ally.id !== self.id);

  let cardApplied = false;
  if (self.hp > 0) {
    for (let i = 1; i <= 5; i++) {
      const slotKey = `slot_${i}`;
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
          const target = findTarget(
            getCurrentCardInfos.target,
            self,
            opponentList,
            allyList
          );
          console.log("TARGET :", target);
          if (target.length > 0) {
            console.log(getCurrentCardInfos);
            applyEffects(
              getCurrentCardInfos.effects,
              target,
              self,
              opponentList,
              allyList,
              allEntitiesList,
              gridSize,
              handleConsoleText
            );

            self.hasPlayed = true;
            console.log("hasplayed:", self.hasPlayed);
            break;
          }
        }
      }
    }
  }

  self.hasPlayed = true;
  if (self.hasPlayed) {
    console.log("NEXT PLAYER");
    nextPlayer();
  }
}
function checkConditions(conditions, self, opponentList, allyList) {
  let allClear = true;
  if (conditions !== null) {
    conditions.forEach((cdt) => {
      let conditionMet;
      console.log("cdt", cdt);
      switch (cdt) {
        case "adjoiningEnemy":
          conditionMet = ai.getAdjoiningEntities(self, opponentList);
          break;
        case "notAdjoiningEnemy":
          conditionMet = !ai.getAdjoiningEntities(self, opponentList);
          console.log("conditionmet:", conditionMet);
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
  return targetList;
}

function applyEffects(
  effects,
  target,
  self,
  opponentList,
  allyList,
  allEntitiesList,
  gridSize,
  handleConsoleText
) {
  console.log("effects:", effects);
  if (effects) {
    Object.keys(effects).forEach((efct) => {
      switch (efct) {
        case "attack":
          console.log("Attack effect value:", effects[efct]);
          ai.Attack(self, target[0]);
          handleConsoleText(`${self.name} attacked for ${effects[efct]}!`);
          break;
        case "move": {
          console.log("Move effect value:", effects[efct]);
          const path = ai.aStar(self, target[0], allEntitiesList, gridSize);
          console.log("path:", path);
          const maxMove = effects[efct];
          let currentMove = 0;
          while (
            !ai.getAdjoiningEntities(self, target) &&
            currentMove != maxMove
          ) {
            if (path) {
              console.log("hi");
              ai.move(self, path);
              currentMove += 1;
            }
          }
          handleConsoleText(`${self.name} moved for ${effects[efct]}!`);
          break;
        }
        case "addTokenFire": {
          const tokenElement = "fire";
          target[0].tokens.push(tokenElement);
          console.log("OK TOKENS", self.tokens);
          handleConsoleText(`${self.name} generated one ${tokenElement}!`);
          break;
        }
      }
    });
  }

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
