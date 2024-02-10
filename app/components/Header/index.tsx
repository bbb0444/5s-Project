import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import CameraSearch from "../CameraSearch";

const images = [
  {
    src: "/SVG/Eye.svg",
    alt: "black and white print of an eye",
    width: 110,
    height: 110,
    text: "eye",
  },
  {
    src: "/SVG/Ear.svg",
    alt: "black and white print of an ear",
    width: 80,
    height: 80,
    text: "ear",
  },
  {
    src: "/SVG/Mouth.svg",
    alt: "black and white print of a mouth",
    width: 100,
    height: 100,
    text: "mouth",
  },
  {
    src: "/SVG/Hand.svg",
    alt: "black and white print of a hand",
    width: 70,
    height: 70,
    text: "hand",
  },
  {
    src: "/SVG/Nose.svg",
    alt: "black and white print of a nose",
    width: 65,
    height: 65,
    text: "nose",
  },
];

const Header = () => {
  return (
    <div className={styles.main}>
      <ul className={styles.square}>
        <div className={styles.column}>
          {images.map((image, index) => (
            <div className={styles.container} key={index}>
              <li
                key={index}
                style={
                  {
                    "--i": index + 1,
                    width: "100%",
                    height: "100%",
                  } as React.CSSProperties
                }
              >
                <div className={styles.imageBox}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={styles.image}
                  />
                </div>
                <div className={styles.dropContent}>
                  <CameraSearch text={image.text}></CameraSearch>
                </div>
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Header;
