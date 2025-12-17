import { CELL_TYPES, ALGORITHMS } from "./constants";

export function findPathBFS(maze, start, target) {
  const { grid, width, height } = maze;

  const queue = [{ ...start, path: [] }];
  const visited = new Set();
  visited.add(`${start.x},${start.y}`);

  const directions = [
    { x: 0, y: -1, name: "UP" },
    { x: 0, y: 1, name: "DOWN" },
    { x: -1, y: 0, name: "LEFT" },
    { x: 1, y: 0, name: "RIGHT" },
  ];

  let iterations = 0;

  while (queue.length > 0) {
    iterations++;
    const current = queue.shift();

    if (current.x === target.x && current.y === target.y) {
      return {
        path: current.path,
        iterations,
        explored: visited.size,
      };
    }

    for (const dir of directions) {
      const newX = current.x + dir.x;
      const newY = current.y + dir.y;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !visited.has(key) &&
        grid[newY][newX] !== CELL_TYPES.WALL
      ) {
        visited.add(key);
        queue.push({
          x: newX,
          y: newY,
          path: [...current.path, { x: newX, y: newY, direction: dir.name }],
        });
      }
    }
  }

  return { path: [], iterations, explored: visited.size };
}

export function findPathDFS(maze, start, target) {
  const { grid, width, height } = maze;

  const stack = [{ ...start, path: [] }];
  const visited = new Set();
  visited.add(`${start.x},${start.y}`);

  const directions = [
    { x: 0, y: -1, name: "UP" },
    { x: 0, y: 1, name: "DOWN" },
    { x: -1, y: 0, name: "LEFT" },
    { x: 1, y: 0, name: "RIGHT" },
  ];

  let iterations = 0;

  while (stack.length > 0) {
    iterations++;
    const current = stack.pop();

    if (current.x === target.x && current.y === target.y) {
      return {
        path: current.path,
        iterations,
        explored: visited.size,
      };
    }

    for (const dir of directions) {
      const newX = current.x + dir.x;
      const newY = current.y + dir.y;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !visited.has(key) &&
        grid[newY][newX] !== CELL_TYPES.WALL
      ) {
        visited.add(key);
        stack.push({
          x: newX,
          y: newY,
          path: [...current.path, { x: newX, y: newY, direction: dir.name }],
        });
      }
    }
  }

  return { path: [], iterations, explored: visited.size };
}

export function findPathUCS(maze, start, target) {
  const { grid, costs, width, height } = maze;

  const priorityQueue = [{ ...start, path: [], cost: 0 }];
  const visited = new Set();
  const costMap = new Map();
  costMap.set(`${start.x},${start.y}`, 0);

  const directions = [
    { x: 0, y: -1, name: "UP" },
    { x: 0, y: 1, name: "DOWN" },
    { x: -1, y: 0, name: "LEFT" },
    { x: 1, y: 0, name: "RIGHT" },
  ];

  let iterations = 0;

  while (priorityQueue.length > 0) {
    iterations++;

    priorityQueue.sort((a, b) => a.cost - b.cost);
    const current = priorityQueue.shift();

    const currentKey = `${current.x},${current.y}`;
    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.x === target.x && current.y === target.y) {
      return {
        path: current.path,
        iterations,
        explored: visited.size,
        cost: current.cost,
      };
    }

    for (const dir of directions) {
      const newX = current.x + dir.x;
      const newY = current.y + dir.y;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !visited.has(key) &&
        grid[newY][newX] !== CELL_TYPES.WALL
      ) {
        const stepCost = costs[newY][newX];
        const newCost = current.cost + stepCost;

        if (!costMap.has(key) || newCost < costMap.get(key)) {
          costMap.set(key, newCost);
          priorityQueue.push({
            x: newX,
            y: newY,
            path: [
              ...current.path,
              { x: newX, y: newY, direction: dir.name, cost: stepCost },
            ],
            cost: newCost,
          });
        }
      }
    }
  }

  return { path: [], iterations, explored: visited.size, cost: Infinity };
}

function countAllPaths(maze, start, target) {
  const { grid, width, height } = maze;
  let pathCount = 0;

  function dfs(x, y, visited) {
    if (x === target.x && y === target.y) {
      pathCount++;
      return;
    }

    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    for (const dir of directions) {
      const newX = x + dir.x;
      const newY = y + dir.y;
      const key = `${newX},${newY}`;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !visited.has(key) &&
        grid[newY][newX] !== CELL_TYPES.WALL
      ) {
        visited.add(key);
        dfs(newX, newY, visited);
        visited.delete(key);
      }
    }
  }

  const visited = new Set([`${start.x},${start.y}`]);
  dfs(start.x, start.y, visited);

  return Math.min(pathCount, 999);
}

export function getNextMove(maze, monsterPos, playerPos) {
  const result = findPathBFS(maze, monsterPos, playerPos);

  if (result.path.length > 0) {
    return { x: result.path[0].x, y: result.path[0].y };
  }

  return monsterPos;
}

export function analyzePlayerMove(
  maze,
  oldPos,
  newPos,
  monsters,
  algorithm = ALGORITHMS.BFS
) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🐱 PLAYER MOVED");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const direction = getDirectionName(oldPos, newPos);
  const stepCost = maze.costs[newPos.y][newPos.x];
  console.log(
    `From (${oldPos.x}, ${oldPos.y}) → To (${newPos.x}, ${newPos.y})`
  );
  console.log(`Direction: ${direction}`);
  console.log(`Step Cost: ${stepCost}\n`);

  if (algorithm === ALGORITHMS.BFS) {
    analyzeBFS(maze, newPos, monsters);
  } else if (algorithm === ALGORITHMS.DFS) {
    analyzeDFS(maze, newPos, monsters);
  } else if (algorithm === ALGORITHMS.UCS) {
    analyzeUCS(maze, newPos, monsters);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

function analyzeBFS(maze, playerPos, monsters) {
  console.log("🔵 BFS Algorithm: Breadth-First Search");
  console.log("─────────────────────────────────────────");
  console.log("Finding shortest path (by steps)...\n");

  const result = findPathBFS(maze, playerPos, maze.exit);
  const pathCount = countAllPaths(maze, playerPos, maze.exit);

  if (result.path.length > 0) {
    console.log(`✅ Shortest Path Found`);
    console.log(`   Steps: ${result.path.length}`);
    console.log(`   Iterations: ${result.iterations}`);
    console.log(`   Cells explored: ${result.explored}`);
    console.log(
      `   🔄 Alternative paths available: ${pathCount}${
        pathCount >= 999 ? "+" : ""
      }\n`
    );

    const simplePath = result.path
      .slice(0, 8)
      .map((p) => p.direction)
      .join(" → ");
    console.log(
      `Path: ${simplePath}${result.path.length > 8 ? " → ..." : ""}\n`
    );

    drawSimpleMap(maze, playerPos, monsters, result.path);
    printStatus(playerPos, monsters, result.path);
  } else {
    console.log("❌ No path found!");
  }
}

function analyzeDFS(maze, playerPos, monsters) {
  console.log("🟢 DFS Algorithm: Depth-First Search");
  console.log("─────────────────────────────────────────");
  console.log("Finding any path (depth first)...\n");

  const result = findPathDFS(maze, playerPos, maze.exit);
  const pathCount = countAllPaths(maze, playerPos, maze.exit);

  if (result.path.length > 0) {
    console.log(`✅ Path Found`);
    console.log(`   Steps: ${result.path.length}`);
    console.log(`   Iterations: ${result.iterations}`);
    console.log(`   Cells explored: ${result.explored}`);
    console.log(
      `   🔄 Alternative paths available: ${pathCount}${
        pathCount >= 999 ? "+" : ""
      }\n`
    );

    const simplePath = result.path
      .slice(0, 8)
      .map((p) => p.direction)
      .join(" → ");
    console.log(
      `Path: ${simplePath}${result.path.length > 8 ? " → ..." : ""}\n`
    );

    console.log("⚠️ Note: DFS may not find the shortest path!\n");

    drawSimpleMap(maze, playerPos, monsters, result.path);
    printStatus(playerPos, monsters, result.path);
  } else {
    console.log("❌ No path found!");
  }
}

function analyzeUCS(maze, playerPos, monsters) {
  console.log("🟡 UCS Algorithm: Uniform Cost Search");
  console.log("─────────────────────────────────────────");
  console.log("Finding cheapest path...\n");

  const result = findPathUCS(maze, playerPos, maze.exit);
  const pathCount = countAllPaths(maze, playerPos, maze.exit);

  if (result.path.length > 0) {
    console.log(`✅ Cheapest Path Found`);
    console.log(`   Steps: ${result.path.length}`);
    console.log(`   Total Cost: ${result.cost}`);
    console.log(
      `   Average cost/step: ${(result.cost / result.path.length).toFixed(2)}`
    );
    console.log(`   Iterations: ${result.iterations}`);
    console.log(`   Cells explored: ${result.explored}`);
    console.log(
      `   🔄 Alternative paths available: ${pathCount}${
        pathCount >= 999 ? "+" : ""
      }\n`
    );

    const simplePath = result.path
      .slice(0, 8)
      .map((p) => `${p.direction}(${p.cost})`)
      .join(" → ");
    console.log(
      `Path: ${simplePath}${result.path.length > 8 ? " → ..." : ""}\n`
    );

    console.log("💡 Note: UCS guarantees the lowest total cost!\n");

    drawSimpleMap(maze, playerPos, monsters, result.path);
    printStatus(playerPos, monsters, result.path);
  } else {
    console.log("❌ No path found!");
  }
}

function getDirectionName(from, to) {
  if (to.x > from.x) return "➡️ RIGHT";
  if (to.x < from.x) return "⬅️ LEFT";
  if (to.y > from.y) return "⬇️ DOWN";
  if (to.y < from.y) return "⬆️ UP";
  return "⏹️ STAY";
}

function drawSimpleMap(maze, playerPos, monsters, path) {
  const { grid, width, height, exit } = maze;

  console.log("🗺️ Map:");

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const isPlayer = playerPos.x === x && playerPos.y === y;
      const isMonster = monsters.some(
        (m) => m.position.x === x && m.position.y === y
      );
      const isExit = exit.x === x && exit.y === y;
      const isPath = path.some((p) => p.x === x && p.y === y);

      if (isPlayer) row += "🐱";
      else if (isMonster) row += "👾";
      else if (isExit) row += "⭐";
      else if (isPath) row += "··";
      else if (grid[y][x] === CELL_TYPES.WALL) row += "██";
      else row += "  ";
    }
    console.log(row);
  }
}

function printStatus(playerPos, monsters, path) {
  console.log("\n📊 Status:");
  console.log(`   Distance to ⭐: ${path.length} steps`);
  if (path.length > 0) {
    console.log(`   Best next move: ${path[0].direction}`);
  }

  monsters.forEach((m, i) => {
    const dist =
      Math.abs(playerPos.x - m.position.x) +
      Math.abs(playerPos.y - m.position.y);
    const danger = dist <= 3 ? "🔴" : dist <= 6 ? "🟡" : "🟢";
    console.log(
      `   Monster ${i + 1}: ${dist} cells ${danger}${m.isResting ? " 💤" : ""}`
    );
  });
}
