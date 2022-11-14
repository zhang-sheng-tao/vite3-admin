import { Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { frame1, frame2, frame3 } from "./Timage";

const loader = new OBJLoader();

// export const framePromis = loader.loadAsync("/frame.obj");

export const frameMaterial = new MeshStandardMaterial({
  map: frame1,
  roughnessMap: frame2,
  bumpMap: frame3,
});

export async function framePromis() {
  return loader.loadAsync("/frame.obj").then((group) => {
    const frame = group.children[0];
    frame.material.dispose();
    frame.material = frameMaterial;
    // group.position.set(0, 30, -38);
    frame.rotateY(-(Math.PI / 180) * 90);
    // console.log(group);
    return Promise.resolve(frame);
  });
}
