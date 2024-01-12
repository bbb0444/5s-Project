"use client";

import SceneInit from "../../lib/SceneInit";
import React, { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Hand = () => {
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

    gltfLoader.load("/models/right-hand.glb", (gltfScene) => {
      // console.log(gltfScene);
      // gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene!.add(gltfScene.scene);

      const mixer = new THREE.AnimationMixer(gltfScene.scene);
      const animations = gltfScene.animations.map((animation) =>
        mixer.clipAction(animation)
      );
      animations[0].play();

      const animate = () => {
        // Update the animation mixer on each frame
        mixer!.update(test.clock!.getDelta());
        //gltfScene.scene.rotation.y += 0.01;
        requestAnimationFrame(animate);
        // console.log(hover);
      };

      console.log(gltfScene.animations);

      animate();
      // window.addEventListener("mousemove", onMouseMove);
    });
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

export default Hand;
