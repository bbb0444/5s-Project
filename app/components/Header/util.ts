import { useState, useRef, useEffect, RefObject } from "react";
import { Grid, GridCell, Position } from "../../lib/types";

export const getGrid = (
  parentRef: RefObject<HTMLDivElement>,
  innerRef: RefObject<HTMLDivElement>,
  cellSize: number
) => {
  function generateGrid(
    bounds: RefObject<HTMLDivElement>,
    cellSize: number
  ): Grid {
    const grid: GridCell[][] = [];

    const height = bounds.current?.getBoundingClientRect().height;
    const width = bounds.current?.getBoundingClientRect().width;

    if (height === undefined || width === undefined) {
      console.log("Height or width is undefined");
    }

    const numRows = Math.floor(height! / cellSize);
    const numCols = Math.floor(width! / cellSize);

    for (let i = 0; i < numRows; i++) {
      grid[i] = [];
      for (let j = 0; j < numCols; j++) {
        const position = { x: j * cellSize, y: i * cellSize };
        const occupied = intersectsPos(position) ? true : false;
        grid[i][j] = { position, occupied: occupied };
      }
    }

    let full = false;
    let usedCells = 0;

    function getRandomGridCellPos(): Position {
      if (usedCells === numRows * numCols) {
        full = true;
        return { x: 0, y: 0 };
      }

      if (grid === undefined) return { x: 0, y: 0 };

      let randomRow = Math.floor(Math.random() * numRows);
      let randomCol = Math.floor(Math.random() * numCols);

      while (!full) {
        randomRow = Math.floor(Math.random() * numRows);
        randomCol = Math.floor(Math.random() * numCols);

        if (!grid[randomRow][randomCol].occupied) {
          usedCells++;
          grid[randomRow][randomCol].occupied = true;
          break;
        }
      }
      const position = grid[randomRow][randomCol].position;
      return position;
    }

    const Grid: Grid = {
      bounds: bounds,
      cellSize: cellSize,
      numCols: numCols,
      numRows: numRows,
      full: full,
      usedCells: usedCells,
      grid: grid,
      getRandomGridCellPos,
    };

    return Grid;
  }

  function intersectsPos(position: Position) {
    const centerDivBounds = innerRef.current?.getBoundingClientRect();
    const factor = 2;
    // console.log(centerDivBounds);
    if (centerDivBounds == undefined) return false;

    return (
      position.x > centerDivBounds.left &&
      position.x < centerDivBounds.right &&
      position.y > centerDivBounds.top &&
      position.y < centerDivBounds.bottom
    );
  }

  const grid = generateGrid(parentRef, cellSize);

  return grid;
};
