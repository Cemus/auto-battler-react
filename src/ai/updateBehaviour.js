import * as ai from "../utils/aiFunctions.js";

//States

const STATE_FIND = "FIND";
const STATE_IDLE = "IDLE";
const STATE_ATTACK = "ATTACK";
const STATE_ENGAGE = "ENGAGE";

function updateBehaviour(
  self,
  playersList,
  enemiesList,
  allEntitiesList,
  nextPlayer,
  gridSize,
  canvasRef,
  ctx
) {
  const opponentList = self.isPlayer ? enemiesList : playersList;
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
  self.sprite(ctx);
}

export { updateBehaviour };
