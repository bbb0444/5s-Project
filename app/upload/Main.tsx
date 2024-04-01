"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import { motion, AnimatePresence, delay, useAnimation } from "framer-motion";
import ImageCropper from "../components/ImageCropper";
import { DropDownMenu, DropDownItem } from "../components/Dropdown";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Category, Categories } from "../lib/types";
import PhotoUpload from "./PhotoUpload";
import WritingUplaod from "./WritingUpload";

import { verify } from "@/app/lib/Auth";
import { toast } from "react-toastify";
import ToastNotification from "@/app/components/ToastNotification";

function Index({ isVerified }: { isVerified: boolean }) {
  // writing
  const [croppedImage, setCroppedImage] = useState<Blob>();

  const searchParams = useSearchParams();

  type Windows = "verification" | "camera" | "writing";

  const [category, setCategory] = useState<Category>("eye");

  const [activeWindow, setActiveWindow] = useState<Windows>(
    isVerified ? "camera" : "verification"
  );

  const [textAreaValue, setTextAreaValue] = useState("");
  const [submitCode, setSubmitCode] = useState("");

  const submit = useAnimation();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value);
  };

  useEffect(() => {
    // toast.info("enter code to verify");
    setCategory(searchParams.get("category") as Category);
    const verifyAndSetWindow = async () => {
      await verify(submitCode).then((res) => {
        if (res) {
          setActiveWindow("camera");
          // toast.success("verified!");
        } else {
          toast.error("invalid code");
        }
      });
    };

    if (submitCode !== "") {
      verifyAndSetWindow();
    }
    // console.log(activeWindow);
  }, [searchParams, submitCode]);

  return (
    <div className={styles.main}>
      <ToastNotification />
      {activeWindow === "verification" && (
        <div className={styles.verificationContainer}>
          <motion.input
            animate={submit}
            transition={{ duration: 1 }}
            maxLength={15}
            // rows={1}
            onChange={handleTextAreaChange}
            type="password"
            className={styles.verificationTextArea}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSubmitCode(textAreaValue);
              }
            }}
          ></motion.input>
        </div>
      )}
      <AnimatePresence initial={true} mode="popLayout">
        {activeWindow === "camera" && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "0" }}
            exit={{ x: "-100vw" }}
            transition={{
              animate: { duration: 0.75, delay: 0.25, type: "spring" }, // delay for entering animation
              exit: { duration: 0.75, delay: 1, type: "spring" }, // delay for exiting animation
            }}
          >
            <PhotoUpload
              setCroppedImage={setCroppedImage}
              setActiveWindow={setActiveWindow}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={true} mode="popLayout">
        {activeWindow === "writing" && (
          <div className={styles.writingContainer}>
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: "0" }}
              exit={{ x: "-100vw" }}
              transition={{
                animate: { duration: 0.75, delay: 1, type: "spring" }, // delay for entering animation
                exit: { duration: 0.75, delay: 0.25, type: "spring" }, // delay for exiting animation
              }}
            >
              <WritingUplaod
                category={category}
                croppedImage={croppedImage!}
                setCategory={setCategory}
                setActiveWindow={setActiveWindow}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Index;
