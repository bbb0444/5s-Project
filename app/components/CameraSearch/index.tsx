import React from "react";
import Image from "next/image";
import styles from "./CameraSearch.module.scss";
import Link from "next/link";

interface Props {
  text: string;
}

const index: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.camera}>
        <Link href="/upload">
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
        <Link href="/upload">
          <Image
            src={"/SVG/search.svg"}
            alt="icon of magnifying glass"
            width={70} // width of the image file
            height={70} // height of the image file
            objectFit="contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default index;
