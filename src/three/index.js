import { WebGLRenderer, Scene, PerspectiveCamera, MOUSE, Vector2, Raycaster } from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

export class TEngine {
  dom;
  renderer;
  scene;
  camera;
  W;
  H;
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
    camera.position.set(0, 50, 100);
    camera.lookAt(0, 0, 0);
    const raycaster = new Raycaster(); // 射线
    const transformcontrols = new TransformControls(camera, renderer.domElement); //变换控制器

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

    const move = new Vector2();
    renderer.domElement.addEventListener("mousemove", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      move.x = (x - W / 2) / (W / 2);
      move.y = (H / 2 - y) / (H / 2);
    });
    renderer.domElement.addEventListener("click", (e) => {
      if (isShow) {
        isShow = false;
        return false;
      }
      raycaster.setFromCamera(move, camera);
      scene.remove(transformcontrols);
      const intersects = raycaster.intersectObjects(scene.children);
      scene.add(transformcontrols);
      if (intersects.length) {
        const object = intersects[0].object;
        transformcontrols.attach(object);
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
    this.W = W;
    this.H = H;
  }
  addObject(arr) {
    arr.forEach((element) => {
      this.scene.add(element);
    });
  }
}
