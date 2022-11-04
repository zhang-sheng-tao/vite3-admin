import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";

const arr = [];

// 地面
const box = new Mesh(new BoxGeometry(500, 10, 500), new MeshBasicMaterial({ color: "rgb(0,75,75)", roughness: 0 }));
box.position.y = -5;

// 墙面
const woll = new Mesh(new BoxGeometry(500, 100, 10), new MeshBasicMaterial({ color: "#79bbff" }));
woll.position.set(0, 50, -245);

arr.push(box, woll);
export default arr;
