import { WebGLRenderer, Scene, PerspectiveCamera, Mesh } from "three";

export class TEngine {
  dom;
  renderer;
  scene;
  camera;
  constructor(dom) {
    const H = dom.clientHeight;
    const W = dom.clientWidth;
    this.dom = dom;
    const renderer = new WebGLRenderer();
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // const mesh = new Mesh({

    // })

    dom.appendChild(renderer.domElement);
    renderer.setSize(W, H);
    renderer.render(scene, camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
  }
}
