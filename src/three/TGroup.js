import { Group, Mesh, MeshBasicMaterial, Sprite, SpriteMaterial } from "three";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
import { image } from "./TEbasicObject";
import { framePromis } from "./TLoadModelts";
import jsonList from "./json/index.json";

export const groupPromise = new Promise((reslove, reject) => {
  // 一直看向相机cpu运算
  //   tips.onBeforeRender = (renderer, scene, cameera) => {
  //     tips.lookAt(cameera.position);
  //   };
  // 精灵图 gpu运算
  // const tips = new Sprite(
  // 	new SpriteMaterial({
  // 		color: "#fff",
  // 		sizeAttenuation: false,
  // 		depthTest: false,
  // 		depthWrite: false,
  // 	})
  // );
  // tips.position.set(0, -15, 0);
  // tips.scale.set(0.08, 0.045, 1);

  framePromis()
    .then((frame) => {
      const groupList = [];
      const spacing = 100;
      const distance = ((jsonList.length - 1) * spacing) / 2;
      jsonList.forEach((item, i) => {
        const group = new Group();
        const frames = frame.clone();
        const images = image.clone();
        const tips = new Mesh(new PlaneGeometry(10, 8), new MeshBasicMaterial({ color: "#fff" }));
        tips.position.set(0, -15, 0);
        group.add(tips);
        group.add(images);
        group.add(frames);
        group.position.set(i * spacing - distance, 50, -238);
        group.scale.set(2, 2, 2);
        groupList.push(group);
      });

      reslove(groupList);
    })
    .catch((err) => {
      reject(err);
    });
});
