export const correctPosition = (self, canvas) => {
  if (self.gridX < 0) {
    self.gridX += 1;
  }
  if (self.gridY < 0) {
    self.gridY += 1;
  }
  if (self.gridX > canvas.width) {
    self.gridX -= 1;
  }
  if (self.gridY > canvas.height) {
    self.gridY -= 1;
  }
};

class Node {
  constructor(gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.g_cost = 0;
    this.h_cost = 0;
    this.f_cost = 0;
    this.parent = null;
  }
}

function getNeighbors(node, target, all, gridSize) {
  const neighbors = [];
  const allButtarget = all.filter((instance) => {
    return !(
      instance.gridX === target.gridX && instance.gridY === target.gridY
    );
  });
  const potentialNeighbors = [
    { gridX: node.gridX + 1, gridY: node.gridY },
    { gridX: node.gridX - 1, gridY: node.gridY },
    { gridX: node.gridX, gridY: node.gridY + 1 },
    { gridX: node.gridX, gridY: node.gridY - 1 },
  ];

  potentialNeighbors.forEach((neighbor) => {
    const newNeighbor = new Node(neighbor.gridX, neighbor.gridY);
    if (
      isGridSpaceFree(newNeighbor, allButtarget) &&
      newNeighbor.gridX >= 0 &&
      newNeighbor.gridY >= 0 &&
      newNeighbor.gridX <= Math.sqrt(gridSize) - 1 &&
      newNeighbor.gridY <= Math.sqrt(gridSize) - 1
    ) {
      neighbors.push(newNeighbor);
    }
  });
  return neighbors;
}

function getHeuristicCost(node, goal) {
  const dX = Math.abs(node.gridX - goal.gridX);
  const dY = Math.abs(node.gridY - goal.gridY);
  return dX + dY;
}

function reconstructPath(node) {
  const path = [node];
  while (node.parent !== null) {
    node = node.parent;
    path.push(node);
  }
  const result = path.reverse();
  result.pop();
  return path.sort((a, b) => a - b);
}

function verifyNode(list, node) {
  let result = false;
  list.forEach((element) => {
    if (element.gridX === node.gridX && element.gridY === node.gridY) {
      result = true;
    }
  });
  return result;
}

export function aStar(self, target, all, gridSize) {
  console.log("self:", self);
  console.log("target:", target);
  console.log("all:", all);
  console.log("gridSize:", gridSize);
  let selfNode = new Node(self.gridX, self.gridY);
  let targetNode = new Node(target.gridX, target.gridY);
  const start = selfNode;
  const goal = targetNode;
  const openList = [start];
  const closedList = [];

  while (openList.length > 0) {
    let current = openList[0];
    for (let i = 0; i < openList.length; i++) {
      if (
        openList[i].f_cost < current.f_cost ||
        (openList[i].f_cost === current.f_cost &&
          openList[i].h_cost < current.h_cost)
      ) {
        current = openList[i];
      }
    }
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);
    if (current.gridX === goal.gridX && current.gridY === goal.gridY) {
      return reconstructPath(current);
    }

    const neighbors = getNeighbors(current, target, all, gridSize);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!verifyNode(closedList, neighbor)) {
        const tentative_g_cost = current.g_cost + 1;
        if (
          !verifyNode(openList, neighbor) ||
          tentative_g_cost < neighbor.g_cost
        ) {
          neighbor.parent = current;
          neighbor.g_cost = tentative_g_cost;
          neighbor.h_cost = getHeuristicCost(neighbor, goal);
          neighbor.f_cost = neighbor.g_cost + neighbor.h_cost;

          if (!verifyNode(openList, neighbor)) {
            openList.push(neighbor);
          }
        }
      }
    }
  }
  return [];
}

const isGridSpaceFree = (self, all) => {
  let placeIsFree = true;
  all.forEach((instance) => {
    if (instance.gridX === self.gridX && instance.gridY === self.gridY) {
      placeIsFree = false;
    }
  });
  return placeIsFree;
};

const isSpaceFree = (whichPosition, self, all, gridSize) => {
  let placeIsFree = true;
  switch (whichPosition) {
    case "xPlus":
      all.forEach((instance) => {
        if (
          instance.gridX === self.gridX + 1 &&
          instance.gridY === self.gridY
        ) {
          placeIsFree = false;
        }
      });
      if (self.gridX + 1 > gridSize / Math.sqrt(gridSize) - 1) {
        placeIsFree = false;
      }
      break;
    case "xMinus":
      all.forEach((instance) => {
        if (
          instance.gridX === self.gridX - 1 &&
          instance.gridY === self.gridY
        ) {
          placeIsFree = false;
        }
      });
      if (self.gridX - 1 < 0) {
        placeIsFree = false;
      }
      break;

    case "yPlus":
      all.forEach((instance) => {
        if (
          instance.gridX === self.gridX &&
          instance.gridY === self.gridY + 1
        ) {
          placeIsFree = false;
        }
      });
      if (self.gridY + 1 > gridSize / Math.sqrt(gridSize) - 1) {
        placeIsFree = false;
      }
      break;

    case "yMinus":
      all.forEach((instance) => {
        if (
          instance.gridX === self.gridX &&
          instance.gridY === self.gridY - 1
        ) {
          placeIsFree = false;
        }
      });
      if (self.gridY - 1 < 0) {
        placeIsFree = false;
      }
      break;
  }

  return placeIsFree;
};

export const move = (self, path) => {
  for (let i = 0; i < path.length; i++) {
    const node = path[i];
    const nextNode = path[i + 1];
    if (self.gridX === node.gridX && self.gridY === node.gridY && nextNode) {
      setTimeout(() => {
        self.gridX = nextNode.gridX;
        self.gridY = nextNode.gridY;
      }, 250);
    }
  }
};

export const followEnemy = (self, target, all, gridSize) => {
  const tx = target.gridX;
  const ty = target.gridY;
  const sx = self.gridX;
  const sy = self.gridY;
  const diffX = Math.abs(tx - sx);
  const diffY = Math.abs(ty - sy);

  let moved = false;

  if (diffX >= diffY) {
    if (sx < tx) {
      if (isSpaceFree("xPlus", self, all, gridSize)) {
        self.gridX = sx + 1;
        moved = true;
      }
    } else {
      if (isSpaceFree("xMinus", self, all, gridSize)) {
        self.gridX = sx - 1;
        moved = true;
      }
    }
  } else {
    if (sy < ty) {
      if (isSpaceFree("yPlus", self, all, gridSize)) {
        self.gridY = sy + 1;
        moved = true;
      }
    } else {
      if (isSpaceFree("yMinus", self, all, gridSize)) {
        self.gridY = sy - 1;
        moved = true;
      }
    }
  }

  if (!moved) {
    let randomDirection = getRandomDirection();
    while (!isSpaceFree(randomDirection, self, all, gridSize)) {
      randomDirection = getRandomDirection();
    }

    self.gridX +=
      randomDirection === "xPlus" ? 1 : randomDirection === "xMinus" ? -1 : 0;
    self.gridY +=
      randomDirection === "yPlus" ? 1 : randomDirection === "yMinus" ? -1 : 0;
  }
};

const getRandomDirection = () => {
  const directions = ["xPlus", "xMinus", "yPlus", "yMinus"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
};

export const pushedAttack = (self, target, all, gridSize) => {
  let targetPushed = false;

  if (!self.hasAttacked) {
    if (self.gridX === target.gridX && self.gridY < target.gridY) {
      if (isSpaceFree("yPlus", target, all, gridSize)) {
        target.gridY += 1;
        targetPushed = true;
      }
    } else if (self.gridX === target.gridX && self.gridY > target.gridY) {
      if (isSpaceFree("yMinus", target, all, gridSize)) {
        target.gridY -= 1;
        targetPushed = true;
      }
    } else if (self.gridY === target.gridY && self.gridX < target.gridX) {
      if (isSpaceFree("xPlus", target, all, gridSize)) {
        target.gridX += 1;
        targetPushed = true;
      }
    } else if (self.gridY === target.gridY && self.gridX > target.gridX) {
      if (isSpaceFree("yMinus", target, all, gridSize)) {
        target.gridX -= 1;
        targetPushed = true;
      }
    }
    if (!targetPushed) {
      const directions = ["xPlus", "xMinus", "yPlus", "yMinus"];
      for (let i = 0; i < directions.length; i++) {
        if (isSpaceFree(directions[i], target, all, gridSize)) {
          target.gridX +=
            directions[i] === "xPlus" ? 1 : directions[i] === "xMinus" ? -1 : 0;
          target.gridY +=
            directions[i] === "yPlus" ? 1 : directions[i] === "yMinus" ? -1 : 0;
          break;
        }
      }
    }
    target.hp -= self.stats.atk;
  }
};

export const Attack = (self, target) => {
  target.hp -= self.stats.atk;
};

export const setDefaultState = (self) => {
  self.behaviourStates = {
    currentState: "IDLE",
    target: null,
    hasAttacked: false,
    hasMoved: false,
  };
};

export const getClosestTarget = (self, opponentList) => {
  let closestTarget = null;

  opponentList.forEach((entity) => {
    if (closestTarget === null) {
      closestTarget = entity;
    } else if (
      Math.abs(closestTarget.gridX + closestTarget.gridY) +
        Math.abs(self.gridX + self.gridY) >
      Math.abs(entity.gridX + entity.gridY) + Math.abs(self.gridX + self.gridY)
    ) {
      closestTarget = entity;
    }
  });

  return closestTarget;
};

export const getAdjoiningEntities = (self, targetList) => {
  const adjoiningList = [];

  targetList.forEach((target) => {
    const diffX = Math.abs(target.gridX - self.gridX);
    const diffY = Math.abs(target.gridY - self.gridY);
    if ((diffX === 1 && diffY === 0) || (diffX === 0 && diffY === 1)) {
      adjoiningList.push(target);
    }
  });
  console.log("ajoininglist", adjoiningList);
  return adjoiningList.length > 0 ? adjoiningList : false;
};

export const getDiagonalEntities = (self, targetList) => {
  for (const target of targetList) {
    const diffX = Math.abs(target.gridX - self.gridX);
    const diffY = Math.abs(target.gridY - self.gridY);

    if (diffX === diffY && (diffX > 0 || diffY > 0)) {
      return true;
    }
  }

  return false;
};

export const getAxialEntities = (self, targetList) => {
  return targetList.some((target) => {
    const diffX = Math.abs(target.gridX - self.gridX);
    const diffY = Math.abs(target.gridY - self.gridY);

    return (diffX === 1 && diffY === 0) || (diffX === 0 && diffY === 1);
  });
};

export default {
  correctPosition,
  Attack,
  setDefaultState,
  followEnemy,
  getClosestTarget,
  getAdjoiningEntities,
  getAxialEntities,
  getDiagonalEntities,
  aStar,
  move,
};
