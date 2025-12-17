import { memo } from "react";
import { CELL_TYPES, GAME_CONFIG, ALGORITHMS } from "../../utils/constants";

const Cell = memo(function Cell({
  type,
  isVisited,
  cost = 1,
  showCost = false,
  size = GAME_CONFIG.CELL_SIZE,
}) {
  const baseClasses = "maze-cell relative transition-colors duration-150";

  const getTypeClasses = () => {
    switch (type) {
      case CELL_TYPES.WALL:
        return "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-inner";
      case CELL_TYPES.START:
        return "bg-gradient-to-br from-emerald-500 to-green-600";
      case CELL_TYPES.EXIT:
        return "bg-gradient-to-br from-yellow-400 to-amber-500";
      case CELL_TYPES.PATH:
      default:
        return isVisited
          ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50"
          : "bg-gradient-to-br from-slate-700 to-slate-800";
    }
  };

  const getContent = () => {
    switch (type) {
      case CELL_TYPES.WALL:
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 20 20">
            <pattern
              id="brick"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <rect
                width="10"
                height="5"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
              />
              <rect
                y="5"
                x="5"
                width="10"
                height="5"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="20" height="20" fill="url(#brick)" />
          </svg>
        );
      case CELL_TYPES.START:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-ping" />
          </div>
        );
      case CELL_TYPES.EXIT:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
        );
      default:
        if (showCost && cost !== Infinity) {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-xs drop-shadow-lg">
                {cost}
              </span>
            </div>
          );
        }
        if (isVisited) {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-purple-400/40 rounded-full" />
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div
      className={`${baseClasses} ${getTypeClasses()}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      {getContent()}
    </div>
  );
});

export default Cell;
