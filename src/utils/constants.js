// ثوابت اللعبة
export const GAME_CONFIG = {
  // حجم المتاهة (يجب أن يكون فردي)
  MAZE_WIDTH: 21,
  MAZE_HEIGHT: 15,

  // حجم الخلية بالبكسل
  CELL_SIZE: 32,

  // سرعة اللاعب (بالميلي ثانية) - قللناها جداً
  MOVE_DELAY: 50,

  // اتجاهات الحركة مع زاوية الدوران
  DIRECTIONS: {
    UP: { x: 0, y: -1, key: ["ArrowUp", "w", "W"], rotation: -90 },
    DOWN: { x: 0, y: 1, key: ["ArrowDown", "s", "S"], rotation: 90 },
    LEFT: { x: -1, y: 0, key: ["ArrowLeft", "a", "A"], rotation: 180 },
    RIGHT: { x: 1, y: 0, key: ["ArrowRight", "d", "D"], rotation: 0 },
  },
};

// أنواع الخلايا
export const CELL_TYPES = {
  WALL: 0,
  PATH: 1,
  START: 2,
  EXIT: 3,
  VISITED: 4,
};
