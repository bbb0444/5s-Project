"use client";
import Header from "@/app/components/Header";
import About from "@/app/components/About";
import { motion, useAnimate, useAnimation } from "framer-motion";

const LandingPage = () => {
  const animation = useAnimation();
  const onExit = () => {
    animation.start({ x: "-100px" });
  };

  return (
    <>
      <Header onExit={onExit} />
      <motion.div animate={animation} transition={{ duration: 0.25 }}>
        <About />
      </motion.div>
    </>
  );
};

export default LandingPage;
