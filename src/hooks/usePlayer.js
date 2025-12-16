import { useState, useCallback, useRef } from "react";
import { canMoveTo } from "../utils/mazeGenerator";
import { analyzePlayerMove } from "../utils/pathfinding";
import { CELL_TYPES } from "../utils/constants";

export function usePlayer(mazeData, onMove, onWin, monsters) {
  const [position, setPosition] = useState(mazeData.start);
  const [direction, setDirection] = useState(0);
  const [visitedCells, setVisitedCells] = useState(
    new Set([`${mazeData.start.x},${mazeData.start.y}`])
  );

  const monstersRef = useRef(monsters);

  const updateMonsters = useCallback((newMonsters) => {
    monstersRef.current = newMonsters;
  }, []);

  const move = useCallback(
    (dx, dy, rotation) => {
      setDirection(rotation);

      setPosition((current) => {
        const newX = current.x + dx;
        const newY = current.y + dy;

        if (!canMoveTo(mazeData, newX, newY)) {
          return current;
        }

        const newPos = { x: newX, y: newY };

        analyzePlayerMove(mazeData, current, newPos, monstersRef.current || []);

        setVisitedCells((prev) => new Set([...prev, `${newX},${newY}`]));

        onMove?.();

        if (mazeData.grid[newY][newX] === CELL_TYPES.EXIT) {
          onWin?.();
        }

        return newPos;
      });
    },
    [mazeData, onMove, onWin]
  );

  const resetPosition = useCallback(() => {
    setPosition(mazeData.start);
    setDirection(0);
    setVisitedCells(new Set([`${mazeData.start.x},${mazeData.start.y}`]));
  }, [mazeData.start]);

  return {
    position,
    direction,
    visitedCells,
    move,
    resetPosition,
    updateMonsters,
  };
}
