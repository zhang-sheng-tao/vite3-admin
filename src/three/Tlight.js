import { AmbientLight, PointLight, SpotLight } from "three";
import { woll } from "./TEbasicObject";
const arr = [];

const ambientlight = new AmbientLight("rgb(255,255,255)", 0.3);

// 点
export const point = new PointLight("#fff", 0.7, 100, 0.7);
point.position.set(20, 20, 20);

// 聚光灯
export const spot = new SpotLight("#fff", 0.7, 500, (Math.PI / 180) * 45, 0, 0);
// spot.position.set(-50, 30, -50);
spot.position.set(0, 30, 200);
spot.castShadow = true;
spot.target = woll;

arr.push(ambientlight, point, spot);

export default arr;
