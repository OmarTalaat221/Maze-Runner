import { useState, useEffect, useCallback } from "react";
import { GAME_CONFIG, GAME_STATUS, CELL_TYPES } from "../utils/constants";

export function useMonsters(
  mazeData,
  playerPosition,
  gameStatus,
  onCatchPlayer
) {
  const [monsters, setMonsters] = useState(() =>
    mazeData.monsterSpawns.map((spawn, index) => ({
      id: index,
      position: { ...spawn },
      direction: 0,
      moveCount: 0,
      isResting: false,
    }))
  );

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setMonsters((currentMonsters) => {
          return currentMonsters.map((monster) => {
            if (monster.isResting) {
              return monster;
            }

            if (monster.moveCount >= GAME_CONFIG.MONSTER_REST_EVERY) {
              setTimeout(() => {
                setMonsters((prev) =>
                  prev.map((m) =>
                    m.id === monster.id
                      ? { ...m, isResting: false, moveCount: 0 }
                      : m
                  )
                );
              }, GAME_CONFIG.MONSTER_REST_TIME);

              return { ...monster, isResting: true };
            }

            const nextPos = getRandomMove(mazeData, monster.position);

            let direction = 0;
            if (nextPos.x > monster.position.x) direction = 0;
            else if (nextPos.x < monster.position.x) direction = 180;
            else if (nextPos.y > monster.position.y) direction = 90;
            else if (nextPos.y < monster.position.y) direction = -90;

            return {
              ...monster,
              position: nextPos,
              direction,
              moveCount: monster.moveCount + 1,
            };
          });
        });
      }, GAME_CONFIG.MONSTER_SPEED);

      return () => clearInterval(interval);
    }, GAME_CONFIG.MONSTER_START_DELAY);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [mazeData, gameStatus]);

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;

    const caught = monsters.some(
      (m) =>
        !m.isResting &&
        m.position.x === playerPosition.x &&
        m.position.y === playerPosition.y
    );

    if (caught) {
      onCatchPlayer?.();
    }
  }, [monsters, playerPosition, gameStatus, onCatchPlayer]);

  const resetMonsters = useCallback(() => {
    setMonsters(
      mazeData.monsterSpawns.map((spawn, index) => ({
        id: index,
        position: { ...spawn },
        direction: 0,
        moveCount: 0,
        isResting: false,
      }))
    );
  }, [mazeData.monsterSpawns]);

  return {
    monsters,
    resetMonsters,
  };
}

function getRandomMove(maze, currentPos) {
  const { grid, width, height } = maze;

  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const validMoves = [];

  for (const dir of directions) {
    const newX = currentPos.x + dir.x;
    const newY = currentPos.y + dir.y;

    if (
      newX >= 0 &&
      newX < width &&
      newY >= 0 &&
      newY < height &&
      grid[newY][newX] !== CELL_TYPES.WALL
    ) {
      validMoves.push({ x: newX, y: newY });
    }
  }

  if (validMoves.length === 0) {
    return currentPos;
  }

  const randomIndex = Math.floor(Math.random() * validMoves.length);
  return validMoves[randomIndex];
}
