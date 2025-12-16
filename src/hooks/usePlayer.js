import { useState, useCallback } from "react";
import { canMoveTo } from "../utils/mazeGenerator";
import { CELL_TYPES } from "../utils/constants";

/**
 * Hook لإدارة حركة اللاعب مع تتبع الاتجاه
 */
export function usePlayer(mazeData, onMove, onWin) {
  const [position, setPosition] = useState(mazeData.start);
  const [direction, setDirection] = useState(0); // زاوية الدوران (0 = يمين)
  const [visitedCells, setVisitedCells] = useState(
    new Set([`${mazeData.start.x},${mazeData.start.y}`])
  );

  const move = useCallback(
    (dx, dy, rotation) => {
      // تحديث الاتجاه دائماً حتى لو ما قدرنا نتحرك
      setDirection(rotation);

      setPosition((current) => {
        const newX = current.x + dx;
        const newY = current.y + dy;

        if (!canMoveTo(mazeData, newX, newY)) {
          return current; // ما نقدر نتحرك، بس الاتجاه اتغير
        }

        const newPos = { x: newX, y: newY };

        // تسجيل الخلية كمزورة
        setVisitedCells((prev) => new Set([...prev, `${newX},${newY}`]));

        // إضافة عدد الحركات
        onMove?.();

        // التحقق من الفوز
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
  };
}
