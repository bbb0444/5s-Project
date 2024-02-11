"use client";

import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import CameraSearch from "../CameraSearch";
import { motion } from "framer-motion";

const images = [
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

const numImages = images.length;
const randomXY = () => (Math.random() - 0.5) * 20; // smaller range for subtle floating effect

const Header = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [radius, setRadius] = React.useState(0);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [parentHeight, setParentHeight] = React.useState(0);

  // Update the radius when the component mounts and when the window resizes
  React.useEffect(() => {
    const updateRadius = () => {
      if (parentRef.current) {
        setRadius(parentRef.current.offsetWidth * 0.5); // 30% of the parent container's width
        setParentWidth(parentRef.current.offsetWidth);
        setParentHeight(parentRef.current.offsetHeight);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.square}>
        <div
          className={styles.column}
          // style={{
          //   transform: `rotate(${rotationAngle}deg)`,
          //   transformOrigin: "50% 50%",
          // }}
          ref={parentRef}
        >
          {images.map((image, index) => {
            const angle = ((2 * Math.PI) / numImages) * index - 360 / numImages;
            const initialX =
              parentWidth / 2 + radius * Math.cos(angle) - image.width / 2;
            const initialY =
              parentHeight / 2 + radius * Math.sin(angle) - image.height / 2;

            return (
              <div className={styles.container} key={index}>
                <motion.div
                  className={styles.imageBox}
                  // style={{
                  //   transform: `rotate(${rotationAngle}deg)`,
                  //   transformOrigin: "50% 50%",
                  // }}
                  initial={{ x: initialX, y: initialY }} // Set initial position in a circle
                  animate={{
                    x: [
                      initialX,
                      initialX + randomXY(),
                      initialX + randomXY(),
                      initialX + randomXY(),
                      initialX,
                    ],
                    y: [
                      initialY,
                      initialY + randomXY(),
                      initialY + randomXY(),
                      initialY + randomXY(),
                      initialY,
                    ],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 5,
                    },
                    y: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 5,
                    },
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default Header;
