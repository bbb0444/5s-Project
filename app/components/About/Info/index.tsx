"use client";
import { useEffect, useRef } from "react";
import FiveSenses from "../../FiveSenses";
import styles from "./Info.module.scss";
import SlantBar from "@/public/SVG/buttons/slant_bar.svg";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { colours } from "@/app/colours";
import CrossSVG from "@/public/SVG/buttons/x_icon.svg";
import { motion, useAnimation } from "framer-motion";

function Info({ onClick }: { onClick: () => void }) {
  const text = useRef<SVGTextElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const animate = useAnimation();

  const onExitClick = () => {
    animate.start({ rotate: 360 });
    onClick();
  };

  return (
    <>
      <div className={styles.container} ref={container}>
        <motion.svg
          className={styles.exitButton}
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          onClick={onExitClick}
        >
          <CrossSVG color={colours.bgColour} />
        </motion.svg>
        <div className={styles.middle}>
          <text className={styles.text} ref={text} text-anchor="start">
            Despite our differences, we humans share a common set of truth
            givers that allows us to perceive and interact with the world around
            us. Let us celebrate the beauty of these shared traits together
            {/* <tspan x="0" dy="1.2em" alignment-baseline="hanging">
              - g
            </tspan> */}
          </text>
        </div>
        {/* <Image
          src="/imgs/glueLogoBase.png"
          alt="glue logo"
          width={100}
          height={100}
        /> */}
      </div>
    </>
  );
}

export default Info;
