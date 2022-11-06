import { AxesHelper, GridHelper, PointLightHelper, SpotLightHelper } from "three";
import { point, spot } from "./Tlight";
const arr = [];

const axeshelper = new AxesHelper(150);

const gridhelper = new GridHelper(500, 20, "rgb(200,200,200)", "rgb(100,100,100)");

const pointl = new PointLightHelper(point, point.distance, point.color);

const SpotLigh = new SpotLightHelper(spot, spot.color);

arr.push(axeshelper, gridhelper, pointl, SpotLigh);
export default arr;
