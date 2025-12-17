import { memo } from "react";
import { GAME_CONFIG } from "../../utils/constants";

const Player = memo(function Player({
  position,
  direction = 0,
  cellSize = GAME_CONFIG.CELL_SIZE,
  isWinner = false,
}) {
  const playerSize = cellSize * 0.85;
  const offset = (cellSize - playerSize) / 2;

  return (
    <div
      className={`player absolute z-10 ${isWinner ? "player-celebrate" : ""}`}
      style={{
        width: playerSize,
        height: playerSize,
        left: 0,
        top: 0,
        transform: `translate(${position.x * cellSize + offset}px, ${
          position.y * cellSize + offset
        }px)`,
        transition: "transform 0.08s ease-out",
      }}
    >
      <div
        className="w-full h-full transition-transform duration-150 ease-out"
        style={{ transform: `rotate(${direction}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <ellipse cx="50" cy="65" rx="28" ry="22" fill="#FF6B6B" />
          <path
            d="M 25 65 Q 5 55 10 35"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 25 65 Q 5 55 10 35"
            fill="none"
            stroke="#FF8E8E"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="70" cy="50" r="26" fill="#FF6B6B" />
          <polygon points="55,30 45,10 65,25" fill="#FF6B6B" />
          <polygon points="57,30 50,15 63,27" fill="#FFB3B3" />
          <polygon points="55,70 45,90 65,75" fill="#FF6B6B" />
          <polygon points="57,70 50,85 63,73" fill="#FFB3B3" />
          <ellipse cx="80" cy="45" rx="8" ry="10" fill="white" />
          <ellipse cx="82" cy="46" rx="4" ry="5" fill="#2D3436" />
          <circle cx="84" cy="44" r="2" fill="white" />
          <ellipse cx="72" cy="43" rx="5" ry="7" fill="white" />
          <ellipse cx="73" cy="44" rx="3" ry="4" fill="#2D3436" />
          <circle cx="74" cy="42" r="1.5" fill="white" />
          <ellipse cx="92" cy="50" rx="4" ry="3" fill="#FF8E8E" />
          <path
            d="M 88 54 Q 92 58 96 54"
            fill="none"
            stroke="#2D3436"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="48"
            x2="100"
            y2="45"
            stroke="#2D3436"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="90"
            y1="52"
            x2="100"
            y2="52"
            stroke="#2D3436"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="90"
            y1="56"
            x2="100"
            y2="58"
            stroke="#2D3436"
            strokeWidth="1"
            opacity="0.6"
          />
          <ellipse cx="85" cy="58" rx="5" ry="3" fill="#FFB3B3" opacity="0.6" />
          <ellipse cx="75" cy="82" rx="8" ry="6" fill="#FF8E8E" />
          <ellipse cx="35" cy="82" rx="10" ry="7" fill="#FF8E8E" />
          {isWinner && (
            <g className="animate-pulse">
              <polygon
                points="70,20 72,26 78,26 73,30 75,36 70,32 65,36 67,30 62,26 68,26"
                fill="#FFD700"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
});

export default Player;
