import React from "react";
import styles from "./PostCard.module.scss";
import { Post } from "@/app/lib/types";
import Image from "next/image";

import Card from "@/public/SVG/card.svg";

function index({ post }: { post: Post }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card width={"100%"} height={"100%"} />
      </div>
      {/* <div className={styles.img}>
        <Image
          src="/imgs/shirt.jpg"
          alt={"image of " + post.category}
          width={100}
          height={100}
        />
      </div> */}
      <div className={styles.desc}>
        <p>{post.id}</p>
      </div>
    </div>
  );
}

export default index;
