import { memo, useEffect, useState } from "react";

const LoseModal = memo(function LoseModal({ isOpen, onPlayAgain, moves }) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onPlayAgain}
      />

      <div
        className={`modal-content relative bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 rounded-3xl p-8 mx-4 max-w-md w-full shadow-2xl border-2 border-red-500/30 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="text-7xl animate-bounce">👾</div>
        </div>

        <div className="text-center pt-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 mb-4">
            أوووبس! 💀
          </h2>

          <p className="text-gray-300 text-lg mb-2">الوحش أمسك بك!</p>

          <p className="text-gray-400 mb-6">
            وصلت إلى{" "}
            <span className="text-red-400 font-bold text-xl">{moves}</span> خطوة
          </p>

          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <ellipse cx="50" cy="60" rx="35" ry="30" fill="#6B7280" />
              <circle cx="50" cy="35" r="28" fill="#9CA3AF" />
              <polygon points="25,20 15,0 35,15" fill="#9CA3AF" />
              <polygon points="75,20 85,0 65,15" fill="#9CA3AF" />
              <line
                x1="30"
                y1="30"
                x2="45"
                y2="40"
                stroke="#374151"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="45"
                y1="30"
                x2="30"
                y2="40"
                stroke="#374151"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="55"
                y1="30"
                x2="70"
                y2="40"
                stroke="#374151"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="70"
                y1="30"
                x2="55"
                y2="40"
                stroke="#374151"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 35 55 Q 50 45 65 55"
                fill="none"
                stroke="#374151"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 30 15 Q 25 5 35 8"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="3"
              />
              <path
                d="M 70 15 Q 75 5 65 8"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="3"
              />
            </svg>
          </div>

          <button
            onClick={onPlayAgain}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-500/50"
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
              حاول مرة أخرى
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </button>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="text-2xl animate-pulse">💔</span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            😿
          </span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            💔
          </span>
        </div>
      </div>
    </div>
  );
});

export default LoseModal;
