import { ReactComponentElement, useEffect, useRef } from "react";

import Loading from "@/public/SVG/loading.svg";
import styles from "./LoadingBar.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function LoadingBar({ direction = "forwards" }) {
  const svgRef = useRef<any | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    console.log(svgRef.current);

    // Select all path elements within the SVG
    let paths = svgRef.current.querySelectorAll("path");

    // Create a GSAP timeline
    const tl = gsap.timeline({ repeat: -1 }); // repeat: -1 makes the timeline repeat indefinitely

    // Animate the paths in sequence
    if (direction === "backwards") {
      paths = Array.from(paths).reverse();
    }
    paths.forEach((path: string, index: number) => {
      // console.log(path);
      tl.to(path, {
        y: -50,
        duration: 0.25,
      }).to(path, {
        y: origin,
        duration: 0.35,
        ease: "bounce.out",
        // stagger: 0.1,
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Loading ref={svgRef} width={"100px"} height={"100px"} />
    </div>
  );
}

export default LoadingBar;
