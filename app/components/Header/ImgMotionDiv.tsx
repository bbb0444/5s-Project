// ImgMotionDiv.tsx
import { FC, memo, useCallback } from "react";
import Image from "next/image";
import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  motion,
} from "framer-motion";
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
  animation: DOMKeyframesDefinition;
  options: DynamicAnimationOptions;
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
  animation,
  options,
}) => {
  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default action of the click event
    setSelectedImageCB(image);

    animate(
      `#${image.text}`, // Use the image parameter to get a reference to the correct image
      animation,
      options
    );
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
      <div className={styles.imageBox} id={`${image.text}-wrapper`}>
        <Image
          id={image.text}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onClick={handleClick}
        />
      </div>
    </motion.div>
  );
};

ImgMotionDiv.displayName = "ImgMotionDiv";

export default ImgMotionDiv;
