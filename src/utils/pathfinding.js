import { CELL_TYPES, ALGORITHMS } from "./constants";

const DIRS = [
  { x: 0, y: -1, name: "UP" },
  { x: 0, y: 1, name: "DOWN" },
  { x: -1, y: 0, name: "LEFT" },
  { x: 1, y: 0, name: "RIGHT" },
];

export function findPathBFS(maze, start, target) {
  const { grid, width, height } = maze;
  const queue = [{ x: start.x, y: start.y, path: [] }];
  const visited = new Set([`${start.x},${start.y}`]);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === target.x && current.y === target.y) {
      return { path: current.path, explored: visited.size };
    }

    for (const dir of DIRS) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      const key = `${nx},${ny}`;

      if (
        nx > 0 &&
        nx < width - 1 &&
        ny > 0 &&
        ny < height - 1 &&
        !visited.has(key) &&
        grid[ny][nx] !== CELL_TYPES.WALL
      ) {
        visited.add(key);
        queue.push({
          x: nx,
          y: ny,
          path: [...current.path, { x: nx, y: ny, dir: dir.name }],
        });
      }
    }
  }
  return { path: [], explored: visited.size };
}

export function findPathDFS(maze, start, target) {
  const { grid, width, height } = maze;
  const stack = [{ x: start.x, y: start.y, path: [] }];
  const visited = new Set([`${start.x},${start.y}`]);

  while (stack.length > 0) {
    const current = stack.pop();

    if (current.x === target.x && current.y === target.y) {
      return { path: current.path, explored: visited.size };
    }

    for (const dir of DIRS) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      const key = `${nx},${ny}`;

      if (
        nx > 0 &&
        nx < width - 1 &&
        ny > 0 &&
        ny < height - 1 &&
        !visited.has(key) &&
        grid[ny][nx] !== CELL_TYPES.WALL
      ) {
        visited.add(key);
        stack.push({
          x: nx,
          y: ny,
          path: [...current.path, { x: nx, y: ny, dir: dir.name }],
        });
      }
    }
  }
  return { path: [], explored: visited.size };
}

export function findPathUCS(maze, start, target) {
  const { grid, costs, width, height } = maze;
  const queue = [{ x: start.x, y: start.y, path: [], cost: 0 }];
  const visited = new Map();

  while (queue.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].cost < queue[minIdx].cost) minIdx = i;
    }
    const current = queue.splice(minIdx, 1)[0];
    const key = `${current.x},${current.y}`;

    if (visited.has(key)) continue;
    visited.set(key, current.cost);

    if (current.x === target.x && current.y === target.y) {
      return { path: current.path, explored: visited.size, cost: current.cost };
    }

    for (const dir of DIRS) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;
      const nkey = `${nx},${ny}`;

      if (
        nx > 0 &&
        nx < width - 1 &&
        ny > 0 &&
        ny < height - 1 &&
        !visited.has(nkey) &&
        grid[ny][nx] !== CELL_TYPES.WALL
      ) {
        const c = costs[ny][nx];
        queue.push({
          x: nx,
          y: ny,
          path: [...current.path, { x: nx, y: ny, dir: dir.name, cost: c }],
          cost: current.cost + c,
        });
      }
    }
  }
  return { path: [], explored: visited.size, cost: Infinity };
}

export function getNextMove(maze, from, to) {
  const r = findPathBFS(maze, from, to);
  return r.path.length > 0 ? { x: r.path[0].x, y: r.path[0].y } : from;
}

export function getPath(maze, playerPos, algo) {
  if (algo === ALGORITHMS.BFS) {
    return findPathBFS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.DFS) {
    return findPathDFS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.UCS) {
    return findPathUCS(maze, playerPos, maze.exit);
  }
  return { path: [] };
}

export function analyzePlayerMove(maze, oldPos, newPos, monsters, algo) {
  const stepCost = maze.costs[newPos.y][newPos.x];

  console.log("\n========================================");
  console.log(
    `PLAYER: (${oldPos.x},${oldPos.y}) -> (${newPos.x},${newPos.y}) | Cost: ${stepCost}`
  );
  console.log("========================================");

  let result;

  if (algo === ALGORITHMS.BFS) {
    console.log("Algorithm: BFS (Queue - FIFO)");
    result = findPathBFS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.DFS) {
    console.log("Algorithm: DFS (Stack - LIFO)");
    result = findPathDFS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.UCS) {
    console.log("Algorithm: UCS (Priority Queue - Lowest Cost)");
    result = findPathUCS(maze, newPos, maze.exit);
  }

  if (result.path.length > 0) {
    console.log(
      `Result: ${result.path.length} steps | Explored: ${result.explored} cells`
    );
    if (result.cost) console.log(`Total Cost: ${result.cost}`);

    const pathStr = result.path
      .slice(0, 8)
      .map((p) => p.dir[0])
      .join("-");
    console.log(`Path: ${pathStr}${result.path.length > 8 ? "-..." : ""}`);
  } else {
    console.log("No path found!");
  }

  console.log("\nMap:");
  drawMap(maze, newPos, monsters, result.path);

  console.log("========================================\n");
}

function drawMap(maze, player, monsters, path) {
  const { grid, width, height, exit } = maze;
  const pathSet = new Set(path.map((p) => `${p.x},${p.y}`));

  let map = "";
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;

      if (player.x === x && player.y === y) {
        row += "P ";
      } else if (
        monsters.some((m) => m.position.x === x && m.position.y === y)
      ) {
        row += "M ";
      } else if (exit.x === x && exit.y === y) {
        row += "* ";
      } else if (pathSet.has(key)) {
        row += ". ";
      } else if (grid[y][x] === CELL_TYPES.WALL) {
        row += "# ";
      } else {
        row += "  ";
      }
    }
    map += row + "\n";
  }
  console.log(map);
}
