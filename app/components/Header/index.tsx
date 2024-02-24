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
  useLayoutEffect,
} from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { colours } from "../../colours";
import CameraSearch from "../CameraSearch";
import { PanInfo, motion, useAnimate } from "framer-motion";
import {
  SenseImage,
  SenseImages,
  Position,
  Grid,
  GridCell,
} from "../../lib/types";
import ImgMotionDiv from "./ImgMotionDiv";
import BlobSVG from "./BlobSVG";
import { getGrid } from "./util";
import { useRouter } from "next/navigation";

const numImages = SenseImages.length;
const randomXY = () => (Math.random() - 0.5) * 50; // smaller range for subtle floating effect

const Header = () => {
  const router = useRouter();

  const parentRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const selectedImage = useRef<SenseImage | null>(null);
  const [scope, animate] = useAnimate();

  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const centerRef = useRef<HTMLDivElement>(null);
  const centerRefBounds = useRef<HTMLDivElement>(null);
  const outerSVG = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const Grid = useRef<Grid>();

  const getRandomPos = () => {
    console.log(Grid);
    const position: Position = Grid.current!.getRandomGridCellPos();
    return position;
  };

  const centerRefLockPos = () => {
    const center = centerRef.current?.getBoundingClientRect();
    if (center) {
      return {
        x: center.left + center.width / 2,
        y: center.top + center.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  const centerRefLock = centerRefLockPos();
  console.log("lock", centerRefLock);

  function intersectsRef(imageRef: RefObject<HTMLImageElement>) {
    const imageBounds = imageRef.current?.getBoundingClientRect();
    const centerDivBounds = centerRef.current?.getBoundingClientRect();

    if (!imageBounds || !centerDivBounds) return false;

    return (
      imageBounds.right > centerDivBounds.left &&
      imageBounds.left < centerDivBounds.right &&
      imageBounds.bottom > centerDivBounds.top &&
      imageBounds.top < centerDivBounds.bottom
    );
  }

  const setSelectedImageCB = useCallback((image: SenseImage | null) => {
    selectedImage.current = image;

    document.body.style.overflow = "hidden";
    document.documentElement.style.backgroundColor = "white";

    animate(
      "#c1",
      {
        scale: 20,
      },
      {
        duration: 1,
        ease: "easeInOut",
        onComplete: () => {
          router.push(`/view/${image!.text}`);
          // document.body.style.overflow = "auto";
        },
      }
    );

    console.log(selectedImage.current);
  }, []);

  const handleDragFinish = (
    event: PointerEvent,
    info: PanInfo,
    imageRef: RefObject<HTMLImageElement>,
    image: SenseImage,
    end: boolean
  ) => {
    const imagePos = {
      x: event.clientX - event.offsetX,
      y: event.clientY - event.offsetY,
    };

    const imageBounds = imageRef.current?.getBoundingClientRect();
    const centerDivBounds = centerRef.current?.getBoundingClientRect();

    if (!imageBounds || !centerDivBounds) return false;

    if (intersectsRef(imageRef)) {
      console.log("The image intersects with the center div", end);
      if (end) {
        setSelectedImageCB(image);
      }
      return true;
    }
    return false;
  };

  // Update the radius when the component mounts and when the window resizes
  useEffect(() => {
    Grid.current = getGrid(parentRef, centerRef, 100);

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
    // window.addEventListener("mousemove", (event) => {
    //   console.log(event.clientX, event.clientY);
    // });

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return (
    <div className={styles.main} ref={scope}>
      {/* <canvas id="canvas" ref={canvasRef} className="fixed bg-slate-500" /> */}
      <div className={styles.redSquare} />
      <div className={styles.usable} ref={parentRef}>
        <ul className={styles.column}>
          <div className={styles.circles}>
            <div className={styles.c3} ref={centerRefBounds}>
              <div className={styles.c2}>
                {/* <BlobSVG color1={"green"} color2={"white"} numPoints={6} /> */}
                <motion.div id="c1" className={styles.c1} ref={centerRef}>
                  <BlobSVG color1={"white"} color2={"white"} numPoints={5} />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div className={styles.container}>
            {Grid.current &&
              SenseImages.map((image, index) => {
                //console.log(image.text, initialX, initialY);
                return (
                  <ImgMotionDiv
                    key={index}
                    image={image}
                    index={index}
                    randomX={randomXY()}
                    randomY={randomXY()}
                    lock={centerRefLock}
                    animate={animate}
                    randomPos={getRandomPos}
                    grid={Grid.current!}
                    parent={parentRef}
                    onDragFinish={handleDragFinish}
                  />
                );
              })}
          </motion.div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
