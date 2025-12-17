import { useState, useCallback } from "react";
import { generateMaze } from "../utils/mazeGenerator";
import { GAME_CONFIG, GAME_STATUS } from "../utils/constants";

export function useMaze() {
  const [mazeData, setMazeData] = useState(() =>
    generateMaze(GAME_CONFIG.MAZE_WIDTH, GAME_CONFIG.MAZE_HEIGHT)
  );

  const [gameState, setGameState] = useState({
    status: GAME_STATUS.PLAYING,
    moves: 0,
    totalCost: 0,
    startTime: Date.now(),
  });

  const regenerateMaze = useCallback(() => {
    console.log("\n" + "🎮".repeat(20));
    console.log("NEW GAME STARTED");
    console.log("🎮".repeat(20) + "\n");
    setMazeData(generateMaze(GAME_CONFIG.MAZE_WIDTH, GAME_CONFIG.MAZE_HEIGHT));
    setGameState({
      status: GAME_STATUS.PLAYING,
      moves: 0,
      totalCost: 0,
      startTime: Date.now(),
    });
  }, []);

  const incrementMoves = useCallback((cost = 1) => {
    setGameState((prev) => ({
      ...prev,
      moves: prev.moves + 1,
      totalCost: prev.totalCost + cost,
    }));
  }, []);

  const setWin = useCallback(() => {
    console.log("🏆 VICTORY!");
    setGameState((prev) => ({ ...prev, status: GAME_STATUS.WON }));
  }, []);

  const setLose = useCallback(() => {
    console.log("💀 DEFEAT!");
    setGameState((prev) => ({ ...prev, status: GAME_STATUS.LOST }));
  }, []);

  return {
    mazeData,
    gameState,
    regenerateMaze,
    incrementMoves,
    setWin,
    setLose,
  };
}
