"use client";

import FiveSenses from "./components/FiveSenses";
import Header from "./components/Header";
import ScrollingText from "./components/ScrollingText";
import React, { useState, useEffect, use } from "react";
import "./globals.scss";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import RedSquare from "./components/Info/RedSquare";
import Info from "./components/Info";
import { toast } from "react-toastify";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  const showInfoAnimation = useAnimation();

  if (showInfo) {
    showInfoAnimation.start({ x: 0 });
  }

  return (
    <main className="">
      <AnimatePresence>
        <motion.div key={0}>
          <Header />
        </motion.div>
        <motion.div
          key={1}
          initial={{ x: "-100vw" }}
          animate={showInfoAnimation}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          className="w-full h-full"
        >
          <RedSquare
            onClick={() => {
              setShowInfo(true);
            }}
          />
          <Info />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
