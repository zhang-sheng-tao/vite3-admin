import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";

const arr = [];

const mesh = new Mesh(new BoxGeometry(10, 10, 10), new MeshBasicMaterial({ color: 0x00ff00 }));

arr.push(mesh);

export default arr;
