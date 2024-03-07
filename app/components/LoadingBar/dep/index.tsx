import { ReactComponentElement, useEffect, useRef } from "react";

import Loading from "@/public/SVG/loading.svg";
import styles from "./LoadingBar.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

function LoadingBar() {
  gsap.registerPlugin(MotionPathPlugin);
  const dot1 = useRef<HTMLDivElement>(null);
  const dot2 = useRef<HTMLDivElement>(null);
  const dot3 = useRef<HTMLDivElement>(null);
  const dot4 = useRef<HTMLDivElement>(null);

  const dur = 0.4;
  const dur2 = 0.5;
  const easing = "power1.inOut";
  const easing2 = "power1.inOut";

  useGSAP(() => {
    // [dot1, dot2, dot3, dot4].map((dot) => {
    //   gsap.set(dot.current, {
    //     transformStyle: "preserve-3d",
    //     transformOrigin: "50% 50%",
    //   });
    // });

    const tl = gsap.timeline({
      paused: true,
      delay: 1,
      repeat: -1,
      yoyo: true,
    });

    tl.to(dot1.current, {
      duration: dur,
      motionPath: {
        path: [
          { x: 0, y: 7 },
          { x: 0, y: 0 },
          { x: 25, y: -35 },
          { x: 53, y: 0 },
        ],
        curviness: 2,
        autoRotate: true,
      },
      ease: easing,
      // position: "blueJumpFirst",
    })
      .to(dot2.current, {
        duration: dur2,
        motionPath: {
          path: [
            { x: 5, y: 0 },
            { x: -53, y: 0 },
          ],
          curviness: 2,
          autoRotate: true,
        },
        ease: easing,
        // position: "blueJumpFirst-=0.1",
      })
      .to(dot1.current, {
        duration: dur,
        motionPath: {
          path: [
            { x: 53, y: 7 },
            { x: 53, y: 0 },
            { x: 83, y: -35 },
            { x: 106, y: 0 },
          ],
          curviness: 2,
          autoRotate: true,
        },
        ease: easing,
        // position: "blueJumpTwo",
      })
      .to(dot3.current, {
        duration: dur2,
        motionPath: {
          path: [
            { x: 5, y: 0 },
            { x: -53, y: 0 },
          ],
          curviness: 2,
          autoRotate: true,
        },
        ease: easing,
        // position: "blueJumpTwo-=0.1",
      })
      .to(dot1.current, {
        duration: dur,
        motionPath: {
          path: [
            { x: 106, y: 7 },
            { x: 106, y: 0 },
            { x: 140, y: -35 },
            { x: 160, y: 0 },
          ],
        },
        ease: easing,
        // position: "blueJumpThree",
      })
      .to(dot4.current, {
        duration: dur2,
        motionPath: {
          path: [
            { x: 5, y: 0 },
            { x: -53, y: 0 },
          ],
          curviness: 2,
          autoRotate: true,
        },
        ease: easing,
        // position: "blueJumpThree-=0.07",
      })
      .progress(1)
      .progress(0)
      .play();
  });

  return (
    <div className={styles.container}>
      {/* <Loading ref={svgRef} width={"100px"} height={"100px"} /> */}
      <div className={styles.dotContainer}>
        <div ref={dot1} className={styles.dot1} />
        <div ref={dot2} className={styles.dot2} />
        <div ref={dot3} className={styles.dot3} />
        <div ref={dot4} className={styles.dot4} />
      </div>
    </div>
  );
}

export default LoadingBar;
