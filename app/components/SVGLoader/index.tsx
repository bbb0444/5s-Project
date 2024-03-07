import { Category } from "@/app/lib/types";
import React from "react";

import Ear from "@/public/SVG/ear.svg";
import Eye from "@/public/SVG/eye.svg";
import Hand from "@/public/SVG/hand.svg";
import Mouth from "@/public/SVG/mouth.svg";
import Nose from "@/public/SVG/nose.svg";

type SVGLoaderProps = {
  name: Category;
  color: string;
  width: number;
  height: number;
};

function index({ name, color = "white", width, height }: SVGLoaderProps) {
  switch (name) {
    case "eye":
      return (
        <Eye
          fill={color}
          width={width}
          height={height}
          //viewBox={"0 0 " + width + " " + height}
        />
      );
      break;
    case "ear":
      return (
        <Ear
          fill={color}
          width={width}
          height={height}
          //viewBox={"0 0 " + width + " " + height}
        />
      );
      break;

    case "hand":
      return (
        <Hand
          fill={color}
          width={width}
          height={height}
          //viewBox={"0 0 " + width + " " + height}
        />
      );
      break;

    case "mouth":
      return (
        <Mouth
          fill={color}
          width={width}
          height={height}
          //viewBox={"0 0 " + width + " " + height}
        />
      );
      break;

    case "nose":
      return (
        <Nose
          fill={color}
          width={width}
          height={height}
          //viewBox={"0 0 " + width + " " + height}
        />
      );
      break;

    default:
    // code block
  }
}

export default index;
