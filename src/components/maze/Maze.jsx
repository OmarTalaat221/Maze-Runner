import { memo, useMemo } from "react";
import Cell from "./Cell";
import Player from "./Player";
import Monster from "./Monster";
import { GAME_CONFIG, ALGORITHMS } from "../../utils/constants";

const Maze = memo(function Maze({
  mazeData,
  playerPosition,
  playerDirection = 0,
  visitedCells,
  monsters = [],
  isWinner = false,
  algorithm = ALGORITHMS.BFS,
}) {
  const { grid, costs, width, height } = mazeData;
  const cellSize = GAME_CONFIG.CELL_SIZE;

  const showCost = algorithm === ALGORITHMS.UCS;

  const mazeStyle = useMemo(
    () => ({
      width: width * cellSize,
      height: height * cellSize,
      display: "grid",
      gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
    }),
    [width, height, cellSize]
  );

  const cells = useMemo(() => {
    const result = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isVisited = visitedCells.has(`${x},${y}`);
        result.push(
          <Cell
            key={`${x}-${y}`}
            type={grid[y][x]}
            isVisited={isVisited}
            cost={costs[y][x]}
            showCost={showCost}
            size={cellSize}
          />
        );
      }
    }
    return result;
  }, [grid, costs, width, height, cellSize, visitedCells, showCost]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border-4 border-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />

      <div style={mazeStyle}>{cells}</div>

      {monsters.map((monster) => (
        <Monster
          key={monster.id}
          position={monster.position}
          direction={monster.direction}
          isResting={monster.isResting}
          cellSize={cellSize}
        />
      ))}

      <Player
        position={playerPosition}
        direction={playerDirection}
        cellSize={cellSize}
        isWinner={isWinner}
      />
    </div>
  );
});

export default Maze;
