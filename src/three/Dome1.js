import { Mesh, SpotLight } from "three";
import { Scene, PerspectiveCamera, AxesHelper, WebGLRenderer, Color, PlaneGeometry, MeshBasicMaterial, SphereGeometry, BoxGeometry, MeshLambertMaterial } from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export class dome1 {
  AnimationId;
  camera;
  renderer;
  constructor(dom) {
    const H = dom.clientHeight;
    const W = dom.clientWidth;
    const that = this;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(10, 50, 90);
    camera.lookAt(scene.position);
    scene.add(camera);

    const renderer = new WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setClearColor(new Color("#0e0934", 0.3));
    renderer.setSize(W, H);
    const orbit = new OrbitControls(camera, renderer.domElement);
    const axes = new AxesHelper(150);
    scene.add(axes);

    // 创建一个平面
    const plane = new Mesh(new PlaneGeometry(100, 70), new MeshBasicMaterial({ color: 0xcccccc }));
    plane.position.set(0, 0, 0);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // 创建一个球形几何体
    const sphere = new Mesh(new SphereGeometry(4, 20, 20), new MeshBasicMaterial({ wireframe: true, color: 0x7777ff }));
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    var spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    // spotLight.castShadow = true;
    // spotLight.shadowCameraVisible = true;
    scene.add(spotLight);

    const controls = new (function () {
      this.numberOfObjects = scene.children.length;
      // 设置初始值
      this.rotationSpeed = 0.02;
      this.bouncingSpeed = 0.03;
      this.addCube = function () {
        // 将立方体添加到场景中
        scene.add(createBoxGeometryLambertMaterial());
        // 更新界面中的对象数量
        this.numberOfObjects = scene.children.length;
      };
      this.removeCube = function () {
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof Mesh && lastObject != plane && lastObject != sphere) {
          scene.remove(lastObject);
          // 更新界面中的对象数量
          this.numberOfObjects = scene.children.length;
        }
      };
    })();

    // 添加事件
    const gui = new dat.GUI();
    gui.add(controls, "rotationSpeed", 0, 0.5);
    gui.add(controls, "bouncingSpeed", 0, 0.5);
    gui.add(controls, "addCube");
    gui.add(controls, "removeCube");
    // 监听变量
    gui.add(controls, "numberOfObjects").listen();
    gui.domElement.style.marginTop = "50px";

    // 创建一个随机大小颜色的立方体
    function createBoxGeometryLambertMaterial() {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cube = new Mesh(new BoxGeometry(cubeSize, cubeSize, cubeSize), new MeshLambertMaterial({ color: Math.random() * 0xffffff }));
      // 设置该物体投射阴影
      cube.castShadow = true;
      // 设置该立方体的名称
      cube.name = "cube-" + scene.children.length;
      cube.position.set(-30 + Math.round(Math.random() * 60), Math.round(Math.random() * 5), -20 + Math.round(Math.random() * 20));
      return cube;
    }

    // 动画渲染
    var step = 0;
    function animation() {
      scene.traverse(function (e) {
        if (e instanceof Mesh && e != sphere && e != plane) {
          // 将立方体绕轴旋转
          e.rotation.x += controls.rotationSpeed;
          e.rotation.y += controls.rotationSpeed;
          e.rotation.z += controls.rotationSpeed;
        }
      });
      orbit.update();
      // 将立方体绕轴旋转
      //   cube.rotation.x += controls.rotationSpeed;
      //   cube.rotation.y += controls.rotationSpeed;
      //   cube.rotation.z += controls.rotationSpeed;
      // 将球上下弹起
      step += controls.bouncingSpeed;
      sphere.position.x = 20 + 10 * Math.cos(step);
      sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
      renderer.render(scene, camera);
      that.AnimationId = requestAnimationFrame(animation);
    }
    animation();

    dom.appendChild(renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.gui = gui;
  }
  renderDom(width, height) {
    if (width == this.W && height == this.H) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
