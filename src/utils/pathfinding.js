import { CELL_TYPES } from "./constants";

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

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === target.x && current.y === target.y) {
      return current.path;
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

  return [];
}

export function getNextMove(maze, monsterPos, playerPos) {
  const path = findPathBFS(maze, monsterPos, playerPos);

  if (path.length > 0) {
    return { x: path[0].x, y: path[0].y };
  }

  return monsterPos;
}

export function analyzePlayerMove(maze, oldPos, newPos, monsters) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🐱 PLAYER MOVED");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const direction = getDirectionName(oldPos, newPos);
  console.log(
    `From (${oldPos.x}, ${oldPos.y}) → To (${newPos.x}, ${newPos.y})`
  );
  console.log(`Direction: ${direction}\n`);

  console.log("BFS Algorithm: Finding shortest path to EXIT ⭐");
  console.log("─────────────────────────────────────────");

  const path = findPathBFS(maze, newPos, maze.exit);

  if (path.length > 0) {
    console.log(`✅ Path Found: ${path.length} steps\n`);

    const simplePath = path
      .slice(0, 10)
      .map((p) => p.direction)
      .join(" → ");
    console.log(`Path: ${simplePath}${path.length > 10 ? " → ..." : ""}\n`);

    drawSimpleMap(maze, newPos, monsters, path);

    console.log("\n📊 Status:");
    console.log(`   Distance to ⭐: ${path.length} steps`);
    console.log(`   Best next move: ${path[0].direction}`);

    monsters.forEach((m, i) => {
      const dist =
        Math.abs(newPos.x - m.position.x) + Math.abs(newPos.y - m.position.y);
      const danger = dist <= 3 ? "🔴" : dist <= 6 ? "🟡" : "🟢";
      console.log(
        `   Monster ${i + 1}: ${dist} cells ${danger}${
          m.isResting ? " 💤" : ""
        }`
      );
    });
  } else {
    console.log("❌ No path found!");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
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

  console.log("\n🗺️ Map:");

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
