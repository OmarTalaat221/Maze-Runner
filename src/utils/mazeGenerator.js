import { CELL_TYPES, GAME_CONFIG } from "./constants";

function getRandomCost() {
  return (
    Math.floor(
      Math.random() * (GAME_CONFIG.MAX_COST - GAME_CONFIG.MIN_COST + 1)
    ) + GAME_CONFIG.MIN_COST
  );
}

export function generateMaze(
  width = GAME_CONFIG.MAZE_WIDTH,
  height = GAME_CONFIG.MAZE_HEIGHT
) {
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;

  const maze = Array(h)
    .fill(null)
    .map(() => Array(w).fill(CELL_TYPES.WALL));

  const costs = Array(h)
    .fill(null)
    .map(() => Array(w).fill(Infinity));

  const startX = 1;
  const startY = 1;

  const stack = [{ x: startX, y: startY }];
  maze[startY][startX] = CELL_TYPES.PATH;
  costs[startY][startX] = 0;

  const directions = [
    { dx: 0, dy: -2 },
    { dx: 0, dy: 2 },
    { dx: -2, dy: 0 },
    { dx: 2, dy: 0 },
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    const unvisitedNeighbors = directions
      .map(({ dx, dy }) => ({
        x: current.x + dx,
        y: current.y + dy,
        wallX: current.x + dx / 2,
        wallY: current.y + dy / 2,
      }))
      .filter(
        ({ x, y }) =>
          x > 0 &&
          x < w - 1 &&
          y > 0 &&
          y < h - 1 &&
          maze[y][x] === CELL_TYPES.WALL
      );

    if (unvisitedNeighbors.length > 0) {
      const randomIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
      const next = unvisitedNeighbors[randomIndex];

      maze[next.wallY][next.wallX] = CELL_TYPES.PATH;
      maze[next.y][next.x] = CELL_TYPES.PATH;

      costs[next.wallY][next.wallX] = getRandomCost();
      costs[next.y][next.x] = getRandomCost();

      stack.push({ x: next.x, y: next.y });
    } else {
      stack.pop();
    }
  }

  createExtraPaths(maze, costs, w, h);

  maze[startY][startX] = CELL_TYPES.START;
  costs[startY][startX] = 0;

  const exitX = w - 2;
  const exitY = h - 2;
  maze[exitY][exitX] = CELL_TYPES.EXIT;
  costs[exitY][exitX] = 0;

  const monsterSpawns = generateMonsterSpawns(
    maze,
    w,
    h,
    { x: startX, y: startY },
    { x: exitX, y: exitY }
  );

  console.log("🏰 Maze Generated");
  console.log(`📐 Size: ${w}x${h}`);
  console.log(`🟢 Start: (${startX}, ${startY})`);
  console.log(`⭐ Exit: (${exitX}, ${exitY})`);
  console.log(`💰 Cost range: ${GAME_CONFIG.MIN_COST}-${GAME_CONFIG.MAX_COST}`);
  console.log(
    `🔄 Multiple paths: Enabled (${Math.floor(
      GAME_CONFIG.EXTRA_PATHS_PERCENTAGE * 100
    )}% extra)`
  );

  return {
    grid: maze,
    costs,
    width: w,
    height: h,
    start: { x: startX, y: startY },
    exit: { x: exitX, y: exitY },
    monsterSpawns,
  };
}

function createExtraPaths(maze, costs, width, height) {
  const walls = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (maze[y][x] === CELL_TYPES.WALL) {
        let pathNeighbors = 0;
        if (maze[y - 1][x] === CELL_TYPES.PATH) pathNeighbors++;
        if (maze[y + 1][x] === CELL_TYPES.PATH) pathNeighbors++;
        if (maze[y][x - 1] === CELL_TYPES.PATH) pathNeighbors++;
        if (maze[y][x + 1] === CELL_TYPES.PATH) pathNeighbors++;

        if (pathNeighbors >= 2) {
          walls.push({ x, y });
        }
      }
    }
  }

  const wallsToRemove = Math.floor(
    walls.length * GAME_CONFIG.EXTRA_PATHS_PERCENTAGE
  );

  for (let i = 0; i < wallsToRemove; i++) {
    const randomIndex = Math.floor(Math.random() * walls.length);
    const wall = walls[randomIndex];

    maze[wall.y][wall.x] = CELL_TYPES.PATH;
    costs[wall.y][wall.x] = getRandomCost();

    walls.splice(randomIndex, 1);
  }
}

function generateMonsterSpawns(maze, width, height, start, exit) {
  const spawns = [];
  const minDistance = 5;
  const pathCells = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] === CELL_TYPES.PATH) {
        const distFromStart = Math.abs(x - start.x) + Math.abs(y - start.y);
        const distFromExit = Math.abs(x - exit.x) + Math.abs(y - exit.y);

        if (distFromStart >= minDistance && distFromExit >= 2) {
          pathCells.push({ x, y, dist: distFromStart });
        }
      }
    }
  }

  pathCells.sort((a, b) => b.dist - a.dist);

  const count = Math.min(GAME_CONFIG.MONSTER_COUNT, pathCells.length);
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * Math.min(10, pathCells.length));
    spawns.push(pathCells.splice(index, 1)[0]);
  }

  return spawns;
}

export function canMoveTo(maze, x, y) {
  if (x < 0 || x >= maze.width || y < 0 || y >= maze.height) {
    return false;
  }
  const cell = maze.grid[y][x];
  return cell !== CELL_TYPES.WALL;
}
