import { RefObject } from "react";

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Grid {
  bounds: RefObject<HTMLDivElement>;
  cellSize: number;
  numCols: number;
  numRows: number;
  full: boolean;
  usedCells: number;
  grid: GridCell[][];
  getRandomGridCellPos: () => Position;
}

export interface GridCell {
  position: Position;
  occupied: boolean;
}
