"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import ImageCropper from "../components/ImageCropper";
import { DropDownMenu, DropDownItem } from "../components/Dropdown";
import { get } from "http";
import { Staatliches } from "next/font/google";
import { StereoCamera } from "three";

import { CSSTransition } from "react-transition-group";

function Index() {
  // photo

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [altUpload, setAltUpload] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement | null>(null);

  // writing

  type Category = "eye" | "ear" | "mouth" | "nose" | "hand";
  const categories: Category[] = ["eye", "ear", "mouth", "nose", "hand"];

  const [cameraHidden, setCameraHidden] = useState(false);
  const [category, setCategory] = useState<Category>("eye");
  const [body, setBody] = useState("");

  const [activeWindow, setActiveWindow] = useState("camera");

  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const acceptPhoto = async () => {
    if (!croppedImage) return;
    console.log(croppedImage);
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
      console.log("Webcam access blocked by the user or some error occurred");
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
    console.log(croppedImage);
    setPosition({ x: 0, y: 0 });
    setCameraHidden(false);
  };
  const abort = () => {
    setHasPhoto(false);
    setPhotoData(null);
    getCapture();
    setCameraHidden(false);
  };

  useEffect(() => {
    getCapture();
  }, []);

  // useEffect(() => {
  //   if (cameraHidden) {
  //     const timer = setTimeout(() => {
  //       setInTransition(true);
  //     }, 500); // Delay equal to the transition duration

  //     return () => {
  //       clearTimeout(timer);
  //       setWriting(true);
  //     };
  //   } else {
  //     setInTransition(false);
  //   }
  // }, [cameraHidden]);

  return (
    <div className={styles.root}>
      <CSSTransition
        in={activeWindow === "camera"}
        timeout={500}
        unmountOnExit
        classNames={{
          enter: styles.camera_enter,
          enterActive: styles.camera_enter_active,
          exit: styles.camera_exit,
          exitActive: styles.camera_exit_active,
        }}
      >
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
                  onCrop={setCroppedImage}
                  onCropChange={setPosition}
                  width={1000}
                  height={1000}
                />
              </div>
            )}
            {!hasPhoto && (
              <>
                <div className={styles.video}>
                  <video ref={videoRef} className={styles.video} />
                  <div className={styles.altUpload}>
                    <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                      <Image
                        src={"/imgs/static.gif"}
                        alt="moving television static"
                        width={1000}
                        height={1000}
                        className={videoActive ? styles.hidden : styles.static}
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
            {videoActive && !hasPhoto && (
              <button onClick={takePhoto}> capture </button>
            )}
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
            {/* <div className={styles.rotSlider}> */}
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              ref={inputRef}
              style={{}}
            />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeWindow === "writing"}
        timeout={500}
        unmountOnExit
      >
        <div className={styles.root}>
          <Image
            // src={URL.createObjectURL(croppedImage!)}
            src="/imgs/shirt.jpg"
            alt="cropped user image"
            width={100} // width of the image file
            height={100} // height of the image file
            className={styles.croppedImage}
          />

          {/* <label>category:</label> */}
          <DropDownMenu
            name="category"
            // value={category}
            // onChange={(e) => setCategory(e.target.value as Category)}
            // className={styles.category}
          >
            {categories.map((category) => (
              <DropDownItem
                key={category}
                name={category}
                imageSRC={"/SVG/" + category + ".svg"}
                imageALT={"SVG Image of " + category}
                onClick={() => setCategory(category)}
              ></DropDownItem>
            ))}
          </DropDownMenu>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button>Add Blog</button>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Index;
