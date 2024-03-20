import {
  FC,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { PanInfo, motion, motionValue, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Header.module.scss";
import { Grid, SenseImage, Position } from "../../lib/types";
import SVGLoader from "../SVGLoader";

interface ImgMotionDivProps {
  image: SenseImage;
  index: number;
  randomX: number;
  randomY: number;
  // lock: Position;
  animate: (target: string, animation: object, options: object) => void;
  randomPos: () => Position;
  grid: Grid;
  parent: RefObject<HTMLDivElement>;
  onDragFinish: (
    event: PointerEvent,
    info: PanInfo,
    motionImgRef: RefObject<HTMLImageElement>,
    image: SenseImage,
    end: boolean
  ) => boolean;
}

const ImgMotionDiv: FC<ImgMotionDivProps> = ({
  image,
  index,
  randomX,
  randomY,
  animate,
  randomPos,
  grid,
  parent,
  onDragFinish,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const intersecting = useRef<boolean>(false);
  const setImage = useRef(false);
  const motionImgRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [end, setEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchPosition = async () => {
      const position: Position = randomPos();
      // console.log(position);
      setPosition({ x: position.x, y: position.y });
    };

    fetchPosition();
  }, [randomPos, grid]);

  useGSAP(() => {
    if (end) {
      gsap.killTweensOf(`#${image.text}`);
      return;
    }
    if (!isDragging) {
      // Check if image is not being dragged
      const tl = gsap.timeline({
        defaults: {
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      });

      tl.to(`#${image.text}`, {
        x: randomX,
        y: randomY,
        duration: 1,
      });
    }
  }, [end, isDragging]);

  // useEffect(() => {
  //   console.log(parent.current?.getBoundingClientRect().top);
  //   console.log(parent.current?.getBoundingClientRect().left);
  //   console.log(parent.current?.getBoundingClientRect().right!);
  //   console.log(parent.current?.getBoundingClientRect().bottom!);
  // }, []);

  const handleDrag = (event: PointerEvent, info: PanInfo) => {
    setIsDragging(true);
    const intersect = onDragFinish(event, info, motionImgRef, image, false);
    if (intersect != intersecting.current) {
      intersecting.current = intersect;
      if (intersect) {
        animate(
          `#${image.text}`,
          {
            // x: lock.x - image.width / 2,
            // y: lock.y - image.height / 2,
            filter: "invert(1)",
          },
          {
            duration: 0.225,
            ease: "easeInOut",
          }
        );
      } else {
        animate(
          `#${image.text}`,
          {
            filter: ["invert(1)", "none"],
          },
          {
            duration: 0.225,
            ease: "easeInOut",
          }
        );
      }
      console.log(intersecting.current);
    }
  };

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    const intersect = onDragFinish(event, info, motionImgRef, image, true);
    if (intersect) {
      const middleX =
        parent.current?.getBoundingClientRect().width! / 2 -
        imageRef.current?.getBoundingClientRect().width! / 2;
      const middleY =
        parent.current?.getBoundingClientRect().height! / 2 -
        imageRef.current?.getBoundingClientRect().height! / 2;
      setPosition({ x: middleX, y: middleY });
      setEnd(true);
    }
    setIsDragging(false);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: position.x, y: position.y }}
      animate={{ opacity: 1, x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 30, damping: 10 }}
      id={image.text + "M"}
      ref={motionImgRef}
      className={styles.imageBox}
      drag={!end}
      dragConstraints={parent}
      onDragStart={() => {
        setImage.current = false;
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div id={image.text} ref={imageRef} className={styles.image}>
        <SVGLoader
          name={image.text}
          color="white"
          width={image.width}
          height={image.height}
        />
      </div>
      {/* <Image
        id={image.text}
        ref={imageRef}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={styles.image}
      /> */}
    </motion.div>
  );
};

ImgMotionDiv.displayName = "ImgMotionDiv";

export default ImgMotionDiv;
