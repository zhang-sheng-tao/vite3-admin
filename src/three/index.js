import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, AxesHelper, GridHelper, MOUSE } from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    renderer.setSize(W, H);
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 100, 250);
    camera.lookAt(0, 0, 0);

    const light = new AmbientLight("#fff");
    const axeshelper = new AxesHelper(150);
    const gridhelper = new GridHelper(500, 20, "rgb(200,200,200)", "rgb(100,100,100)");

    scene.add(light);
    scene.add(axeshelper);
    scene.add(gridhelper);

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
