"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";

import ImageBorder from "@/public/SVG/image_border.svg";
// import { DropDownMenu, DropDownItem } from "../components/Dropdown";

import NextImage from "next/image";
import { Category, Categories, senseImageMap } from "../lib/types";
import CategorySelect from "@/app/components/CategorySelect";
import BackArrow from "@/public/SVG/buttons/back_arrow.svg";
import { Image } from "@/app/lib/types";

import { useMotionValue } from "framer-motion";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

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
  const [uploading, setUploading] = useState(false);
  // const progress = useMotionValue(0);
  const router = useRouter();

  useEffect(() => {
    // Update the image URL when `croppedImage` changes
    setImageUrl(URL.createObjectURL(croppedImage!));
  }, [croppedImage]);

  const startUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", croppedImage);
    formData.append("category", category);
    formData.append("description", body);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.status);
      if (data.error) {
        toast.error("Failed to upload image");
        setUploading(false);
        return;
      } else {
        toast.success("Image uploaded successfully");
        router.push(`/view/${category}`);
      }

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("Failed to upload image, please try again later.");
    }
  };

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
          <NextImage
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
          setSense={(sense: Image) => {
            if (sense.text === "arbor") return;
            setCategory(sense.text);
          }}
          hover={false}
        />
      </div>
      <div className={styles.writingArea}>
        <p className={styles.writingCharacterCount}>
          {body.length}/{characterLimit}
        </p>
        <textarea
          required
          value={body}
          onChange={handleBodyChange}
          rows={6}
          className={styles.writingTextArea}
        ></textarea>
      </div>
      <button
        className={styles.submitButton}
        disabled={uploading}
        onClick={startUpload}
      >
        upload{" "}
      </button>
    </div>
  );
}

export default WritingUpload;
