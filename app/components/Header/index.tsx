import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";

import ScrollingText from "../ScrollingText";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex flex-col p-10% relative">
          <ScrollingText />
          <li className={styles.image}>
            <Image
              src={"/SVG/Eye.svg"}
              alt="black and white print of a eye"
              width={500} // width of the image file
              height={500} // height of the image file
              className="order-1 p-5%"
            />

            <div className={styles.dropContent}>
              <h1>eye</h1>
            </div>
          </li>

          <li className={styles.image}>
            <Image
              src={"/SVG/Ear.svg"}
              alt="black and white print of a ear"
              width={500} // width of the image file
              height={500} // height of the image file
              className="p-10%"
            />
            <div className={styles.dropContent}>
              {/* <div className={styles.isolate}>
                <div className={styles.grain}>
                  <div className={styles.overlay}> */}
              <h1>e</h1>
              <h1>a</h1>
              <h1>r</h1>
            </div>
            {/* </div>
              </div>
            </div> */}
          </li>

          <li className={styles.image}>
            <Image
              src={"/SVG/Mouth.svg"}
              alt="black and white print of a mouth"
              width={500} // width of the image file
              height={500} // height of the image file
              className="p-10%"
            />
            <div className={styles.dropContent}>
              <h1>mouth</h1>
            </div>
          </li>

          <li className={styles.image}>
            <Image
              src={"/SVG/Hand.svg"}
              alt="black and white print of a hand"
              width={500} // width of the image file
              height={500} // height of the image file
              className="p-10%"
            />
            <div className={styles.dropContent}>
              <h1>hand</h1>
            </div>
          </li>

          <li className={styles.image}>
            <Image
              src={"/SVG/Nose.svg"}
              alt="black and white print of a nose"
              width={500} // width of the image file
              height={500} // height of the image file
              className="p-10%"
            />
            <div className={styles.dropContent}>
              <h1>nose</h1>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
