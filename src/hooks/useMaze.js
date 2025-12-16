import { useState, useCallback, useMemo } from "react";
import { generateMaze } from "../utils/mazeGenerator";
import { GAME_CONFIG } from "../utils/constants";

/**
 * Hook لإدارة حالة المتاهة
 */
export function useMaze() {
  const [mazeData, setMazeData] = useState(() =>
    generateMaze(GAME_CONFIG.MAZE_WIDTH, GAME_CONFIG.MAZE_HEIGHT)
  );

  const [gameState, setGameState] = useState({
    isWon: false,
    moves: 0,
    startTime: Date.now(),
  });

  const regenerateMaze = useCallback(() => {
    setMazeData(generateMaze(GAME_CONFIG.MAZE_WIDTH, GAME_CONFIG.MAZE_HEIGHT));
    setGameState({
      isWon: false,
      moves: 0,
      startTime: Date.now(),
    });
  }, []);

  const incrementMoves = useCallback(() => {
    setGameState((prev) => ({ ...prev, moves: prev.moves + 1 }));
  }, []);

  const setWin = useCallback(() => {
    setGameState((prev) => ({ ...prev, isWon: true }));
  }, []);

  return {
    mazeData,
    gameState,
    regenerateMaze,
    incrementMoves,
    setWin,
  };
}
