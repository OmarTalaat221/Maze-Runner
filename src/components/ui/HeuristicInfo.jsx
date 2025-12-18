import { memo } from "react";
import { ALGORITHMS } from "../../utils/constants";

const HeuristicInfo = memo(function HeuristicInfo({
  algorithm,
  currentPath,
  playerPosition,
  mazeData,
}) {
  const showHeuristic =
    algorithm === ALGORITHMS.A_STAR_MANHATTAN ||
    algorithm === ALGORITHMS.A_STAR_DANGER;

  if (!showHeuristic || currentPath.length === 0) return null;

  // حساب القيم الحالية
  const nextStep = currentPath[0];
  const totalPathCost = currentPath.reduce(
    (sum, step) => sum + (step.cost || 0),
    0
  );

  // g(n) = التكلفة من البداية للخطوة التالية
  const gValue = nextStep.cost || 0;

  // h(n) = المسافة التقديرية
  const hValue = nextStep.h || 0;

  // f(n) = g(n) + h(n)
  const fValue = gValue + hValue;

  return (
    <div className="mb-4 w-full max-w-4xl">
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-4 border border-indigo-500/30 backdrop-blur-sm">
        {/* العنوان */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🧮</span>
          <h3 className="text-white font-bold">
            {algorithm === ALGORITHMS.A_STAR_MANHATTAN
              ? "A* Manhattan"
              : "A* Danger Aware"}
          </h3>
        </div>

        {/* الشرح */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* g(n) */}
          <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-500/30">
            <div className="text-blue-400 text-xs mb-1">
              g(n) - التكلفة الفعلية
            </div>
            <div className="text-white text-2xl font-bold">{gValue}</div>
            <div className="text-gray-400 text-xs mt-1">
              من البداية للخطوة التالية
            </div>
          </div>

          {/* h(n) */}
          <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/30">
            <div className="text-purple-400 text-xs mb-1">h(n) - التقدير</div>
            <div className="text-white text-2xl font-bold">
              {Math.floor(hValue)}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {algorithm === ALGORITHMS.A_STAR_MANHATTAN
                ? "مسافة Manhattan للهدف"
                : "مسافة + خطر الوحوش"}
            </div>
          </div>

          {/* f(n) */}
          <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-lg p-3 border border-pink-500/30">
            <div className="text-pink-400 text-xs mb-1">f(n) = g(n) + h(n)</div>
            <div className="text-white text-2xl font-bold">
              {Math.floor(fValue)}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              التكلفة الكلية المتوقعة
            </div>
          </div>
        </div>

        {/* المعادلة */}
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
          <code className="text-green-400 text-sm font-mono">
            f({nextStep.x},{nextStep.y}) = g({gValue}) + h({Math.floor(hValue)})
            = {Math.floor(fValue)}
          </code>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-3 flex justify-between text-xs text-gray-400">
          <div>
            التكلفة الكلية للمسار:{" "}
            <span className="text-yellow-400 font-bold">{totalPathCost}</span>
          </div>
          <div>
            عدد الخطوات:{" "}
            <span className="text-blue-400 font-bold">
              {currentPath.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeuristicInfo;
