import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import ScrollingText from "../ScrollingText";
import CameraSearch from "../CameraSearch";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className={styles.column}>
          <ScrollingText />
          <li className={styles.container}>
            <Image
              src={"/SVG/Eye.svg"}
              alt="black and white print of a eye"
              width={150} // width of the image file
              height={150} // height of the image file
              className={styles.image}
            />
            <div className={styles.dropContent}>
              <CameraSearch text="eye"></CameraSearch>
            </div>
          </li>

          <li className={styles.container}>
            <Image
              src={"/SVG/Ear.svg"}
              alt="black and white print of a ear"
              width={100} // width of the image file
              height={100} // height of the image file
              className={styles.image}
            />
            <div className={styles.dropContent}>
              {/* <div className={styles.isolate}>
                <div className={styles.grain}>
                  <div className={styles.overlay}> */}
              <CameraSearch text="ear"></CameraSearch>
            </div>
            {/* </div>
              </div>
            </div> */}
          </li>

          <li className={styles.container}>
            <Image
              src={"/SVG/Mouth.svg"}
              alt="black and white print of a mouth"
              width={120} // width of the image file
              height={120} // height of the image file
              className={styles.image}
            />
            <div className={styles.dropContent}>
              <CameraSearch text="mouth"></CameraSearch>
            </div>
          </li>

          <li className={styles.container}>
            <Image
              src={"/SVG/Hand.svg"}
              alt="black and white print of a hand"
              width={110} // width of the image file
              height={110} // height of the image file
              className={styles.image}
            />
            <div className={styles.dropContent}>
              <CameraSearch text="hand"></CameraSearch>
            </div>
          </li>

          <li className={styles.container}>
            <Image
              src={"/SVG/Nose.svg"}
              alt="black and white print of a nose"
              width={105} // width of the image file
              height={105} // height of the image file
              className={styles.image}
            />
            <div className={styles.dropContent}>
              <CameraSearch text="nose"></CameraSearch>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
