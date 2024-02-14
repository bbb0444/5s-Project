"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  FC,
  createContext,
} from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import CameraSearch from "../CameraSearch";
import { PanInfo, motion, useAnimate } from "framer-motion";

import { ImageProps } from "./types";
import ImgMotionDiv from "./ImgMotionDiv";
import { init } from "next/dist/compiled/webpack/webpack";

const images: ImageProps[] = [
  {
    src: "/SVG/Eye.svg",
    alt: "black and white print of an eye",
    width: 110,
    height: 110,
    text: "eye",
  },
  {
    src: "/SVG/Ear.svg",
    alt: "black and white print of an ear",
    width: 80,
    height: 80,
    text: "ear",
  },
  {
    src: "/SVG/Mouth.svg",
    alt: "black and white print of a mouth",
    width: 100,
    height: 100,
    text: "mouth",
  },
  {
    src: "/SVG/Hand.svg",
    alt: "black and white print of a hand",
    width: 70,
    height: 70,
    text: "hand",
  },
  {
    src: "/SVG/Nose.svg",
    alt: "black and white print of a nose",
    width: 65,
    height: 65,
    text: "nose",
  },
];

const numImages = images.length;
const randomXY = () => (Math.random() - 0.5) * 20; // smaller range for subtle floating effect

const Header = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const selectedImage = useRef<ImageProps | null>(null);
  const [scope, animate] = useAnimate();

  const [rotation, setRotation] = useState(0);
  const [state, setState] = useState("home");

  const setSelectedImageCB = useCallback((image: ImageProps | null) => {
    selectedImage.current = image;
    console.log(selectedImage.current);

    setTimeout(() => {
      setState("selected");
    }, 500);
  }, []);

  // Update the radius when the component mounts and when the window resizes
  useEffect(() => {
    const updateRadius = () => {
      if (parentRef.current) {
        // console.log(parentRef.current.clientWidth);
        setRadius(parentRef.current.offsetWidth * 0.5); // 30% of the parent container's width
        setParentWidth(parentRef.current.offsetWidth);
        setParentHeight(parentRef.current.offsetHeight);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  // const handleDragStart = (
  //   event: MouseEvent | TouchEvent | PointerEvent,
  //   info: PanInfo
  // ) => {
  //   console.log("drag start");
  //   console.log(info);
  //   console.log(event);
  // };
  // const handleDragEnd = (
  //   event: MouseEvent | TouchEvent | PointerEvent,
  //   info: PanInfo
  // ) => {
  //   console.log("drag end");
  //   console.log(info);
  //   console.log(event);
  // };

  interface MainComponentProps {
    images: ImageProps[];
    parentWidth: number;
    parentHeight: number;
    radius: number;
    setSelectedImageCB: (image: ImageProps | null) => void;
    animate: any;
  }

  const MainComponent: FC<MainComponentProps> = memo(
    ({
      images,
      parentWidth,
      parentHeight,
      radius,
      setSelectedImageCB,
      animate,
    }) => {
      return (
        <div className={styles.main} ref={scope}>
          <ul className={styles.icons}>
            <motion.div
              // drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ rotate: rotation }}
              // onDragStart={handleDragStart}
              // onDragEnd={handleDragEnd}
              className={styles.circle}
              ref={parentRef}
            >
              {images.map((image, index) => {
                const angle =
                  ((2 * Math.PI) / numImages) * index - 360 / numImages;
                const initialX =
                  parentWidth / 2 + radius * Math.cos(angle) - image.width / 2;
                const initialY =
                  parentHeight / 2 +
                  radius * Math.sin(angle) -
                  image.height / 2;
                const randomX = randomXY();
                const randomY = randomXY();

                const middleX = radius / 2 - initialX - image.height * 2; //not exactly middle
                const middleY = radius / 2 - initialY - image.width * 2;

                return (
                  <div className={styles.container} key={index}>
                    <ImgMotionDiv
                      image={image}
                      index={index}
                      initialX={initialX}
                      initialY={initialY}
                      randomX={randomX}
                      randomY={randomY}
                      setSelectedImageCB={setSelectedImageCB}
                      animate={animate}
                      animation={{
                        scale: [1, 800],
                        // transform: ["skewY(0deg)", "skewY(45deg)", "skewY(0deg)"],
                        x: [0, middleX],
                        y: [0, middleY],
                      }}
                      options={{
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                );
              })}
            </motion.div>
          </ul>
        </div>
      );
    }
  );

  MainComponent.displayName = "MainComponent";

  return (
    <>
      {selectedImage.current != null && (
        <motion.div
          className={styles.menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CameraSearch text={selectedImage.current.text} />
        </motion.div>
      )}
      <MainComponent
        images={images}
        parentWidth={parentWidth}
        parentHeight={parentHeight}
        radius={radius}
        setSelectedImageCB={setSelectedImageCB}
        animate={animate}
      />
    </>
  );
};

export default Header;
