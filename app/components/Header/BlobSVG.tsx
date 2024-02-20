import styles from "./BlobSVG.module.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { v4 as uuidv4 } from "uuid";

type BlobSVGProps = {
  color1: string;
  color2: string;
  numPoints: number;
  width?: number;
  height?: number;
};

function BlobSVG({ color1, color2, numPoints, width, height }: BlobSVGProps) {
  const outerSVG = useRef<SVGSVGElement>(null);
  const path1 = useRef<SVGPathElement>(null);
  const [gradientId, setGradientId] = useState("");
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    setGradientId(uuidv4());
    const updateRadius = () => {
      if (outerSVG.current) {
        const { width, height } = outerSVG.current.getBoundingClientRect();
        setCenter({ x: width / 2, y: height / 2 });
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  type options = {
    element: SVGPathElement | null;
    numPoints: number;
    centerX: number;
    centerY: number;
    minRadius: number;
    maxRadius: number;
    minDuration: number;
    maxDuration: number;
  };

  type blob = {
    points: point[];
    timeline: gsap.core.Timeline;
  };

  type point = {
    x: number;
    y: number;
  };

  function createBlob(options: options, timeline: gsap.core.Timeline) {
    let points: point[] = [];
    let path = options.element;
    let slice = (Math.PI * 2) / options.numPoints;
    let startAngle = gsap.utils.random(0, 360);

    timeline.to(
      {},
      {
        duration: options.maxDuration,
        repeat: -1,
        onUpdate: update,
      }
    );

    for (let i = 0; i < options.numPoints; i++) {
      let angle = startAngle + i * slice;
      let duration = gsap.utils.random(
        options.minDuration,
        options.maxDuration
      );

      let point = {
        x: options.centerX + Math.cos(angle) * options.minRadius,
        y: options.centerY + Math.sin(angle) * options.minRadius,
      };

      let tween = gsap.to(point, {
        duration,
        x: options.centerX + Math.cos(angle) * options.maxRadius,
        y: options.centerY + Math.sin(angle) * options.maxRadius,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      timeline.add(tween, -gsap.utils.random(0, duration));
      points.push(point);
    }

    const blob = {
      points,
      timeline,
    };

    function update() {
      path!.setAttribute("d", cardinal(points, true, 1));
    }

    return blob as blob;
  }

  // Cardinal spline - a uniform Catmull-Rom spline with a tension option
  function cardinal(data: point[], closed: boolean, tension: number) {
    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    let size = data.length - (closed ? 0 : 1);
    let path = "M" + data[0].x + " " + data[0].y + " C";

    for (let i = 0; i < size; i++) {
      let p0, p1, p2, p3;

      if (closed) {
        p0 = data[(i - 1 + size) % size];
        p1 = data[i];
        p2 = data[(i + 1) % size];
        p3 = data[(i + 2) % size];
      } else {
        p0 = i == 0 ? data[0] : data[i - 1];
        p1 = data[i];
        p2 = data[i + 1];
        p3 = i == size - 1 ? p2 : data[i + 2];
      }

      let x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
      let y1 = p1.y + ((p2.y - p0.y) / 6) * tension;

      let x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
      let y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

      path +=
        " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
  }

  useGSAP(() => {
    if (path1.current && center.x && center.y) {
      const timeline = gsap.timeline({ repeat: Infinity, repeatDelay: 0.5 });

      let minRadius: number;
      let maxRadius: number;

      if (!height || !width) {
        const minDimension = Math.min(center.x, center.y);
        minRadius = minDimension * 0.85;
        maxRadius = minDimension * 1;
      } else {
        const minDimension = Math.min(width, height);
        minRadius = (minDimension / 2) * 0.85;
        maxRadius = (minDimension / 2) * 1;
      }

      const blob = createBlob(
        {
          element: path1.current,
          numPoints: numPoints,
          centerX: center.x,
          centerY: center.y,
          minRadius: minRadius,
          maxRadius: maxRadius,
          minDuration: 1,
          maxDuration: 2,
        },
        timeline
      );
    }
  }, [center]);

  return (
    <svg
      ref={outerSVG}
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "100%"}
      height={height ? height : "100%"}
      // preserveAspectRatio="xMidYMid meet"
    >
      {color1 !== color2 && (
        <defs>
          <radialGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </radialGradient>
        </defs>
      )}

      <path
        ref={path1}
        id="path1"
        fill={color1 !== color2 ? `url(#${gradientId})` : color1}
      ></path>

      <g id="dot-container"></g>
    </svg>
  );
}

export default BlobSVG;
