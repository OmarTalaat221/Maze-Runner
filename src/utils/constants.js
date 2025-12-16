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
  MONSTER_RANDOM_CHANCE: 0.3,

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
