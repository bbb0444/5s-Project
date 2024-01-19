"use client";

import FSgltfLoader from "@/app/lib/FSgltfLoader";
import SceneInit from "../../lib/SceneInit";
import React, { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const FiveSenses = () => {
  const containerRef = useRef();
  const [hover, setHover] = useState(false);

  const boxMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
    setHover(true);
  };

  const boxMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
  };

  let width = 0;
  let height = 0;
  let left = 0;
  let top = 0;

  const setBoundingBoxDivSize = (box: THREE.Box3, sceneInit: SceneInit) => {
    //Project the 3D coordinates to 2D:
    const min = box.min.clone().project(sceneInit.camera!);
    const max = box.max.clone().project(sceneInit.camera!);
    //Calculate the size and position of the div:
    width = (Math.abs(max.x - min.x) * window.innerWidth) / 2;
    height = (Math.abs(max.y - min.y) * window.innerHeight) / 2;
    left = ((min.x + 1) * window.innerWidth) / 2;
    top = ((1 - max.y) * window.innerHeight) / 2;
  };

  const boundingBoxStyle: React.CSSProperties = {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`,
  };

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    const gltfLoader = new GLTFLoader();

    // layout1(gltfLoader, test);

    // const handObject = new FSgltfLoader(
    //   "/models/right-hand.glb",
    //   gltfLoader,
    //   test,
    //   8,
    //   new THREE.Vector3(8, 18, 0)
    // );
    // const earObject = new FSgltfLoader(
    //   "/models/ear.glb",
    //   gltfLoader,
    //   test,
    //   1.25,
    //   new THREE.Vector3(-19, 7, 0)
    // );
    // const mouthObject = new FSgltfLoader(
    //   "/models/mouth.glb",
    //   gltfLoader,
    //   test,
    //   200
    // );

    // const noseObject = new FSgltfLoader(
    //   "/models/nose.glb",
    //   gltfLoader,
    //   test,
    //   150,
    //   new THREE.Vector3(0, 12, 0)
    // );

    const eyeObject = new FSgltfLoader(
      "/models/eye.glb",
      gltfLoader,
      test,
      150,
      new THREE.Vector3(-9, 14, 0)
    );

    // let eyeBone: THREE.Object3D | undefined;

    // eyeObject.loadModel().then((gltfModel) => {
    //   console.log(gltfModel);
    //   gltfModel.traverse(function (node) {
    //     if ((node as THREE.SkinnedMesh).isSkinnedMesh) {
    //       var skeleton = (node as THREE.SkinnedMesh).skeleton;
    //       var bones = skeleton.bones;
    //       // Now you can work with the bones
    //       for (var i = 0; i < bones.length; i++) {
    //         var bone = bones[i];
    //         if (bone.name == "DEF-eyeR") {
    //           eyeBone = bone;
    //           break;
    //         }
    //         //console.log(bone);
    //       }
    //     }
    //   });

    //   console.log(eyeBone);

    //   window.addEventListener(
    //     "mousemove",
    //     (event) => {
    //       // Calculate the new rotation of the eye bone based on the cursor position
    //       const x = (event.clientX / window.innerWidth) * 2 - 1;
    //       const y = -(event.clientY / window.innerHeight) * 2 + 1;

    //       // Update the rotation of the eye bone
    //       eyeBone!.rotation.x = y;
    //       eyeBone!.rotation.y = x;
    //     },
    //     false
    //   );
    // });
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
      <div
        style={boundingBoxStyle}
        onMouseOver={boxMouseOverHandler}
        onMouseOut={boxMouseOutHandler}
        id="objectArea"
      ></div>
    </div>
  );
};

function layout1(gltfLoader: GLTFLoader, test: SceneInit) {
  const handObject = new FSgltfLoader(
    "/models/right-hand.glb",
    gltfLoader,
    test,
    8,
    new THREE.Vector3(-35, -4, 0)
  );
  const earObject = new FSgltfLoader(
    "/models/ear.glb",
    gltfLoader,
    test,
    1.25,
    new THREE.Vector3(-20, -2, 0)
  );
  const eyeObject = new FSgltfLoader(
    "/models/eye.glb",
    gltfLoader,
    test,
    150,
    new THREE.Vector3(20, -1, 0)
  );

  const mouthObject = new FSgltfLoader(
    "/models/mouth.glb",
    gltfLoader,
    test,
    200
  );

  const noseObject = new FSgltfLoader(
    "/models/nose.glb",
    gltfLoader,
    test,
    150,
    new THREE.Vector3(35, -4, 0)
  );
}

export default FiveSenses;
