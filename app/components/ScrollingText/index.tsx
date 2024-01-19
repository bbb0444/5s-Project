import React from "react";
import styles from "./ScrollingText.module.scss";

function index() {
  const text1 = "a glue project, made with love <3";
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.RightToLeft}>
          <p>{text1}</p>
          <p>{text1}</p>
        </div>
        <div className={styles.LeftToRight}>
          <p>{text1}</p>
          <p>{text1}</p>
        </div>
      </div>
    </div>
  );
}

export default index;
