// ImgMotionDiv.tsx
import { FC, RefObject, memo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { PanInfo, motion } from "framer-motion";
import styles from "./Header.module.scss";
import { ImageProps } from "./types";

interface ImgMotionDivProps {
  image: ImageProps;
  index: number;
  initialX: number;
  initialY: number;
  randomX: number;
  randomY: number;
  setSelectedImageCB: (image: ImageProps) => void;
  animate: (target: string, animation: object, options: object) => void;
  radius: number;
  parent: RefObject<HTMLDivElement>;
  onDragFinish: (
    event: PointerEvent,
    info: PanInfo,
    imageRef: RefObject<HTMLImageElement>,
    image: ImageProps
  ) => void;
}

const ImgMotionDiv: FC<ImgMotionDivProps> = ({
  image,
  index,
  initialX,
  initialY,
  randomX,
  randomY,
  setSelectedImageCB,
  animate,
  radius,
  parent,
  onDragFinish,
}) => {
  // const handleClick = async (event: React.MouseEvent) => {
  //   event.preventDefault(); // Prevent the default action of the click event
  //   setSelectedImageCB(image);

  //   animate(
  //     `#${image.text}`, // Use the image parameter to get a reference to the correct image
  //     {
  //       scale: [1, 1.5],
  //       x: [0, radius],
  //       y: [0, radius],
  //     },
  //     {
  //       duration: 1,
  //       ease: "easeInOut",
  //     }
  //   );
  // };

  // useEffect(() => {
  //   console.log(parent.current?.clientTop!);
  //   console.log(parent.current?.clientLeft!);
  //   console.log(parent.current?.clientWidth!);
  //   console.log(parent.current?.clientHeight!);
  // }, []);

  const setImage = useRef(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const constraints = {
    top: parent.current?.clientTop! - initialY - image.height / 2,
    left: parent.current?.clientLeft! - initialX - image.width / 2,
    right: parent.current?.clientWidth! - initialX - image.width / 2,
    bottom: parent.current?.clientHeight! - initialY - image.height / 2,
  };

  const handleDrag = (event: PointerEvent, info: PanInfo) => {
    onDragFinish(event, info, imageRef, image);
    // setSelectedImageCB(image);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [
          initialX,
          initialX + randomX,
          initialX + randomY,
          initialX + randomX,
          initialX,
        ],
        y: [
          initialY,
          initialY + randomY,
          initialY + randomX,
          initialY + randomY,
          initialY,
        ],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          delay: index * 0.1,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          delay: index * 0.1,
          ease: "easeInOut",
        },
      }}
    >
      <motion.img
        ref={imageRef}
        className={styles.imageBox}
        drag={true}
        dragConstraints={constraints}
        onDragStart={() => {
          setImage.current = false;
        }}
        // onDrag={handleDrag}
        onDragEnd={handleDrag}
        id={image.text}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        // onClick={handleClick}
      ></motion.img>
    </motion.div>
  );
};

ImgMotionDiv.displayName = "ImgMotionDiv";

export default ImgMotionDiv;
