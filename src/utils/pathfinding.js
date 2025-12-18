import { CELL_TYPES, ALGORITHMS } from "./constants";

// متغير للتحكم في عرض الكونسول
let CONSOLE_ENABLED = true;

export function setConsoleEnabled(enabled) {
  CONSOLE_ENABLED = enabled;
}

const DIRS = [
  { x: 0, y: -1, name: "UP" },
  { x: 0, y: 1, name: "DOWN" },
  { x: -1, y: 0, name: "LEFT" },
  { x: 1, y: 0, name: "RIGHT" },
];

function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

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

export function findPathIDS(maze, start, target) {
  const { grid, costs, width, height } = maze;
  let totalExplored = 0;

  function depthLimitedDFS(depthLimit) {
    const stack = [{ x: start.x, y: start.y, path: [], depth: 0 }];
    const visited = new Map();
    let explored = 0;

    while (stack.length > 0) {
      const current = stack.pop();
      const key = `${current.x},${current.y}`;

      if (visited.has(key) && visited.get(key) <= current.depth) continue;
      visited.set(key, current.depth);
      explored++;

      if (current.x === target.x && current.y === target.y) {
        let totalCost = 0;
        for (const p of current.path) {
          totalCost += p.cost;
        }
        return { found: true, path: current.path, explored, cost: totalCost };
      }

      if (current.depth >= depthLimit) continue;

      for (const dir of DIRS) {
        const nx = current.x + dir.x;
        const ny = current.y + dir.y;

        if (
          nx > 0 &&
          nx < width - 1 &&
          ny > 0 &&
          ny < height - 1 &&
          grid[ny][nx] !== CELL_TYPES.WALL
        ) {
          const stepCost = costs[ny][nx];
          stack.push({
            x: nx,
            y: ny,
            path: [
              ...current.path,
              { x: nx, y: ny, dir: dir.name, cost: stepCost },
            ],
            depth: current.depth + 1,
          });
        }
      }
    }

    return { found: false, path: [], explored, cost: Infinity };
  }

  for (let depth = 1; depth <= width * height; depth++) {
    const result = depthLimitedDFS(depth);
    totalExplored += result.explored;

    if (result.found) {
      return {
        path: result.path,
        explored: totalExplored,
        cost: result.cost,
        depth: depth,
        iterations: depth,
      };
    }
  }

  return {
    path: [],
    explored: totalExplored,
    cost: Infinity,
    depth: 0,
    iterations: 0,
  };
}

export function findPathAStarManhattan(maze, start, target) {
  const { grid, costs, width, height } = maze;

  const openList = [
    {
      x: start.x,
      y: start.y,
      path: [],
      g: 0,
      h: manhattanDistance(start.x, start.y, target.x, target.y),
      f: manhattanDistance(start.x, start.y, target.x, target.y),
    },
  ];

  const visited = new Map();

  while (openList.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[minIdx].f) minIdx = i;
    }
    const current = openList.splice(minIdx, 1)[0];
    const key = `${current.x},${current.y}`;

    if (visited.has(key)) continue;
    visited.set(key, current.g);

    if (current.x === target.x && current.y === target.y) {
      return {
        path: current.path,
        explored: visited.size,
        cost: current.g,
        heuristic: "Manhattan Distance",
      };
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
        const stepCost = costs[ny][nx];
        const g = current.g + stepCost;
        const h = manhattanDistance(nx, ny, target.x, target.y);
        const f = g + h;

        openList.push({
          x: nx,
          y: ny,
          path: [
            ...current.path,
            { x: nx, y: ny, dir: dir.name, cost: stepCost, h: h },
          ],
          g: g,
          h: h,
          f: f,
        });
      }
    }
  }

  return {
    path: [],
    explored: visited.size,
    cost: Infinity,
    heuristic: "Manhattan Distance",
  };
}

export function findPathAStarDanger(maze, start, target, monsters = []) {
  const { grid, costs, width, height } = maze;

  function dangerHeuristic(x, y) {
    const goalDist = manhattanDistance(x, y, target.x, target.y);

    let minMonsterDist = Infinity;
    for (const monster of monsters) {
      if (!monster.isResting) {
        const dist = manhattanDistance(
          x,
          y,
          monster.position.x,
          monster.position.y
        );
        minMonsterDist = Math.min(minMonsterDist, dist);
      }
    }

    let dangerPenalty = 0;
    if (minMonsterDist <= 2) {
      dangerPenalty = 50;
    } else if (minMonsterDist <= 4) {
      dangerPenalty = 20;
    } else if (minMonsterDist <= 6) {
      dangerPenalty = 10;
    }

    return goalDist + dangerPenalty;
  }

  const openList = [
    {
      x: start.x,
      y: start.y,
      path: [],
      g: 0,
      h: dangerHeuristic(start.x, start.y),
      f: dangerHeuristic(start.x, start.y),
    },
  ];

  const visited = new Map();

  while (openList.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[minIdx].f) minIdx = i;
    }
    const current = openList.splice(minIdx, 1)[0];
    const key = `${current.x},${current.y}`;

    if (visited.has(key)) continue;
    visited.set(key, current.g);

    if (current.x === target.x && current.y === target.y) {
      return {
        path: current.path,
        explored: visited.size,
        cost: current.g,
        heuristic: "Danger Aware (Monster Avoidance)",
      };
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
        const stepCost = costs[ny][nx];
        const g = current.g + stepCost;
        const h = dangerHeuristic(nx, ny);
        const f = g + h;

        openList.push({
          x: nx,
          y: ny,
          path: [
            ...current.path,
            { x: nx, y: ny, dir: dir.name, cost: stepCost, h: h },
          ],
          g: g,
          h: h,
          f: f,
        });
      }
    }
  }

  return {
    path: [],
    explored: visited.size,
    cost: Infinity,
    heuristic: "Danger Aware",
  };
}

export function findPathHillClimbing(maze, start, target) {
  const { grid, costs, width, height } = maze;

  let current = { x: start.x, y: start.y };
  const path = [];
  const visited = new Set([`${start.x},${start.y}`]);
  let totalCost = 0;

  const maxSteps = width * height;
  let steps = 0;

  while (steps < maxSteps) {
    steps++;

    if (current.x === target.x && current.y === target.y) {
      return {
        path,
        explored: visited.size,
        cost: totalCost,
        stuck: false,
        heuristic: "Greedy - Always move closer to goal",
      };
    }

    const currentDist = manhattanDistance(
      current.x,
      current.y,
      target.x,
      target.y
    );

    let bestNeighbor = null;
    let bestDist = currentDist;
    let bestDir = null;

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
        const dist = manhattanDistance(nx, ny, target.x, target.y);

        if (dist < bestDist) {
          bestDist = dist;
          bestNeighbor = { x: nx, y: ny };
          bestDir = dir.name;
        }
      }
    }

    if (!bestNeighbor) {
      return {
        path,
        explored: visited.size,
        cost: totalCost,
        stuck: true,
        stuckAt: current,
        heuristic: "Greedy - STUCK in local maximum!",
      };
    }

    const stepCost = costs[bestNeighbor.y][bestNeighbor.x];
    totalCost += stepCost;

    path.push({
      x: bestNeighbor.x,
      y: bestNeighbor.y,
      dir: bestDir,
      cost: stepCost,
      h: bestDist,
    });

    visited.add(`${bestNeighbor.x},${bestNeighbor.y}`);
    current = bestNeighbor;
  }

  return {
    path,
    explored: visited.size,
    cost: totalCost,
    stuck: true,
    heuristic: "Greedy - Max steps reached",
  };
}

export function getNextMove(maze, from, to) {
  const r = findPathBFS(maze, from, to);
  return r.path.length > 0 ? { x: r.path[0].x, y: r.path[0].y } : from;
}

export function getPath(maze, playerPos, algo, monsters = []) {
  if (algo === ALGORITHMS.BFS) {
    return findPathBFS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.DFS) {
    return findPathDFS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.UCS) {
    return findPathUCS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.IDS) {
    return findPathIDS(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.A_STAR_MANHATTAN) {
    return findPathAStarManhattan(maze, playerPos, maze.exit);
  } else if (algo === ALGORITHMS.A_STAR_DANGER) {
    return findPathAStarDanger(maze, playerPos, maze.exit, monsters);
  } else if (algo === ALGORITHMS.HILL_CLIMBING) {
    return findPathHillClimbing(maze, playerPos, maze.exit);
  }
  return { path: [] };
}

export function analyzePlayerMove(maze, oldPos, newPos, monsters, algo) {
  if (!CONSOLE_ENABLED) return;

  const stepCost = maze.costs[newPos.y][newPos.x];

  console.log("\n========================================");
  console.log(
    `PLAYER: (${oldPos.x},${oldPos.y}) -> (${newPos.x},${newPos.y}) | Cost: ${stepCost}`
  );
  console.log("========================================");

  let result;

  if (algo === ALGORITHMS.BFS) {
    console.log("Algorithm: BFS (Queue - FIFO)");
    console.log("Goal: Shortest path by STEPS");
    result = findPathBFS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.DFS) {
    console.log("Algorithm: DFS (Stack - LIFO)");
    console.log("Goal: Find ANY path");
    result = findPathDFS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.UCS) {
    console.log("Algorithm: UCS (Priority Queue)");
    console.log("Goal: Lowest COST path");
    result = findPathUCS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.IDS) {
    console.log("Algorithm: IDS (Iterative Deepening)");
    console.log("Goal: Shortest STEPS path (low memory)");
    result = findPathIDS(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.A_STAR_MANHATTAN) {
    console.log("Algorithm: A* (Manhattan Distance)");
    console.log("Goal: Lowest COST + Smart direction");
    console.log("Formula: f(n) = g(n) + h(n)");
    result = findPathAStarManhattan(maze, newPos, maze.exit);
  } else if (algo === ALGORITHMS.A_STAR_DANGER) {
    console.log("Algorithm: A* (Danger Aware)");
    console.log("Goal: Lowest COST + Avoid Monsters");
    console.log("Formula: f(n) = g(n) + h(n) + danger");
    result = findPathAStarDanger(maze, newPos, maze.exit, monsters);
  } else if (algo === ALGORITHMS.HILL_CLIMBING) {
    console.log("Algorithm: Hill Climbing (Greedy)");
    console.log("Goal: Always move CLOSER to goal");
    console.log("Warning: Can get STUCK in local maxima!");
    result = findPathHillClimbing(maze, newPos, maze.exit);
  }

  if (result.path.length > 0) {
    console.log(`\nResult:`);
    console.log(`  Steps: ${result.path.length}`);
    console.log(`  Explored: ${result.explored} cells`);

    if (result.cost) console.log(`  Total Cost: ${result.cost}`);
    if (result.depth !== undefined) console.log(`  Depth: ${result.depth}`);
    if (result.stuck !== undefined)
      console.log(`  Stuck: ${result.stuck ? "YES ⚠️" : "NO ✅"}`);
    if (result.heuristic) console.log(`  Heuristic: ${result.heuristic}`);

    const pathStr = result.path
      .slice(0, 6)
      .map((p) => {
        if (p.h !== undefined) return `${p.dir[0]}(h${Math.floor(p.h)})`;
        if (p.cost) return `${p.dir[0]}(${p.cost})`;
        return p.dir[0];
      })
      .join("-");
    console.log(`  Path: ${pathStr}${result.path.length > 6 ? "-..." : ""}`);
  } else {
    console.log("\n❌ No path found!");
    if (result.stuck) {
      console.log(
        `⚠️ Algorithm got STUCK at (${result.stuckAt?.x}, ${result.stuckAt?.y})`
      );
      console.log("This is a limitation of Hill Climbing!");
    }
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
