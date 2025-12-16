import { useCallback, useEffect } from "react";
import GameLayout from "./components/layout/GameLayout";
import Maze from "./components/maze/Maze";
import GameControls from "./components/ui/GameControls";
import WinModal from "./components/ui/WinModal";
import LoseModal from "./components/ui/LoseModal";
import { useMaze } from "./hooks/useMaze";
import { usePlayer } from "./hooks/usePlayer";
import { useMonsters } from "./hooks/useMonsters";
import { useKeyboard } from "./hooks/useKeyboard";
import { GAME_STATUS } from "./utils/constants";

function App() {
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
  } = usePlayer(mazeData, incrementMoves, setWin, []);

  const { monsters, resetMonsters } = useMonsters(
    mazeData,
    position,
    gameState.status,
    setLose
  );

  useEffect(() => {
    updateMonsters(monsters);
  }, [monsters, updateMonsters]);

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
        <div className="flex flex-col items-center">
          <GameControls onRestart={regenerateMaze} />

          <Maze
            mazeData={mazeData}
            playerPosition={position}
            playerDirection={direction}
            visitedCells={visitedCells}
            monsters={monsters}
            isWinner={gameState.status === GAME_STATUS.WON}
          />

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-purple-400">
              <span>👾</span>
              <span>الوحوش: {monsters.length}</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span>⭐</span>
              <span>اوصل للنجمة!</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <span>💤</span>
              <span>راحة 5 ثواني</span>
            </div>
          </div>
        </div>
      </GameLayout>

      <WinModal
        isOpen={gameState.status === GAME_STATUS.WON}
        onPlayAgain={handlePlayAgain}
        moves={gameState.moves}
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
