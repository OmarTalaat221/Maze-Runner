import { memo } from "react";

/**
 * أزرار التحكم في اللعبة - مبسط
 */
const GameControls = memo(function GameControls({ onRestart }) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={onRestart}
        className="group flex items-center gap-2 px-5 py-2.5 
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:from-indigo-500 hover:to-purple-500
                   text-white font-medium rounded-xl 
                   transform transition-all duration-300 hover:scale-105
                   shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <svg
          className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
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
      </button>
    </div>
  );
});

export default GameControls;
