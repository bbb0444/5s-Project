import { GLTFLoader } from "three/examples/jsm/Addons.js";
import SceneInit from "./SceneInit";
import * as THREE from "three";

export default class FSgltfLoader {
  animationMixer: THREE.AnimationMixer | undefined;
  animations: THREE.AnimationAction[] = [];
  sceneInitInstance: SceneInit | undefined;

  idleAnimation: THREE.AnimationAction | undefined;
  onHoverAnimation: THREE.AnimationAction | undefined;

  constructor(
    GLTFPath: string,
    GLTFLoaderInstance: GLTFLoader,
    sceneInitInstance: SceneInit,
    scale: number
  ) {
    GLTFLoaderInstance.load(GLTFPath, (gltfScene) => {
      gltfScene.scene.scale.set(scale, scale, scale);
      sceneInitInstance.scene!.add(gltfScene.scene);
      this.animationMixer = new THREE.AnimationMixer(sceneInitInstance.scene!);

      this.animations = gltfScene.animations.map((animation) => {
        const action = this.animationMixer!.clipAction(animation);

        if (animation.name.includes("idle")) {
          this.idleAnimation = action;
        } else if (animation.name.includes("onHover")) {
          this.onHoverAnimation = action;
        }

        return action;
      });
    });
  }

  start = () => {
    this.idleAnimation!.play();
  };

  onHover = () => {
    this!.idleAnimation!.crossFadeTo(this!.onHoverAnimation!, 0.5, true);
    this!.onHoverAnimation!.play();
  };

  animate = () => {
    // Update the animation mixer on each frame
    this.animationMixer!.update(this.sceneInitInstance!.clock!.getDelta());
    //gltfScene.scene.rotation.y += 0.01;
    requestAnimationFrame(this.animate);
    // console.log(hover);
  };
}
