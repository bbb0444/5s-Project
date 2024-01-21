"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./upload.module.scss";
import Image from "next/image";

function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

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
      console.error("Your browser does not support camera capture");
    }
  };

  useEffect(() => {
    getCapture();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <Image
          src={"/SVG/upload.svg"}
          alt="black and white back face of a digital camera"
          width={1000} // width of the image file
          height={1000} // height of the image file
          className={styles.image}
        />
        <div className={styles.captureContainer}>
          <video className={styles.capture} ref={videoRef}></video>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        capture={true}
        onChange={(event) => {
          if (event.target.files) {
            const file = event.target.files[0];
            // handle the file
          }
        }}
      />
    </div>
  );
}
export default Index;
