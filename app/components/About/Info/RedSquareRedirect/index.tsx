"use client";

import { useRef, useState } from "react";
import RedSquare from "../RedSquare";
import styles from "./RedSquareRedirect.module.scss";
import { motion, useAnimation } from "framer-motion";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const aniamtion = useAnimation();
  const redirecting = useRef(false);

  const animateIn = () => {
    aniamtion.start({
      x: 0,
    });
  };

  const animateOut = () => {
    if (redirecting.current) return;
    aniamtion.start({
      x: "-100px",
      transition: { duration: 0.5 },
    });
  };
  const redirect = () => {
    redirecting.current = true;
    window.location.href = "/";
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => animateIn()}
      onMouseLeave={() => animateOut()}
    >
      <motion.div
        className={styles.offset}
        initial={{ x: "-100px" }} // initial position
        animate={aniamtion} // if hovered, move to original position, else move to the right
        transition={{ duration: 0.25 }} // transition duration
      >
        <RedSquare onClick={redirect} />
      </motion.div>
    </div>
  );
};

export default Index;
