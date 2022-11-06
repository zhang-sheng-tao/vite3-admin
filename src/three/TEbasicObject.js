import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";
import { texturImage } from "./Timage";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js";

const arr = [];

// 地面
const box = new Mesh(new BoxGeometry(500, 10, 500), new MeshStandardMaterial({ color: "rgb(0,75,75)", roughness: 0 }));
box.position.y = -5;
box.receiveShadow = true;
box.castShadow = true;

// 墙面
export const woll = new Mesh(new BoxGeometry(500, 100, 10), new MeshStandardMaterial({ color: "rgb(255,255,20)" }));
woll.position.set(0, 50, -245);
//更新世界矩阵
woll.updateMatrixWorld();

// 立方体
const wboxoll = new Mesh(new BoxGeometry(10, 10, 10), new MeshStandardMaterial({ color: "#fff", map: texturImage }));
wboxoll.position.set(10, 8, 0);
wboxoll.castShadow = true;

// 法线
const helper = new VertexNormalsHelper(wboxoll, 2, "red", 1);

// 贴图
const image = new Mesh(new BoxGeometry(30, 15, 0.1), new MeshStandardMaterial({ map: texturImage }));
image.position.set(0, 30, -238);

arr.push(box, woll, wboxoll, image, helper);
export default arr;
