import { memo, useEffect, useState } from "react";
import { ALGORITHMS } from "../../utils/constants";

const WinModal = memo(function WinModal({
  isOpen,
  onPlayAgain,
  moves,
  totalCost,
  algorithm,
}) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#FFE66D",
        "#95E1D3",
        "#F38181",
        "#AA96DA",
      ];
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
      }));
      setConfetti(newConfetti);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showCost = algorithm === ALGORITHMS.UCS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onPlayAgain}
      />

      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti rounded-full"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      <div className="modal-content relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-8 mx-4 max-w-md w-full shadow-2xl border-2 border-purple-500/30">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="text-7xl animate-bounce">🏆</div>
        </div>

        <div className="text-center pt-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4">
            مبروووك! 🎉
          </h2>

          <p className="text-gray-300 text-lg mb-4">
            لقد نجحت في الخروج من المتاهة!
          </p>

          <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">عدد الخطوات:</span>
              <span className="text-blue-400 font-bold text-xl">{moves}</span>
            </div>

            {showCost && (
              <div className="flex justify-between items-center border-t border-gray-700 pt-2">
                <span className="text-gray-400">التكلفة الكلية:</span>
                <span className="text-yellow-400 font-bold text-xl">
                  {totalCost}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 100 100" className="w-24 h-24 animate-bounce">
              <ellipse cx="50" cy="60" rx="35" ry="30" fill="#FF6B6B" />
              <circle cx="50" cy="35" r="28" fill="#FF6B6B" />
              <polygon points="25,20 15,0 35,15" fill="#FF6B6B" />
              <polygon points="27,18 20,5 33,16" fill="#FFB3B3" />
              <polygon points="75,20 85,0 65,15" fill="#FF6B6B" />
              <polygon points="73,18 80,5 67,16" fill="#FFB3B3" />
              <path
                d="M 30 32 Q 38 28 46 32"
                fill="none"
                stroke="#2D3436"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 54 32 Q 62 28 70 32"
                fill="none"
                stroke="#2D3436"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <ellipse
                cx="25"
                cy="42"
                rx="8"
                ry="5"
                fill="#FFB3B3"
                opacity="0.8"
              />
              <ellipse
                cx="75"
                cy="42"
                rx="8"
                ry="5"
                fill="#FFB3B3"
                opacity="0.8"
              />
              <path
                d="M 35 45 Q 50 65 65 45"
                fill="#FF8E8E"
                stroke="#2D3436"
                strokeWidth="2"
              />
              <text x="10" y="15" fontSize="12">
                ⭐
              </text>
              <text x="80" y="15" fontSize="12">
                ⭐
              </text>
              <text x="45" y="5" fontSize="10">
                ✨
              </text>
            </svg>
          </div>

          <button
            onClick={onPlayAgain}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              متاهة جديدة
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </button>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="text-2xl animate-pulse">🌟</span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            💫
          </span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            🌟
          </span>
        </div>
      </div>
    </div>
  );
});

export default WinModal;
