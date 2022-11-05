import { Mesh, BufferGeometry, MeshStandardMaterial, BufferAttribute } from "three";
import { texturImage } from "./Timage";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js";
const arr = [];

let size = 5;

const geo = new Float32Array([
	-size,
	size,
	size,
	size,
	size,
	size,
	size,
	size,
	-size,
	-size,
	size,
	-size,

	-size,
	-size,
	size,
	size,
	-size,
	size,
	size,
	-size,
	-size,
	-size,
	-size,
	-size,
]);

const index = [
	0, 1, 2, 2, 3, 0,

	0, 4, 5, 5, 1, 0,

	5, 6, 1, 6, 2, 1,

	6, 7, 2, 7, 3, 2,

	7, 4, 3, 4, 0, 3,

	4, 7, 5, 5, 7, 6,
];

const uv = new Float32Array([
	0, 0, 1, 0, 1, 1, 0, 1,

	0, 0, 1, 0, 1, 1, 0, 1,
]);

const geometry = new BufferGeometry();
geometry.setAttribute("position", new BufferAttribute(geo, 3));
geometry.setAttribute("normal", new BufferAttribute(geo, 3));
geometry.setAttribute("uv", new BufferAttribute(uv, 2));
geometry.setIndex(index);

const marte = new MeshStandardMaterial({ color: "#fff", map: texturImage });

const codeBox = new Mesh(geometry, marte);
codeBox.position.set(-10, 8, 0);
codeBox.rotateX((Math.PI / 180) * 90);
codeBox.castShadow = true;
const helper = new VertexNormalsHelper(codeBox, 2, "red", 1);

arr.push(codeBox, helper);
export default arr;
