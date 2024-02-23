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
import { PanInfo, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Header.module.scss";
import { Grid, ImageProps, Position } from "./types";
import BlobSVG from "./BlobSVG";

interface ImgMotionDivProps {
  image: ImageProps;
  index: number;
  randomX: number;
  randomY: number;
  lock: Position;
  animate: (target: string, animation: object, options: object) => void;
  randomPos: () => Position;
  grid: Grid;
  parent: RefObject<HTMLDivElement>;
  onDragFinish: (
    event: PointerEvent,
    info: PanInfo,
    imageRef: RefObject<HTMLImageElement>,
    image: ImageProps,
    end: boolean
  ) => boolean;
}

const ImgMotionDiv: FC<ImgMotionDivProps> = ({
  image,
  index,
  randomX,
  randomY,
  lock,
  animate,
  randomPos,
  grid,
  parent,
  onDragFinish,
}) => {
  const [initialPos, setInitialPosition] = useState({ x: 0, y: 0 });
  const intersecting = useRef<boolean>(false);

  // useGSAP(() => {
  //   const timeline = gsap.timeline({ repeat: -1, yoyo: true });

  //   timeline
  //     .to(imageRef.current, {
  //       duration: 5,
  //       delay: index * 0.1,
  //       ease: "power1.inOut",
  //       x: initialPos.x + randomX,
  //       y: initialPos.y + randomY,
  //     })
  //     .to(imageRef.current, {
  //       duration: 5,
  //       delay: index * 0.1,
  //       ease: "power1.inOut",
  //       x: initialPos.x + randomY,
  //       y: initialPos.y + randomX,
  //     })
  //     .to(imageRef.current, {
  //       duration: 5,
  //       delay: index * 0.1,
  //       ease: "power1.inOut",
  //       x: initialPos.x + randomX,
  //       y: initialPos.y + randomY,
  //     })
  //     .to(imageRef.current, {
  //       duration: 5,
  //       delay: index * 0.1,
  //       ease: "power1.inOut",
  //       x: initialPos.x,
  //       y: initialPos.y,
  //     });

  //   return () => {
  //     timeline.kill();
  //   };
  // }, [index, initialPos.x, initialPos.y, randomX, randomY]);

  useEffect(() => {
    const fetchPosition = async () => {
      const position: Position = randomPos();
      // console.log(position);
      setInitialPosition({ x: position.x, y: position.y });
      // setInitialPosition({ x: 0, y: 0 });
    };

    fetchPosition();
  }, [randomPos, grid]);

  // useEffect(() => {
  //   console.log(parent.current?.getBoundingClientRect().top);
  //   console.log(parent.current?.getBoundingClientRect().left);
  //   console.log(parent.current?.getBoundingClientRect().right!);
  //   console.log(parent.current?.getBoundingClientRect().bottom!);
  // }, []);

  const setImage = useRef(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDrag = (event: PointerEvent, info: PanInfo) => {
    const intersect = onDragFinish(event, info, imageRef, image, false);
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
            duration: 1,
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
            duration: 0.5,
            ease: "easeInOut",
          }
        );
      }
      console.log(intersecting.current);
    }
  };

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    onDragFinish(event, info, imageRef, image, true);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [
          initialPos.x,
          initialPos.x + randomX,
          initialPos.x + randomY,
          initialPos.x + randomX,
          initialPos.x,
        ],
        y: [
          initialPos.y,
          initialPos.y + randomY,
          initialPos.y + randomX,
          initialPos.y + randomY,
          initialPos.y,
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
      ref={imageRef}
      className={styles.imageBox}
      drag={true}
      dragConstraints={parent}
      onDragStart={() => {
        setImage.current = false;
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <Image
        id={image.text}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={styles.image}
      />
      {/* <div className={styles.imageBlobSVG}>
        <BlobSVG
          color1={"rgb(120,0,0)"}
          color2={"rgb(220,0,0)"}
          numPoints={5}
          width={250}
          height={250}
        />
      </div> */}
    </motion.div>
  );
};

ImgMotionDiv.displayName = "ImgMotionDiv";

export default ImgMotionDiv;
