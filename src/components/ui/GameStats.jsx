import { memo } from "react";
import { ALGORITHMS } from "../../utils/constants";

const GameStats = memo(function GameStats({ moves, totalCost, algorithm }) {
  const showCost =
    algorithm === ALGORITHMS.UCS ||
    algorithm === ALGORITHMS.IDS ||
    algorithm === ALGORITHMS.A_STAR_MANHATTAN ||
    algorithm === ALGORITHMS.A_STAR_DANGER ||
    algorithm === ALGORITHMS.HILL_CLIMBING;

  return (
    <div className="mb-4 flex gap-4">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
        <div className="text-gray-400 text-xs mb-1">الحركات</div>
        <div className="text-2xl font-bold text-blue-400">{moves}</div>
      </div>

      {showCost && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-yellow-500/30">
          <div className="text-gray-400 text-xs mb-1">التكلفة الكلية</div>
          <div className="text-2xl font-bold text-yellow-400">{totalCost}</div>
        </div>
      )}
    </div>
  );
});

export default GameStats;
