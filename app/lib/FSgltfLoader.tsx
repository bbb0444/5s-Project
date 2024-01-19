import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import SceneInit from "./SceneInit";
import * as THREE from "three";
import { spawn } from "child_process";

export default class FSgltfLoader {
  animationMixer: THREE.AnimationMixer | undefined;
  animations: THREE.AnimationAction[] = [];
  gltfModel: THREE.Group | undefined;
  sceneInitInstance: SceneInit | undefined;
  idleAnimation: THREE.AnimationAction | undefined;
  onHoverAnimation: THREE.AnimationAction | undefined;

  GLTFPath: string;
  GLTFLoaderInstance: GLTFLoader;
  scale: number;
  position: THREE.Vector3;

  constructor(
    GLTFPath: string,
    GLTFLoaderInstance: GLTFLoader,
    sceneInitInstance: SceneInit,
    scale: number,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    this.sceneInitInstance = sceneInitInstance;
    this.GLTFPath = GLTFPath;
    this.GLTFLoaderInstance = GLTFLoaderInstance;
    this.scale = scale;
    this.position = position;
  }

  loadModel(): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.GLTFLoaderInstance.load(
        this.GLTFPath,
        (gltfScene) => {
          gltfScene.scene.scale.set(this.scale, this.scale, this.scale);
          gltfScene.scene.position.set(
            this.position.x,
            this.position.y,
            this.position.z
          );
          this.sceneInitInstance!.scene!.add(gltfScene.scene);
          this.animationMixer = new THREE.AnimationMixer(gltfScene.scene);
          this.gltfModel = gltfScene.scene;
          this.animations = gltfScene.animations.map((animation) => {
            const action = this.animationMixer!.clipAction(animation);

            if (animation.name.includes("idle")) {
              console.log("idle animation found");
              this.idleAnimation = action;
              this.idleAnimation.play();
            } else if (animation.name.includes("on")) {
              console.log("on-hover animation found");
              this.onHoverAnimation = action;
            }
            return action;
          });

          const animate = () => {
            // Update the animation mixer on each frame
            this.animationMixer!.update(
              this.sceneInitInstance!.clock!.getDelta()
            );
            // Schedule the next frame
            requestAnimationFrame(animate);
          };

          animate();
          resolve(this.gltfModel);
        },
        undefined,
        reject
      );
    });
  }

  onHover = () => {
    if (this.idleAnimation && this.onHoverAnimation) {
      this.idleAnimation.crossFadeTo(this.onHoverAnimation, 0.5, true);
      this.onHoverAnimation.play();
    } else {
      console.warn("Animations not ready yet");
    }
  };
}
