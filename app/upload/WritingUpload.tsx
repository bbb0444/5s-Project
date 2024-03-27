"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import ImageBorder from "@/public/SVG/image_border.svg";
import { DropDownMenu, DropDownItem } from "../components/Dropdown";

import { Category, Categories, senseImageMap } from "../lib/types";
import CategorySelect from "@/app/components/CategorySelect";
import BackArrow from "@/public/SVG/buttons/back_arrow.svg";
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
  const characterLimit = 100;
  const [body, setBody] = useState("");
  const senseImage = senseImageMap.get(category);
  const [imageUrl, setImageUrl] = useState(() =>
    URL.createObjectURL(croppedImage!)
  );

  useEffect(() => {
    // Update the image URL when `croppedImage` changes
    setImageUrl(URL.createObjectURL(croppedImage!));
  }, [croppedImage]);

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > characterLimit) return;
    console.log(body.length);
    setBody(e.target.value);
  };
  return (
    <div className={styles.writingContainer}>
      <button
        className={styles.writtenBackArrow}
        onClick={() => setActiveWindow("camera")}
      >
        <BackArrow />
      </button>
      <div className={styles.writingImageContainer}>
        <div className={styles.writingImageBorder}>
          <ImageBorder className={styles.imageBorder} />
          <Image
            src={imageUrl}
            alt="cropped user image"
            width={100} // width of the image file
            height={100} // height of the image file
            className={styles.croppedImage}
          />
        </div>
      </div>
      <div className={styles.writingCategorySelect}>
        <CategorySelect
          sense={senseImage!}
          animateOut={() => Promise.resolve(true)}
          setSense={(sense: SenseImage) => setCategory(sense.text)}
          hover={false}
        />
      </div>
      <div className={styles.writingArea}>
        <text className={styles.writingCharacterCount}>
          {body.length}/{characterLimit}
        </text>
        <textarea
          required
          value={body}
          onChange={handleBodyChange}
          rows={6}
          className={styles.writingTextArea}
        ></textarea>
      </div>
      <button className={styles.submitButton}>submit</button>
    </div>
  );
}

export default WritingUpload;
