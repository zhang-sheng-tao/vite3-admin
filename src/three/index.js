import { WebGLRenderer, Scene, PerspectiveCamera, MOUSE, Group, Vector3 } from "three";

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
	AnimationId;
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
		camera.position.set(0, 50, -5);
		// camera.lookAt(0, 50, -45);
		// camera.up = new Vector3(0, 50, -45)

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

		// 轨道控制器
		const orbitcontrols = new OrbitControls(camera, renderer.domElement);
		orbitcontrols.mouseButtons = {
			LEFT: null,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.ROTATE,
		};
		orbitcontrols.target = new Vector3(0, 50, -45);

		// 全局事件管理器
		const eventManger = new TEventManger({
			dom: renderer.domElement,
			scene,
			camera,
			H,
			W,
		});

		// 全局点击事件
		eventManger.addEventListener("click", (event) => {
			if (isShow) {
				isShow = false;
				return false;
			}
			if (event.intersects.length) {
				const object = event.intersects[0].object;
				if (object.type === "TransformControlsPlane") {
					transformcontrols.detach();
					scene.remove(transformcontrols);
				} else {
					scene.add(transformcontrols);
					console.log(object.parent);
					transformcontrols.attach(object.parent instanceof Group ? object.parent : object);
				}
			} else {
				transformcontrols.detach();
				scene.remove(transformcontrols);
			}
		});

		let that = this;
		function animation() {
			orbitcontrols.update();
			renderer.render(scene, camera);
			stats.update();
			that.AnimationId = requestAnimationFrame(animation);
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
	renderDom(width, height) {
		if (width == this.W && height == this.H) return;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
}
