"use client";
import React, { use } from "react";
import styles from "./Instructions.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const index = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.rowContainer}>
        <p className={styles.text}>
          choose a sense by dragging its icon to the center of the screen
        </p>
        <div className={styles.imageContainer}>
          <Image
            src="/gifs/step1.gif"
            layout="fill"
            objectFit="contain"
            alt="step 1"
          />
        </div>
      </div>
      <div className={styles.rowContainer}>
        <p className={styles.text}>
          browse user uploaded captures by scrolling left / right change channel
          by interacting with the arrow head icons
        </p>
        <div className={styles.imageContainer}>
          <Image
            src="/gifs/step2.gif"
            layout="fill"
            objectFit="contain"
            alt="step 2"
          />
        </div>
      </div>
      <div className={styles.rowContainer}>
        <p className={styles.text}>
          if you have obtained a code, and wish to upload your own story, click
          the upload button by hovering over the sense icon
        </p>
        <div className={styles.imageContainer}>
          <Image
            src="/gifs/step3.gif"
            layout="fill"
            objectFit="contain"
            alt="step 3"
          />
        </div>
      </div>
      <div className={styles.rowContainer}>
        <p className={styles.text}>
          to return to the home page, move your mouse over to the top left hand
          corner of the window and click on the red square
        </p>
        <div className={styles.imageContainer}>
          <Image
            src="/gifs/step4.gif"
            layout="fill"
            objectFit="contain"
            alt="step 4"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default index;
