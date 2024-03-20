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
export const Categories: Category[] = ["eye", "ear", "mouth", "nose", "hand"];

export interface SenseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: Category;
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
    width: 95,
    height: 95,
    text: "ear",
  },
  {
    src: "/SVG/Mouth.svg",
    alt: "black and white print of a mouth",
    width: 90,
    height: 90,
    text: "mouth",
  },
  {
    src: "/SVG/Nose.svg",
    alt: "black and white print of a nose",
    width: 100,
    height: 100,
    text: "nose",
  },
  {
    src: "/SVG/Hand.svg",
    alt: "black and white print of a hand",
    width: 100,
    height: 100,
    text: "hand",
  },
];

export const senseImageMap: Map<string, SenseImage> = new Map();
SenseImages.forEach((image) => {
  senseImageMap.set(image.text, image);
});

export interface Post {
  userId: number;
  id: number;
  category: Category;
  body: string;
}
