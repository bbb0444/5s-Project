"use client";
import { ReactNode } from "react";
import styles from "./CategorySelect.module.scss";
import { motion, animate } from "framer-motion";
import { colours } from "@/app/colours";
import SVGLoader from "@/app/components/SVGLoader";
import { Categories, Image, SenseImages, senseImageMap } from "@/app/lib/types";
import { useState } from "react";
import Link from "next/link";
import LeftArrow from "@/public/SVG/buttons/left_arrow.svg";
import RightArrow from "@/public/SVG/buttons/right_arrow.svg";

interface CategorySelect {
  sense: Image;
  animateOut: () => Promise<boolean>;
  setSense: (sense: Image) => void;
  hover: boolean;
}
const CategorySelect = ({
  sense: SenseImage,
  animateOut: animateOut,
  setSense,
  hover,
}: CategorySelect) => {
  // document.documentElement.style.backgroundColor = colours.bgColour;

  const nagivate = (direction: "left" | "right") => {
    let index = 0;
    animateOut()
      .then((res) => {
        if (res) {
          if (SenseImage.text === "arbor") {
            return;
          }
          const currentIndex = Categories.indexOf(SenseImage.text);
          if (direction === "left") {
            const prevIndex =
              currentIndex === 0 ? Categories.length - 1 : currentIndex - 1;
            // category = Categories[prevIndex];
            index = prevIndex;
          } else {
            const nextIndex =
              currentIndex === Categories.length - 1 ? 0 : currentIndex + 1;
            // category = Categories[nextIndex];
            index = nextIndex;
          }
        }
      })
      .then(() => {
        setSense(SenseImages[index]);
      });
  };
  return (
    <div className={styles.middleContainer}>
      <button onClick={() => nagivate("left")}>
        <LeftArrow height={100} width={100} className={styles.arrow} />
      </button>
      <div className={styles.middle}>
        <div className={`${styles.img} ${hover ? styles.fadeOut : ""}`}>
          <SVGLoader
            color={"black"}
            name={SenseImage.text}
            width={SenseImage.width}
            height={SenseImage.height}
          />
        </div>
        {hover && (
          <button
            className={styles.button}
            onClick={() => {
              window.location.href =
                "/upload/?category=" + encodeURIComponent(SenseImage.text);
              document.body.style.backgroundColor = colours.bgColour;
            }}
          >
            upload
          </button>
        )}
      </div>
      <button onClick={() => nagivate("right")}>
        <RightArrow height={100} width={100} className={styles.arrow} />
      </button>
    </div>
  );
};

export default CategorySelect;
