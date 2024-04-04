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

export type Exclusive = "arbor";

export type Category = "eye" | "ear" | "mouth" | "nose" | "hand";
export const Categories: Category[] = ["eye", "ear", "mouth", "nose", "hand"];

export const CategoryMap: { [key in Category]?: number } = Categories.reduce(
  (map, category, index) => {
    map[category] = index;
    return map;
  },
  {} as { [key in Category]?: number }
);

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: Category | Exclusive;
  link: string;
}

export const SenseImages: Image[] = [
  {
    src: "/SVG/eye.svg",
    alt: "black and white print of an eye",
    width: 110,
    height: 110,
    text: "eye",
    link: "/view/",
  },
  {
    src: "/SVG/ear.svg",
    alt: "black and white print of an ear",
    width: 95,
    height: 95,
    text: "ear",
    link: "/view/",
  },
  {
    src: "/SVG/mouth.svg",
    alt: "black and white print of a mouth",
    width: 90,
    height: 90,
    text: "mouth",
    link: "/view/",
  },
  {
    src: "/SVG/nose.svg",
    alt: "black and white print of a nose",
    width: 100,
    height: 100,
    text: "nose",
    link: "/view/",
  },
  {
    src: "/SVG/hand.svg",
    alt: "black and white print of a hand",
    width: 100,
    height: 100,
    text: "hand",
    link: "/view/",
  },
];

export const ExclusiveImages: Image[] = [
  {
    src: "/SVG/tree.svg",
    alt: "black and white print of a tree",
    width: 120,
    height: 120,
    text: "arbor",
    link: "/",
  },
];

export const senseImageMap: Map<string, Image> = new Map();
SenseImages.forEach((image) => {
  senseImageMap.set(image.text, image);
});

export interface Post {
  id: number;
  s3_bucket_link: string;
  category_key: number;
  description: string;
  created_at: Date;
}

export interface UploadImage {
  image: Blob;
  key: string;
  contentType: "image/png";
}
