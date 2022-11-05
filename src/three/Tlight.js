import { AmbientLight, PointLight, SpotLight } from "three";

const arr = [];

const ambientlight = new AmbientLight("rgb(255,255,255)", 0.3);

// 点
export const point = new PointLight("red", 0.7, 100, 0.7);
point.position.set(20, 20, 20);

// 聚光灯
export const spot = new SpotLight("#fff", 0.7, 500, (Math.PI / 180) * 30, 0, 0);
// spot.position.set(-50, 30, -50);
spot.position.set(0, 30, 250);
spot.castShadow = true;

arr.push(ambientlight, spot);

export default arr;
