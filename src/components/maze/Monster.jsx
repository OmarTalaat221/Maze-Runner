import { memo } from "react";
import { GAME_CONFIG } from "../../utils/constants";

const Monster = memo(function Monster({
  position,
  direction = 0,
  isResting = false,
  cellSize = GAME_CONFIG.CELL_SIZE,
}) {
  const monsterSize = cellSize * 0.85;
  const offset = (cellSize - monsterSize) / 2;

  return (
    <div
      className={`absolute z-20 transition-all duration-300 ease-linear ${
        isResting ? "opacity-50" : ""
      }`}
      style={{
        width: monsterSize,
        height: monsterSize,
        left: 0,
        top: 0,
        transform: `translate(${position.x * cellSize + offset}px, ${
          position.y * cellSize + offset
        }px)`,
      }}
    >
      <div
        className="w-full h-full transition-transform duration-150 ease-out"
        style={{ transform: `rotate(${direction}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id="monsterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="50" cy="50" r="48" fill="url(#monsterGlow)" />

          <ellipse cx="50" cy="55" rx="32" ry="28" fill="#7C3AED" />

          <circle cx="50" cy="45" r="28" fill="#8B5CF6" />

          <ellipse
            cx="65"
            cy="25"
            rx="8"
            ry="15"
            fill="#8B5CF6"
            transform="rotate(20, 65, 25)"
          />
          <ellipse
            cx="35"
            cy="25"
            rx="8"
            ry="15"
            fill="#8B5CF6"
            transform="rotate(-20, 35, 25)"
          />

          <ellipse
            cx="65"
            cy="25"
            rx="4"
            ry="8"
            fill="#A78BFA"
            transform="rotate(20, 65, 25)"
          />
          <ellipse
            cx="35"
            cy="25"
            rx="4"
            ry="8"
            fill="#A78BFA"
            transform="rotate(-20, 35, 25)"
          />

          {isResting ? (
            <>
              <path
                d="M 30 42 Q 38 38 46 42"
                fill="none"
                stroke="#1F1F1F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 54 42 Q 62 38 70 42"
                fill="none"
                stroke="#1F1F1F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="50"
                y="20"
                textAnchor="middle"
                fontSize="12"
                fill="white"
              >
                💤
              </text>
            </>
          ) : (
            <>
              <ellipse cx="38" cy="42" rx="10" ry="12" fill="#1F1F1F" />
              <ellipse cx="62" cy="42" rx="10" ry="12" fill="#1F1F1F" />

              <ellipse cx="40" cy="40" rx="5" ry="6" fill="#EF4444">
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="64" cy="40" rx="5" ry="6" fill="#EF4444">
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </ellipse>

              <circle cx="42" cy="38" r="2" fill="white" />
              <circle cx="66" cy="38" r="2" fill="white" />
            </>
          )}

          <path
            d="M 35 60 L 40 55 L 45 60 L 50 55 L 55 60 L 60 55 L 65 60"
            fill="none"
            stroke="#1F1F1F"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M 25 75 Q 20 85 25 90"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 75 75 Q 80 85 75 90"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <ellipse cx="30" cy="82" rx="10" ry="6" fill="#6D28D9" />
          <ellipse cx="70" cy="82" rx="10" ry="6" fill="#6D28D9" />
        </svg>
      </div>

      <div
        className={`absolute inset-0 rounded-full blur-md -z-10 scale-125 ${
          isResting ? "bg-blue-500/20" : "bg-purple-500/30 animate-pulse"
        }`}
      />
    </div>
  );
});

export default Monster;
