import { CELL_TYPES, GAME_CONFIG } from "./constants";

/**
 * توليد متاهة باستخدام خوارزمية Recursive Backtracking
 * هذه الخوارزمية تضمن وجود مسار واحد على الأقل للحل
 */
export function generateMaze(
  width = GAME_CONFIG.MAZE_WIDTH,
  height = GAME_CONFIG.MAZE_HEIGHT
) {
  // التأكد من أن الأبعاد فردية
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;

  // إنشاء شبكة مليئة بالجدران
  const maze = Array(h)
    .fill(null)
    .map(() => Array(w).fill(CELL_TYPES.WALL));

  // نقطة البداية (1, 1)
  const startX = 1;
  const startY = 1;

  // استخدام Stack بدلاً من Recursion لتحسين الأداء
  const stack = [{ x: startX, y: startY }];
  maze[startY][startX] = CELL_TYPES.PATH;

  // الاتجاهات الممكنة (خطوتين لأننا نحفر عبر الجدران)
  const directions = [
    { dx: 0, dy: -2 }, // أعلى
    { dx: 0, dy: 2 }, // أسفل
    { dx: -2, dy: 0 }, // يسار
    { dx: 2, dy: 0 }, // يمين
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    // إيجاد الجيران غير المزورين
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
      // اختيار جار عشوائي
      const randomIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
      const next = unvisitedNeighbors[randomIndex];

      // إزالة الجدار بين الخلية الحالية والجار
      maze[next.wallY][next.wallX] = CELL_TYPES.PATH;
      maze[next.y][next.x] = CELL_TYPES.PATH;

      stack.push({ x: next.x, y: next.y });
    } else {
      stack.pop();
    }
  }

  // تحديد نقطة البداية
  maze[startY][startX] = CELL_TYPES.START;

  // تحديد نقطة الخروج (أبعد نقطة ممكنة)
  const exitX = w - 2;
  const exitY = h - 2;
  maze[exitY][exitX] = CELL_TYPES.EXIT;

  return {
    grid: maze,
    width: w,
    height: h,
    start: { x: startX, y: startY },
    exit: { x: exitX, y: exitY },
  };
}

/**
 * التحقق من إمكانية الحركة لموقع معين
 */
export function canMoveTo(maze, x, y) {
  if (x < 0 || x >= maze.width || y < 0 || y >= maze.height) {
    return false;
  }
  const cell = maze.grid[y][x];
  return cell !== CELL_TYPES.WALL;
}
