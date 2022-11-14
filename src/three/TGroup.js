import { Group, Mesh, MeshBasicMaterial, Sprite, SpriteMaterial } from "three";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
import { image } from "./TEbasicObject";
import { framePromis } from "./TLoadModelts";

export const groupPromise = new Promise((reslove, reject) => {
	const group = new Group();

	const tips = new Mesh(new PlaneGeometry(10, 8), new MeshBasicMaterial({ color: "#fff" }));
	tips.position.set(0, -15, 0);
	// 一直看向相机cpu运算
	//   tips.onBeforeRender = (renderer, scene, cameera) => {
	//     tips.lookAt(cameera.position);
	//   };

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
			group.add(tips);
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
