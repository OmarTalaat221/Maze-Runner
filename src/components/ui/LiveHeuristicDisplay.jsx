import { memo, useMemo } from "react";
import { ALGORITHMS } from "../../utils/constants";

const LiveHeuristicDisplay = memo(function LiveHeuristicDisplay({
  algorithm,
  currentPath,
  totalCost,
}) {
  const showHeuristic =
    algorithm === ALGORITHMS.A_STAR_MANHATTAN ||
    algorithm === ALGORITHMS.A_STAR_DANGER;

  if (!showHeuristic || currentPath.length === 0) return null;

  // حساب القيم التراكمية
  const pathAnalysis = useMemo(() => {
    let totalG = 0;
    let avgH = 0;
    let totalF = 0;

    currentPath.forEach((step, index) => {
      totalG += step.cost || 0;
      if (step.h !== undefined) {
        avgH += step.h;
        totalF += (step.cost || 0) + step.h;
      }
    });

    avgH = avgH / currentPath.length;

    return {
      totalG: Math.floor(totalG),
      avgH: Math.floor(avgH),
      totalF: Math.floor(totalF),
      steps: currentPath.length,
    };
  }, [currentPath]);

  return (
    <div className="mb-4 flex gap-3 items-stretch">
      {/* g(n) الكلي */}
      <div className="flex-1 bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-xl p-4 border-2 border-blue-500/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-sm font-medium">g(n) الكلي</span>
        </div>
        <div className="text-white text-3xl font-bold">
          {pathAnalysis.totalG}
        </div>
        <div className="text-blue-300 text-xs mt-1">التكلفة الفعلية الكلية</div>
      </div>

      {/* h(n) المتوسط */}
      <div className="flex-1 bg-gradient-to-br from-purple-600/20 to-purple-900/20 rounded-xl p-4 border-2 border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-purple-400 text-sm font-medium">
            h(n) المتوسط
          </span>
        </div>
        <div className="text-white text-3xl font-bold">{pathAnalysis.avgH}</div>
        <div className="text-purple-300 text-xs mt-1">متوسط التقدير للهدف</div>
      </div>

      {/* f(n) الكلي */}
      <div className="flex-1 bg-gradient-to-br from-pink-600/20 to-rose-900/20 rounded-xl p-4 border-2 border-pink-500/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <span className="text-pink-400 text-sm font-medium">f(n) الكلي</span>
        </div>
        <div className="text-white text-3xl font-bold">
          {pathAnalysis.totalF}
        </div>
        <div className="text-pink-300 text-xs mt-1">
          التكلفة المتوقعة الكلية
        </div>
      </div>
    </div>
  );
});

export default LiveHeuristicDisplay;
