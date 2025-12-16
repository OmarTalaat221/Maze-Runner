import { CELL_TYPES, GAME_CONFIG } from "./constants";

export function generateMaze(
  width = GAME_CONFIG.MAZE_WIDTH,
  height = GAME_CONFIG.MAZE_HEIGHT
) {
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;

  const maze = Array(h)
    .fill(null)
    .map(() => Array(w).fill(CELL_TYPES.WALL));

  const startX = 1;
  const startY = 1;

  const stack = [{ x: startX, y: startY }];
  maze[startY][startX] = CELL_TYPES.PATH;

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

      stack.push({ x: next.x, y: next.y });
    } else {
      stack.pop();
    }
  }

  maze[startY][startX] = CELL_TYPES.START;

  const exitX = w - 2;
  const exitY = h - 2;
  maze[exitY][exitX] = CELL_TYPES.EXIT;

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
  console.log(`👾 Monsters: ${monsterSpawns.length}`);
  monsterSpawns.forEach((m, i) =>
    console.log(`   Monster ${i + 1}: (${m.x}, ${m.y})`)
  );

  return {
    grid: maze,
    width: w,
    height: h,
    start: { x: startX, y: startY },
    exit: { x: exitX, y: exitY },
    monsterSpawns,
  };
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
