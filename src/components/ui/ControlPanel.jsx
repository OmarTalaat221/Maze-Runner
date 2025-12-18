import { memo } from "react";

const ControlPanel = memo(function ControlPanel({
  onOpenExplainer,
  consoleEnabled,
  onToggleConsole,
}) {
  return (
    <div className="mb-4 flex gap-3">
      {/* زر شرح الخوارزمية */}
      <button
        onClick={onOpenExplainer}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        شرح الخوارزمية
      </button>

      {/* Toggle للكونسول */}
      <label className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-700/50 transition-all duration-200">
        <input
          type="checkbox"
          checked={consoleEnabled}
          onChange={(e) => onToggleConsole(e.target.checked)}
          className="w-4 h-4 accent-blue-500"
        />
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-gray-300 text-sm">شرح الكونسول</span>
      </label>
    </div>
  );
});

export default ControlPanel;
