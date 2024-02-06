"use client";

import React from "react";
import Image from "next/image";
import styles from "./CameraSearch.module.scss";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion, AnimatePresence, delay } from "framer-motion";

interface Props {
  text: string;
}

const handleCameraClick = (router: any, text: String) => {
  // Start the animation here
  // Delay the redirection
  setTimeout(() => {
    router.push(
      {
        pathname: "/upload",
        query: { text: text },
      },
      "/upload"
    );
  }, 1000); // Adjust the delay to match the duration of your animation
};

const Index: React.FC<Props> = ({ text }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.camera}>
        <Link href={{ pathname: "/upload", query: { category: text } }}>
          <Image
            src={"/SVG/camera.svg"}
            alt="icon of a digital camera"
            width={100} // width of the image file
            height={100} // height of the image file
            objectFit="contain"
          />
        </Link>
      </div>
      <div className={styles.text}>{text}</div>
      <div className={styles.search}>
        {/* <Link href="/upload"> */}
        <Image
          src={"/SVG/search.svg"}
          alt="icon of magnifying glass"
          width={70} // width of the image file
          height={70} // height of the image file
          objectFit="contain"
          onClick={() => handleCameraClick(router, text)}
        />
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Index;
