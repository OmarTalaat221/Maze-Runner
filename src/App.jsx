import { useCallback, useEffect, useState, useMemo } from "react";
import GameLayout from "./components/layout/GameLayout";
import Maze from "./components/maze/Maze";
import GameControls from "./components/ui/GameControls";
import GameStats from "./components/ui/GameStats";
import AlgorithmTabs from "./components/ui/AlgorithmTabs";
import ControlPanel from "./components/ui/ControlPanel";
import HeuristicInfo from "./components/ui/HeuristicInfo";
import LiveHeuristicDisplay from "./components/ui/LiveHeuristicDisplay";
import PathStepsViewer from "./components/ui/PathStepsViewer";
import AlgorithmExplainer from "./components/ui/Sidebar";
import WinModal from "./components/ui/WinModal";
import LoseModal from "./components/ui/LoseModal";
import { useMaze } from "./hooks/useMaze";
import { usePlayer } from "./hooks/usePlayer";
import { useMonsters } from "./hooks/useMonsters";
import { useKeyboard } from "./hooks/useKeyboard";
import { getPath, setConsoleEnabled } from "./utils/pathfinding";
import { GAME_STATUS, ALGORITHMS } from "./utils/constants";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS.BFS);
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [consoleEnabled, setConsoleEnabledState] = useState(true);

  const {
    mazeData,
    gameState,
    regenerateMaze,
    incrementMoves,
    setWin,
    setLose,
  } = useMaze();

  const {
    position,
    direction,
    visitedCells,
    move,
    resetPosition,
    updateMonsters,
    updateAlgorithm,
  } = usePlayer(mazeData, incrementMoves, setWin, [], selectedAlgorithm);

  const { monsters, resetMonsters } = useMonsters(
    mazeData,
    position,
    gameState.status,
    setLose
  );

  const currentPath = useMemo(() => {
    if (gameState.status !== GAME_STATUS.PLAYING) return [];
    const result = getPath(mazeData, position, selectedAlgorithm, monsters);
    return result.path || [];
  }, [mazeData, position, selectedAlgorithm, gameState.status, monsters]);

  useEffect(() => {
    updateMonsters(monsters);
  }, [monsters, updateMonsters]);

  useEffect(() => {
    updateAlgorithm(selectedAlgorithm);
  }, [selectedAlgorithm, updateAlgorithm]);

  useEffect(() => {
    setConsoleEnabled(consoleEnabled);
  }, [consoleEnabled]);

  const handleMove = useCallback(
    (dx, dy, rotation) => {
      if (gameState.status === GAME_STATUS.PLAYING) {
        move(dx, dy, rotation);
      }
    },
    [move, gameState.status]
  );

  useKeyboard(handleMove, gameState.status === GAME_STATUS.PLAYING);

  useEffect(() => {
    resetPosition();
    resetMonsters();
  }, [mazeData, resetPosition, resetMonsters]);

  const handlePlayAgain = useCallback(() => {
    regenerateMaze();
  }, [regenerateMaze]);

  return (
    <>
      <GameLayout title="🎮 لعبة المتاهة">
        <div className="flex flex-col items-center w-full">
          <AlgorithmTabs
            selected={selectedAlgorithm}
            onSelect={setSelectedAlgorithm}
          />

          <ControlPanel
            onOpenExplainer={() => setExplainerOpen(true)}
            consoleEnabled={consoleEnabled}
            onToggleConsole={setConsoleEnabledState}
          />

          {/* عرض القيم الحية للـ Heuristic */}
          <LiveHeuristicDisplay
            algorithm={selectedAlgorithm}
            currentPath={currentPath}
            totalCost={gameState.totalCost}
          />

          {/* معلومات الخطوة التالية */}
          <HeuristicInfo
            algorithm={selectedAlgorithm}
            currentPath={currentPath}
            playerPosition={position}
            mazeData={mazeData}
          />

          <GameStats
            moves={gameState.moves}
            totalCost={gameState.totalCost}
            algorithm={selectedAlgorithm}
          />

          <GameControls onRestart={regenerateMaze} />

          <Maze
            mazeData={mazeData}
            playerPosition={position}
            playerDirection={direction}
            visitedCells={visitedCells}
            monsters={monsters}
            isWinner={gameState.status === GAME_STATUS.WON}
            algorithm={selectedAlgorithm}
            currentPath={currentPath}
          />

          {/* عرض تفاصيل المسار */}
          <PathStepsViewer
            algorithm={selectedAlgorithm}
            currentPath={currentPath}
          />

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-purple-400">
              <span>👾</span>
              <span>الوحوش: {monsters.length}</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span>🟢</span>
              <span>المسار الأمثل</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span>⭐</span>
              <span>الهدف</span>
            </div>
          </div>
        </div>
      </GameLayout>

      <AlgorithmExplainer
        algorithm={selectedAlgorithm}
        isOpen={explainerOpen}
        onClose={() => setExplainerOpen(false)}
      />

      <WinModal
        isOpen={gameState.status === GAME_STATUS.WON}
        onPlayAgain={handlePlayAgain}
        moves={gameState.moves}
        totalCost={gameState.totalCost}
        algorithm={selectedAlgorithm}
      />

      <LoseModal
        isOpen={gameState.status === GAME_STATUS.LOST}
        onPlayAgain={handlePlayAgain}
        moves={gameState.moves}
      />
    </>
  );
}

export default App;
