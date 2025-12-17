import { memo } from "react";
import { ALGORITHMS, ALGORITHM_NAMES } from "../../utils/constants";

const AlgorithmTabs = memo(function AlgorithmTabs({ selected, onSelect }) {
  const tabs = [
    { id: ALGORITHMS.BFS, name: "BFS", color: "blue" },
    { id: ALGORITHMS.DFS, name: "DFS", color: "green" },
    { id: ALGORITHMS.UCS, name: "UCS", color: "yellow" },
    { id: ALGORITHMS.IDS, name: "IDS", color: "purple", disabled: true },
    {
      id: ALGORITHMS.A_STAR_MANHATTAN,
      name: "A* (Manhattan)",
      color: "pink",
      disabled: true,
    },
    {
      id: ALGORITHMS.A_STAR_DANGER,
      name: "A* (Danger)",
      color: "red",
      disabled: true,
    },
    {
      id: ALGORITHMS.HILL_CLIMBING,
      name: "Hill Climbing",
      color: "orange",
      disabled: true,
    },
  ];

  return (
    <div className="mb-4 w-full max-w-4xl">
      <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
        <h3 className="text-gray-300 text-sm mb-3">اختر الخوارزمية:</h3>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onSelect(tab.id)}
              disabled={tab.disabled}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                ${
                  selected === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                    : tab.disabled
                    ? "bg-slate-700/50 text-gray-500 cursor-not-allowed"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-3 text-gray-400 text-xs">
          {ALGORITHM_NAMES[selected]}
        </div>
      </div>
    </div>
  );
});

export default AlgorithmTabs;
