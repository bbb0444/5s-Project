import React from "react";
import { Category } from "../../lib/types";
import { getPosts } from "../../lib/mockData";
import styles from "../view.module.scss";
import Image from "next/image";
import { SenseImage, senseImageMap } from "../../lib/types";

interface params {
  category: Category;
}

export default function Search({ params }: { params: params }) {
  const Sense = senseImageMap.get(params.category);

  return (
    <div className={styles.main}>
      <div className={styles.middleContainer}>
        <div className={styles.middle}>
          {Sense && (
            <div className={styles.img}>
              <Image
                src={Sense.src}
                alt={Sense.alt}
                width={Sense.width}
                height={Sense.height}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
