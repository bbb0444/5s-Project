"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  FC,
  createContext,
  RefObject,
} from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { colours } from "../../colours";
import CameraSearch from "../CameraSearch";
import { PanInfo, motion, useAnimate } from "framer-motion";

import { ImageProps } from "./types";
import ImgMotionDiv from "./ImgMotionDiv";
import BlobSVG from "./BlobSVG";

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

  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const centerDiv = useRef<HTMLDivElement>(null);
  const outerSVG = useRef<SVGSVGElement>(null);

  const setSelectedImageCB = useCallback((image: ImageProps | null) => {
    selectedImage.current = image;
    console.log(selectedImage.current);
  }, []);

  const handleDragFinish = (
    event: PointerEvent,
    info: PanInfo,
    imageRef: RefObject<HTMLImageElement>,
    image: ImageProps
  ) => {
    const imagePos = {
      x: event.clientX - event.offsetX,
      y: event.clientY - event.offsetY,
    };

    const imageBounds = imageRef.current?.getBoundingClientRect();
    const centerDivBounds = centerDiv.current?.getBoundingClientRect();

    if (!imageBounds || !centerDivBounds) return;

    const intersects =
      imageBounds.right > centerDivBounds.left &&
      imageBounds.left < centerDivBounds.right &&
      imageBounds.bottom > centerDivBounds.top &&
      imageBounds.top < centerDivBounds.bottom;

    if (intersects) {
      console.log("The image intersects with the center div");
      setSelectedImageCB(image);
    }
  };

  // Update the radius when the component mounts and when the window resizes
  useEffect(() => {
    const updateRadius = () => {
      if (parentRef.current) {
        // console.log(parentRef.current.clientWidth);
        setRadius(parentRef.current.offsetWidth * 0.5);
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

  return (
    <div className={styles.main} ref={scope}>
      <div
        style={{
          position: "absolute",
          top: `${pointerPosition.y}px`,
          left: `${pointerPosition.x}px`,
          width: "10px",
          height: "10px",
          backgroundColor: "red",
        }}
      ></div>
      <div className={styles.usable}>
        <ul className={styles.column}>
          <BlobSVG color1={"green"} color2={"white"} numPoints={10} />
          <div className={styles.circle} ref={parentRef}>
            <div className={styles.center} ref={centerDiv}>
              <BlobSVG color1={"green"} color2={"white"} numPoints={5} />
            </div>
            awidohawodiawdhaw
            <motion.div className={styles.container}>
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

                //console.log(image.text, initialX, initialY);
                return (
                  <ImgMotionDiv
                    key={index}
                    image={image}
                    index={index}
                    initialX={initialX}
                    initialY={initialY}
                    randomX={randomX}
                    randomY={randomY}
                    setSelectedImageCB={setSelectedImageCB}
                    animate={animate}
                    radius={radius}
                    parent={parentRef}
                    onDragFinish={handleDragFinish}
                  />
                );
              })}
            </motion.div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
