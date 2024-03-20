"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import { DropDownMenu, DropDownItem } from "../components/Dropdown";

import { Category, Categories, senseImageMap } from "../lib/types";
import CategorySelect from "@/app/components/CategorySelect";

import { SenseImage } from "@/app/lib/types";

function WritingUpload({
  croppedImage,
  category,
  setCategory,
  setActiveWindow,
}: {
  croppedImage: Blob;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setActiveWindow: React.Dispatch<
    React.SetStateAction<"verification" | "camera" | "writing">
  >;
}) {
  const [body, setBody] = useState("");
  const senseImage = senseImageMap.get(category);
  return (
    <div className={styles.writingContainer}>
      <button onClick={() => setActiveWindow("camera")}>back</button>
      <Image
        src={URL.createObjectURL(croppedImage)}
        // src="/imgs/shirt.jpg"
        alt="cropped user image"
        width={100} // width of the image file
        height={100} // height of the image file
        className={styles.croppedImage}
      />
      <CategorySelect
        sense={senseImage!}
        animateOut={() => Promise.resolve(true)}
        setSense={(sense: SenseImage) => setCategory(sense.text)}
        hover={false}
      />
      <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={styles.textArea}
      ></textarea>
      <button>Add Blog</button>
    </div>
  );
}

export default WritingUpload;
