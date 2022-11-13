import { WebGLRenderer, Scene, PerspectiveCamera, MOUSE, Group } from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { TEventManger } from "./TEventManger";

export class TEngine {
	dom;
	renderer;
	scene;
	camera;
	W;
	H;
	eventManger;
	constructor(dom) {
		const H = dom.clientHeight;
		const W = dom.clientWidth;
		this.dom = dom;
		const renderer = new WebGLRenderer({
			antialias: true,
		});
		renderer.shadowMap.enabled = true;
		renderer.setSize(W, H);
		const scene = new Scene();
		const camera = new PerspectiveCamera(45, W / H, 0.1, 1000);
		camera.position.set(0, 50, 200);
		camera.lookAt(0, 0, 0);

		// 变换控制器
		const transformcontrols = new TransformControls(camera, renderer.domElement);
		let isShow = false;
		transformcontrols.addEventListener("mouseDown", (e) => {
			isShow = true;
		});

		const stats = new Stats();
		stats.domElement.style.position = "absolute";
		stats.domElement.style.top = "0";
		stats.domElement.style.right = "5px";
		stats.domElement.style.left = "unset";

		const orbitcontrols = new OrbitControls(camera, renderer.domElement);
		orbitcontrols.mouseButtons = {
			LEFT: null,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.ROTATE,
		};

		const eventManger = new TEventManger({
			dom: renderer.domElement,
			scene,
			camera,
			H,
			W,
		});

		eventManger.addEventListener("click", (event) => {
			if (isShow) {
				isShow = false;
				return false;
			}
			const intersects = event.intersects;
			if (intersects.length) {
				const object = intersects[0].object;
				if (object.type == "TransformControlsPlane") {
					transformcontrols.detach();
					scene.remove(transformcontrols);
				} else {
					scene.add(transformcontrols);

					console.log(object.parent instanceof Group, object.parent);
					// 判斷父對象
					transformcontrols.attach(object.parent instanceof Group ? object.parent : object);
				}
			} else {
				transformcontrols.detach();
				scene.remove(transformcontrols);
			}
		});

		function animation() {
			orbitcontrols.update();
			renderer.render(scene, camera);
			stats.update();
			requestAnimationFrame(animation);
		}
		animation();

		dom.appendChild(renderer.domElement);
		dom.appendChild(stats.domElement);
		this.renderer = renderer;
		this.scene = scene;
		this.camera = camera;
		this.eventManger = eventManger;
		this.W = W;
		this.H = H;
	}
	addObject(arr) {
		arr.forEach((element) => {
			this.scene.add(element);
		});
	}
}
