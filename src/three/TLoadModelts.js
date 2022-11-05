import { Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { frame1, frame2, frame3 } from "./Timage";

const loader = new OBJLoader();

export const framePromis = loader.loadAsync("/frame.obj");

export const frameMaterial = new MeshStandardMaterial({
	map: frame1,
	roughnessMap: frame2,
	bumpMap: frame3,
});
