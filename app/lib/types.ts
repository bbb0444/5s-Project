import { RefObject } from "react";

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

export type Category = "eye" | "ear" | "mouth" | "nose" | "hand";

export interface SenseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
}

export const SenseImages: SenseImage[] = [
  {
    src: "/SVG/Eye.svg",
    alt: "black and white print of an eye",
    width: 110,
    height: 110,
    text: "eye",
  },
  {
    src: "/SVG/Ear.svg",
    alt: "black and white print of an ear",
    width: 80,
    height: 80,
    text: "ear",
  },
  {
    src: "/SVG/Mouth.svg",
    alt: "black and white print of a mouth",
    width: 100,
    height: 100,
    text: "mouth",
  },
  {
    src: "/SVG/Hand.svg",
    alt: "black and white print of a hand",
    width: 70,
    height: 70,
    text: "hand",
  },
  {
    src: "/SVG/Nose.svg",
    alt: "black and white print of a nose",
    width: 65,
    height: 65,
    text: "nose",
  },
];

export const senseImageMap: Map<string, SenseImage> = new Map();
SenseImages.forEach((image) => {
  senseImageMap.set(image.text, image);
});
