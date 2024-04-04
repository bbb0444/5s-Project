"use client";

import { useLayoutEffect } from "react";
import styles from "./arbor.module.scss";
import Layout from "@/app/components/Layout";

const Arbor = () => {
  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "black";
  }, []);
  return (
    <Layout>
      <div className={styles.container}>
        <p className={styles.heading}> comming soon </p>
      </div>
    </Layout>
  );
};

export default Arbor;
