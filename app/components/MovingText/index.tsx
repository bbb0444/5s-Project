import styles from "./MovingText.module.scss";
import { horizontalLoop } from "@/app/lib/HorizontalLooper";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function MovingText({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  // Create a timeline for the text block
  // useGSAP(() => {
  //   const loop = horizontalLoop(textRef, {
  //     repeat: -1, // Loop forever
  //     speed: 1, // Speed of the animation
  //     paused: false, // Start the animation immediately
  //   });
  // }),
  //   [];

  return (
    <p className={styles.text} ref={textRef}>
      {" "}
      {text}{" "}
    </p>
  );
}

export default MovingText;
