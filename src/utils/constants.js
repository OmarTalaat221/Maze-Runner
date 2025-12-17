export const GAME_CONFIG = {
  MAZE_WIDTH: 21,
  MAZE_HEIGHT: 15,
  CELL_SIZE: 32,
  MOVE_DELAY: 50,

  MONSTER_COUNT: 2,
  MONSTER_SPEED: 800,
  MONSTER_START_DELAY: 3000,
  MONSTER_REST_EVERY: 5,
  MONSTER_REST_TIME: 5000,

  MIN_COST: 1,
  MAX_COST: 5,
  EXTRA_PATHS_PERCENTAGE: 0.15,

  DIRECTIONS: {
    UP: { x: 0, y: -1, key: ["ArrowUp", "w", "W"], rotation: -90 },
    DOWN: { x: 0, y: 1, key: ["ArrowDown", "s", "S"], rotation: 90 },
    LEFT: { x: -1, y: 0, key: ["ArrowLeft", "a", "A"], rotation: 180 },
    RIGHT: { x: 1, y: 0, key: ["ArrowRight", "d", "D"], rotation: 0 },
  },
};

export const CELL_TYPES = {
  WALL: 0,
  PATH: 1,
  START: 2,
  EXIT: 3,
};

export const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

export const ALGORITHMS = {
  BFS: "bfs",
  DFS: "dfs",
  UCS: "ucs",
  IDS: "ids",
  A_STAR_MANHATTAN: "a_star_manhattan",
  A_STAR_DANGER: "a_star_danger",
  HILL_CLIMBING: "hill_climbing",
};

export const ALGORITHM_NAMES = {
  [ALGORITHMS.BFS]: "BFS - Breadth First Search",
  [ALGORITHMS.DFS]: "DFS - Depth First Search",
  [ALGORITHMS.UCS]: "UCS - Uniform Cost Search",
  [ALGORITHMS.IDS]: "IDS - Iterative Deepening",
  [ALGORITHMS.A_STAR_MANHATTAN]: "A* - Manhattan Distance",
  [ALGORITHMS.A_STAR_DANGER]: "A* - Danger Aware",
  [ALGORITHMS.HILL_CLIMBING]: "Hill Climbing",
};
