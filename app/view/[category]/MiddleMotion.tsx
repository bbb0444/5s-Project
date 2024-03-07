"use client";
import { ReactNode } from "react";
import styles from "../view.module.scss";
import { motion, animate } from "framer-motion";
import { colours } from "@/app/colours";
import SVGLoader from "@/app/components/SVGLoader";
import { SenseImage } from "@/app/lib/types";

interface MiddleProps {
  sense: SenseImage;
}
const Middle = ({ sense: SenseImage }: MiddleProps) => {
  // document.documentElement.style.backgroundColor = colours.bgColour;
  document.documentElement.style.backgroundColor = "black";

  return (
    <div className={styles.middleContainer}>
      <div className={styles.middle}>
        <div className={styles.img}>
          <SVGLoader
            color={"white"}
            name={SenseImage.text}
            width={SenseImage.width}
            height={SenseImage.height}
          />
        </div>
      </div>
    </div>
  );
};

export default Middle;
