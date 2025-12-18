import { memo, useState } from "react";
import { ALGORITHMS } from "../../utils/constants";

const PathStepsViewer = memo(function PathStepsViewer({
  algorithm,
  currentPath,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const showHeuristic =
    algorithm === ALGORITHMS.A_STAR_MANHATTAN ||
    algorithm === ALGORITHMS.A_STAR_DANGER ||
    algorithm === ALGORITHMS.HILL_CLIMBING;

  if (!showHeuristic || currentPath.length === 0) return null;

  const steps = currentPath.slice(0, 10); // أول 10 خطوات

  return (
    <div className="mb-4 w-full max-w-4xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-3 border border-slate-700 transition-all duration-200 flex items-center justify-between"
      >
        <span className="text-white font-medium flex items-center gap-2">
          <span>🗺️</span>
          تفاصيل المسار (أول {steps.length} خطوات)
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2 bg-slate-900/50 rounded-xl p-4 border border-slate-700 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">
                    خطوة {index + 1}: {step.dir}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({step.x}, {step.y})
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {/* التكلفة */}
                  {step.cost !== undefined && (
                    <div className="bg-blue-900/20 rounded px-2 py-1">
                      <span className="text-blue-400">Cost: </span>
                      <span className="text-white font-bold">{step.cost}</span>
                    </div>
                  )}

                  {/* h(n) */}
                  {step.h !== undefined && (
                    <div className="bg-purple-900/20 rounded px-2 py-1">
                      <span className="text-purple-400">h(n): </span>
                      <span className="text-white font-bold">
                        {Math.floor(step.h)}
                      </span>
                    </div>
                  )}

                  {/* g(n) - نحسبه من التراكم */}
                  {step.cost !== undefined && step.h !== undefined && (
                    <>
                      <div className="bg-green-900/20 rounded px-2 py-1">
                        <span className="text-green-400">g(n): </span>
                        <span className="text-white font-bold">
                          {currentPath
                            .slice(0, index + 1)
                            .reduce((sum, s) => sum + (s.cost || 0), 0)}
                        </span>
                      </div>

                      {/* f(n) */}
                      <div className="bg-pink-900/20 rounded px-2 py-1">
                        <span className="text-pink-400">f(n): </span>
                        <span className="text-white font-bold">
                          {Math.floor(
                            currentPath
                              .slice(0, index + 1)
                              .reduce((sum, s) => sum + (s.cost || 0), 0) +
                              step.h
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* شريط التقدم */}
                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            {currentPath.length > 10 && (
              <div className="text-center text-gray-500 text-sm py-2">
                ... و {currentPath.length - 10} خطوة أخرى
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default PathStepsViewer;
