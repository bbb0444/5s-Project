"use client";
import React, { useState, useEffect, use, useRef } from "react";
import "@/app/globals.scss";
import {
  AnimatePresence,
  ResolvedValues,
  animate,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import RedSquare from "./Info/RedSquare";
import Info from "./Info";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

function About() {
  const xPos = useRef<string | number>("0");
  const showInfoAnimation = useAnimationControls();

  function setShowInfo(showInfo: boolean) {
    if (showInfo) {
      showInfoAnimation.start({ x: xPos.current });
      showInfoAnimation.start({ x: "100vw" });
      document.body.style.overflowX = "hidden";
    } else {
      showInfoAnimation.stop();
      showInfoAnimation.start({ x: xPos.current });
      showInfoAnimation.start({ x: 0 });
    }
  }

  const jumpAnimation = () => {
    showInfoAnimation
      .start({
        x: window.innerWidth / 10,
        transition: {
          duration: 0.25,
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      })
      .then(() => {
        showInfoAnimation.start({
          x: "0px",
          transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        });
      });
  };

  if (isMobile) {
    return (
      <motion.div
        key={1}
        transition={{ duration: 0.3 }}
        animate={showInfoAnimation}
        className="w-full h-full "
      >
        <RedSquare
          onClick={() => {
            setShowInfo(true);
          }}
        />
        <Info
          onClick={() => {
            setShowInfo(false);
          }}
        />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        key={1}
        transition={{ duration: 0.3 }}
        animate={showInfoAnimation}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{}}
        onDragEnd={(e, { offset, velocity }) => {
          // Add this line
          if (offset.x > window.innerWidth / 2) {
            xPos.current = offset.x;
            console.log(offset);
            setShowInfo(true);
          } else {
          }
        }}
        className="w-full h-full "
      >
        <RedSquare onClick={jumpAnimation} />
        <Info
          onClick={() => {
            setShowInfo(false);
          }}
        />
      </motion.div>
    );
  }
}

export default About;
