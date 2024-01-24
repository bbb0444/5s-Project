"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

import ImageCropper from "../components/ImageCropper";
import { get } from "http";

function Index() {
  const [mobile, setMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [altUpload, setAltUpload] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const uploadPhoto = async () => {
    if (!croppedImage) return;
    //
  };

  const getCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
    } else {
      setMobile(true);
      console.error("Your browser does not support camera capture");
    }
  };

  const takePhoto = () => {
    if (videoRef.current!.videoWidth === 0) {
      setAltUpload(true);
      return;
    }

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
    setCroppedImage(undefined); // Clear the cropped image
  };
  const redo = () => {
    setHasPhoto(false);
    setPhotoData(null);
    getCapture();
  };

  useEffect(() => {
    getCapture();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.parent}>
        <div className={styles.container}>
          <div className={styles.image}>
            <Image
              src={"/SVG/upload.svg"}
              alt="black and white back face of a digital camera"
              width={1000} // width of the image file
              height={1000} // height of the image file
              // className={styles.image}
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
                <video className={styles.video} ref={videoRef}></video>
              )}

              <div className={styles.capture}>
                <canvas ref={photoRef}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          {!hasPhoto && <button onClick={takePhoto}> capture </button>}
          {!hasPhoto && altUpload && (
            <input
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
          {hasPhoto && (
            <>
              <button onClick={uploadPhoto}> accept </button>
              <button onClick={reset}> reset </button>
              <button onClick={redo}> redo </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Index;
