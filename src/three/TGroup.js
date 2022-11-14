import { Group, Mesh, MeshBasicMaterial } from "three";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
import { image } from "./TEbasicObject";
import { framePromis } from "./TLoadModelts";

export const groupPromise = new Promise((reslove, reject) => {
  const group = new Group();

  const tips = new Mesh(new PlaneGeometry(10, 8), new MeshBasicMaterial({ color: "#fff" }));
  tips.position.set(0, -15, 0);

  // 一直看向相机
  //   tips.onBeforeRender = (renderer, scene, cameera) => {
  //     tips.lookAt(cameera.position);
  //   };

  group.add(tips);

  framePromis()
    .then((frame) => {
      group.add(image);
      group.add(frame);
      group.position.set(0, 50, -38);
      group.scale.set(2, 2, 2);
      reslove(group);
    })
    .catch((err) => {
      reject(err);
    });
});
