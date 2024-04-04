"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import Instructions from "./Instructions";

function Info({ onClick }: { onClick: () => void }) {
  const text = useRef<HTMLParagraphElement>(null);
  const subText = useRef<HTMLParagraphElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const animate = useAnimation();
  const wordSpans = useRef<HTMLSpanElement[]>([]);

  type windows = "statement" | "instructions";
  const [windowState, setWindowState] = useState<windows>("statement");

  const animateSpinIn = () => {
    animate.start({ rotate: 90 });
  };

  const animateSpinOut = () => {
    animate.start({ rotate: 45 });
  };

  const info =
    "Despite our differences, we humans share a common set of truth givers that allows us to perceive and interact with the world around us. Let us celebrate the beauty of these shared traits together";

  useLayoutEffect(() => {
    if (text.current) {
      const words = info.split(" ");
      text.current.textContent = "";

      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        // console.log(wordSpan);

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
            // clearProps: "all",
          });
        });

        if (wordIndex !== words.length - 1) {
          const spaceSpan = document.createElement("span");
          spaceSpan.textContent = "\u00A0";
          wordSpan.appendChild(spaceSpan);
        }

        wordSpans.current.push(wordSpan);
        text.current?.appendChild(wordSpan);
      });
    }
  }, []);

  const clearText = () => {
    // subText.current!.style.opacity = "0";
    // console.log("clear", wordSpans.current);
    // gsap.to(text.current, { opacity: 0, duration: 1 });
    const max = wordSpans.current.length;
    wordSpans.current.forEach((wordSpan, wordIndex) => {
      gsap.killTweensOf(wordSpan);
      gsap
        .to(wordSpan, {
          y: "100vh", // Move the div to the bottom of the screen
          duration: 1, // Duration of the animation in seconds
          ease: "power1.inOut", // Easing function
          delay: Math.random() * 0.5, // Delay the start of the animation

          // clearProps: "all",
        })
        .then(() => {
          setWindowState("instructions");
        });
    });

    // onVerify();
    // wordSpans.current = [];
  };

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
        {/* <div className={styles.topTextContainer}>
          <p className={styles.subText}> click to continue </p>
        </div> */}
        <div className={styles.mainTextContainer}>
          {windowState === "statement" && (
            <>
              <p className={styles.text} ref={text} onClick={clearText}>
                {/* Despite our differences, we humans share a common set of truth
            givers that allows us to perceive and interact with the world around
          us. Let us celebrate the beauty of these shared traits together */}
                {/* <tspan x="0" dy="1.2em" alignment-baseline="hanging">
              - g
            </tspan> */}
              </p>
              <motion.p
                className={styles.subText}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2.25 }}
                ref={subText}
              >
                {" "}
                click to continue{" "}
              </motion.p>
            </>
          )}
          {windowState === "instructions" && <Instructions />}
        </div>
        {/* <div className={styles.botTextContainer}>
          <p className={styles.subText}> click to continue </p>
        </div> */}
      </div>
    </>
  );
}

export default Info;
