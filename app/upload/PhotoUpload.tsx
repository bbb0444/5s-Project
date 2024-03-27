"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import { motion, AnimatePresence, delay } from "framer-motion";
import ImageCropper from "../components/ImageCropper";
import { Area } from "react-easy-crop";
import { getCroppedImage } from "../lib/ImageCropConverter";
import { DropDownMenu, DropDownItem } from "../components/Dropdown";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import BackArrow from "@/public/SVG/buttons/back_arrow.svg";
import { Category } from "../lib/types";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

function PhotoUpload({
  setCroppedImage,
  setActiveWindow,
}: {
  setCroppedImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  setActiveWindow: React.Dispatch<
    React.SetStateAction<"verification" | "camera" | "writing">
  >;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [altUpload, setAltUpload] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [area, setArea] = useState<Area | null>(null);

  const [warned, setWarned] = useState(false);
  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const acceptPhoto = async () => {
    if (!altUpload) {
      takePhoto();
    }
    if (!photoData) return;
    await getCroppedImage(photoData, area!, rotation, 1000, 1000).then(
      (croppedImage) => {
        console.log("yo", croppedImage);
        setCroppedImage(croppedImage!);
      }
    );
    console.log(area);
    // console.log(croppedImage);
    setActiveWindow("writing");
    //
  };

  const getCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoActive(true);
      // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1080, height: 1080 },
          audio: false,
        })
        .then((stream) => {
          let video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video!.play();
            };
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // } else {
      //   setMobile(true);
      //   console.error("Your browser does not support camera capture");
      // }
    } catch (err) {
      if (warned) return;
      toast.warn("Webcam access blocked");
      toast.info("please click on the camera screen to upload a photo...", {
        // autoClose: false,
      });
      setWarned(true);
      setAltUpload(true);
    }
  };

  const takePhoto = () => {
    if (hasPhoto) return;
    // if (videoRef.current!.videoWidth === 0) {
    //   setAltUpload(true);
    //   return;
    // }

    const width = videoRef.current!.videoWidth;
    const height = videoRef.current!.videoHeight;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo!.width = width;
    photo!.height = height;

    let context = photo!.getContext("2d");
    context!.drawImage(video!, 0, 0, width, height);
    let photoData = photo!.toDataURL(); // Save the photo data to a variable
    console.log(photoData);
    setHasPhoto(true);
    setPhotoData(photoData);
  };

  const reset = () => {
    setZoom(1); // Reset zoom to initial value
    setRotation(0); // Reset rotation to initial value
    // console.log(croppedImage);
    setPosition({ x: 0, y: 0 });
  };
  const abort = () => {
    setHasPhoto(false);
    setPhotoData(null);
    getCapture();
  };

  useEffect(() => {
    getCapture();
  }, []);

  return (
    <>
      <div className={styles.uploadBackArrow}>
        <Link href="/">
          <BackArrow />
        </Link>
      </div>

      <div className={styles.cameraContainer}>
        <Image
          src={"/SVG/upload.svg"}
          alt="black and white back face of a digital camera"
          width={1000} // width of the image file
          height={1000} // height of the image file
          className={styles.camera}
        />
        <div className={styles.captureContainer}>
          {hasPhoto && (
            <div className={styles.imageCropper}>
              <ImageCropper
                position={position}
                zoom={zoom}
                onZoomChange={handleOnZoom}
                rotation={rotation}
                onRotationChange={setRotation}
                source={photoData!}
                onCropComplete={setCroppedImage}
                onCropChange={setPosition}
                setArea={setArea}
                width={1000}
                height={1000}
              />
            </div>
          )}
          {!hasPhoto && (
            <>
              <div className={styles.video}>
                {!altUpload && (
                  <video ref={videoRef} className={styles.videoFeed} />
                )}
                <div className={styles.altUpload}>
                  <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                    <Image
                      src={"/imgs/static.gif"}
                      alt="moving television static"
                      width={1000}
                      height={1000}
                      className={videoActive ? styles.hidden : styles.static}
                      // style={{ pointerEvents: "none" }}
                    ></Image>
                  </label>
                </div>
              </div>

              {altUpload && (
                <input
                  className={"hidden"}
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  capture={true}
                  onChange={(event) => {
                    if (event.target.files) {
                      const file = event.target.files[0];
                      setPhotoData(URL.createObjectURL(file));
                      setHasPhoto(true);

                      // handle the file
                    }
                  }}
                />
              )}
            </>
          )}
        </div>

        <div className={"hidden"}>
          <canvas ref={photoRef}></canvas>
        </div>

        <div className={styles.buttons}>
          {/* {videoActive && !hasPhoto && (
            <button onClick={takePhoto} className={styles.captureButton}>
              {" "}
              capture{" "}
            </button>
          )} */}
          <div className={styles.accept}>
            <button onClick={acceptPhoto} className={styles.buttons}>
              <Image
                src={"/SVG/buttons/accept.svg"}
                width={70}
                height={70}
                alt="accept symbol button"
              />
            </button>
          </div>
          <div className={styles.reset}>
            <button onClick={reset} className={styles.buttons}>
              <Image
                src={"/SVG/buttons/reset.svg"}
                width={70}
                height={70}
                alt="reset symbol button"
              />
            </button>
          </div>
          <div className={styles.abort}>
            <button onClick={abort} className={styles.buttons}>
              <Image
                src={"/SVG/buttons/abort.svg"}
                width={70}
                height={70}
                alt="abort symbol button"
              />
            </button>
          </div>
          <div className={styles.rotDisplayContainer}>
            <text className={styles.rotValue}> {rotation.toFixed(2)}° </text>
          </div>
          {/* <div className={styles.rotSlider}> */}
        </div>
      </div>
      {!isMobile && (
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(parseInt(e.target.value))}
          ref={inputRef}
          style={{}}
        />
      )}
    </>
  );
}

export default PhotoUpload;
