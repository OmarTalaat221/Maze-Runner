import { useCallback, useEffect } from "react";
import GameLayout from "./components/layout/GameLayout";
import Maze from "./components/maze/Maze";
import GameControls from "./components/ui/GameControls";
import WinModal from "./components/ui/WinModal";
import { useMaze } from "./hooks/useMaze";
import { usePlayer } from "./hooks/usePlayer";
import { useKeyboard } from "./hooks/useKeyboard";

function App() {
  const { mazeData, gameState, regenerateMaze, incrementMoves, setWin } =
    useMaze();

  const { position, direction, visitedCells, move, resetPosition } = usePlayer(
    mazeData,
    incrementMoves,
    setWin
  );

  // التعامل مع الحركة
  const handleMove = useCallback(
    (dx, dy, rotation) => {
      if (!gameState.isWon) {
        move(dx, dy, rotation);
      }
    },
    [move, gameState.isWon]
  );

  // ربط لوحة المفاتيح
  useKeyboard(handleMove, !gameState.isWon);

  // إعادة تعيين موقع اللاعب عند تغيير المتاهة
  useEffect(() => {
    resetPosition();
  }, [mazeData, resetPosition]);

  // إعادة اللعب
  const handlePlayAgain = useCallback(() => {
    regenerateMaze();
  }, [regenerateMaze]);

  return (
    <>
      <GameLayout title="Maze Runner">
        <div className="flex flex-col items-center">
          <GameControls onRestart={regenerateMaze} />

          <Maze
            mazeData={mazeData}
            playerPosition={position}
            playerDirection={direction}
            visitedCells={visitedCells}
            isWinner={gameState.isWon}
          />
        </div>
      </GameLayout>

      {/* مودال الفوز */}
      <WinModal
        isOpen={gameState.isWon}
        onPlayAgain={handlePlayAgain}
        moves={gameState.moves}
      />
    </>
  );
}

export default App;
