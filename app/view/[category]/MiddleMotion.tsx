"use client";
import { ReactNode } from "react";
import styles from "../view.module.scss";
import { motion, animate } from "framer-motion";
import { colours } from "@/app/colours";
import SVGLoader from "@/app/components/SVGLoader";
import { SenseImage } from "@/app/lib/types";
import { useState } from "react";
import Link from "next/link";

interface MiddleProps {
  sense: SenseImage;
}
const Middle = ({ sense: SenseImage }: MiddleProps) => {
  // document.documentElement.style.backgroundColor = colours.bgColour;
  const [hover, setHover] = useState(false);

  return (
    <div className={styles.middleContainer}>
      <div className={styles.middle}>
        <motion.div className={styles.img}>
          <SVGLoader
            color={"white"}
            name={SenseImage.text}
            width={SenseImage.width}
            height={SenseImage.height}
          />
        </motion.div>
        {hover && (
          <button
            className={styles.text}
            onClick={() =>
              (window.location.href = "/upload/" + SenseImage.text)
            }
          >
            upload
          </button>
        )}
      </div>
    </div>
  );
};

export default Middle;
