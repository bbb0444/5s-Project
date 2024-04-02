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
  const text = useRef<HTMLParagraphElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const animate = useAnimation();

  const animateSpinIn = () => {
    console.log("tawdawdaw");
    animate.start({ rotate: 90 });
  };

  const animateSpinOut = () => {
    animate.start({ rotate: 45 });
  };

  const info =
    "Despite our differences, we humans share a common set of truth givers that allows us to perceive and interact with the world around us. Let us celebrate the beauty of these shared traits together";

  useEffect(() => {
    if (text.current) {
      const words = info.split(" ");
      text.current.textContent = "";

      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("div");
        console.log(wordSpan);

        const letters = word.split("");
        letters.forEach((char, letterIndex) => {
          const letterSpan = document.createElement("span");
          letterSpan.textContent = char;
          wordSpan.appendChild(letterSpan);

          gsap.to(wordSpan, {
            x: "1px",
            y: "1px",
            repeat: -1,
            yoyo: true,
            duration: 0.1,
            ease: "power1.inOut",
            delay: (wordIndex + 1) * 0.05,
          });
        });

        if (wordIndex !== words.length - 1) {
          const spaceSpan = document.createElement("div");
          spaceSpan.textContent = "\u00A0";
          wordSpan.appendChild(spaceSpan);
        }

        text.current?.appendChild(wordSpan);
      });
    }
  }, []);

  return (
    <>
      <div className={styles.container} ref={container}>
        <motion.svg
          className={styles.exitButton}
          initial={{ rotate: 45 }}
          onMouseEnter={() => animateSpinIn()}
          onMouseLeave={() => animateSpinOut()}
          // whileHover={{ rotate: 180 }}
          animate={animate}
          transition={{ duration: 0.25 }}
          onClick={onClick}
        >
          <CrossSVG color={colours.bgColour} />
        </motion.svg>
        <div className={styles.middle}>
          <p className={styles.text} ref={text}>
            {/* Despite our differences, we humans share a common set of truth
            givers that allows us to perceive and interact with the world around
            us. Let us celebrate the beauty of these shared traits together */}
            {/* <tspan x="0" dy="1.2em" alignment-baseline="hanging">
              - g
            </tspan> */}
          </p>
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
