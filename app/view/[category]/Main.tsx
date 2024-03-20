"use client";
import styles from "../view.module.scss";
import { SenseImage, senseImageMap, Post } from "../../lib/types";
import CategorySelect from "@/app/components/CategorySelect";
import { colours } from "@/app/colours";
import PostViewer from "./PostViewer";
import ClientEffects from "./ClientEffects";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function Main({ sense }: { sense: SenseImage }) {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const [senseState, setSense] = useState(sense);

  const animateOut = async () => {
    // console.log("yo");
    await Promise.all([
      controlsTop.start({
        // opacity: 0,
        y: "-100%",
        transition: { duration: 0.5 },
      }),
      controlsBottom.start({
        // opacity: 0,
        y: "+100%",
        transition: { duration: 0.5 },
      }),
    ]);
    return true;
  };

  const setSenseState = (sense: SenseImage) => {
    setSense(sense);
    window.location.href = "/view/" + sense.text;
  };

  return (
    <div className={styles.main}>
      <motion.div className={styles.top} animate={controlsTop}>
        <PostViewer />
      </motion.div>
      {senseState && (
        <CategorySelect
          sense={senseState}
          animateOut={() => animateOut()}
          setSense={setSenseState}
          hover={true}
        />
      )}
      <motion.div className={styles.bottom} animate={controlsBottom}>
        <PostViewer
          overflowDirection="left"
          sortOrder="desc"
          position="bottom"
        />
      </motion.div>
      <ClientEffects />
    </div>
  );
}
