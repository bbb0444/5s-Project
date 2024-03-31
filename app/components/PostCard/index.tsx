import React from "react";
import styles from "./PostCard.module.scss";
import { Categories, Post } from "@/app/lib/types";
import Image from "next/image";

import Card from "@/public/SVG/card.svg";

function index({ post }: { post: Post }) {
  return (
    <div className={styles.container}>
      <Card className={styles.card} />
      <div className={styles.img}>
        <Image
          src={post.s3_bucket_link}
          alt={"image of " + Categories[post.category_key]}
          layout="fill"
          objectFit="cover"
          // className={styles.img}
        />
      </div>
      <div className={styles.desc}>
        <p>{post.description}</p>
      </div>
    </div>
  );
}

export default index;
