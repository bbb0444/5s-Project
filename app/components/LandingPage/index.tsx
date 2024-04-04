"use client";
import Header from "@/app/components/Header";
import About from "@/app/components/About";
import { motion, useAnimate, useAnimation } from "framer-motion";
import { createContext, useContext, useState } from "react";

export const LandingPageContext = createContext<
  | {
      isVerified: boolean;
      setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

// 2. Define the provider component
const LandingPageProvider = ({ children }: { children: any }) => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <LandingPageContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </LandingPageContext.Provider>
  );
};

const LandingPage = ({ isVerified }: { isVerified: boolean }) => {
  const animation = useAnimation();
  const onExit = () => {
    animation.start({ x: "-100px" });
  };

  return (
    <LandingPageProvider>
      <Header onExit={onExit} isVerified={isVerified} />
      <motion.div animate={animation} transition={{ duration: 0.25 }}>
        <About />
      </motion.div>
    </LandingPageProvider>
  );
};

export default LandingPage;
