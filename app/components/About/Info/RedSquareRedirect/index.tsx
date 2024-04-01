"use client";

import { useState } from "react";
import RedSquare from "../RedSquare";
import styles from "./RedSquareRedirect.module.scss";
import { motion, useAnimation } from "framer-motion";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const aniamtion = useAnimation();

  const animateIn = () => {
    aniamtion.start({
      x: 0,
    });
  };

  const animateOut = () => {
    aniamtion.start({
      x: 0,
    });
  };
  const redirect = () => {
    window.location.href = "/";
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.offset}
        initial={""} // initial position
        animate={aniamtion} // if hovered, move to original position, else move to the right
        transition={{ duration: 0.5 }} // transition duration
      >
        <RedSquare onClick={redirect} />
      </motion.div>
    </div>
  );
};

export default Index;
