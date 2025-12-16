import { memo } from "react";
import { CELL_TYPES, GAME_CONFIG } from "../../utils/constants";

/**
 * خلية واحدة في المتاهة مع تصميم محسن
 */
const Cell = memo(function Cell({
  type,
  isVisited,
  size = GAME_CONFIG.CELL_SIZE,
}) {
  const getTypeStyles = () => {
    switch (type) {
      case CELL_TYPES.WALL:
        return {
          className:
            "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-inner",
          content: (
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
          ),
        };
      case CELL_TYPES.START:
        return {
          className: "bg-gradient-to-br from-emerald-500 to-green-600",
          content: (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white/30 rounded-full animate-ping" />
            </div>
          ),
        };
      case CELL_TYPES.EXIT:
        return {
          className: "bg-gradient-to-br from-yellow-400 to-amber-500",
          content: (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
          ),
        };
      case CELL_TYPES.PATH:
      default:
        return {
          className: isVisited
            ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50"
            : "bg-gradient-to-br from-slate-700 to-slate-800",
          content: isVisited ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-purple-400/40 rounded-full" />
            </div>
          ) : null,
        };
    }
  };

  const { className, content } = getTypeStyles();

  return (
    <div
      className={`maze-cell relative transition-colors duration-150 ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      {content}
    </div>
  );
});

export default Cell;
