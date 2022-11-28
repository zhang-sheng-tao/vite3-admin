import { Mesh, TextureLoader, Vector3, Raycaster, MeshStandardMaterial, LOD, SphereGeometry, RepeatWrapping, BoxGeometry, AxesHelper, CubeTextureLoader, Scene, PlaneGeometry, PerspectiveCamera, MeshPhongMaterial, WebGLRenderer, AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class dome2 {
  AnimationId;
  H;
  W;
  renderer;
  camera;
  scene;
  constructor(dom) {
    const H = dom.clientHeight;
    const W = dom.clientWidth;
    const that = this;

    const scene = new Scene();
    var urls = [
      "http://three.zuoben.top/assets/bgImage/skyBox4/posx.jpg",
      "http://three.zuoben.top/assets/bgImage/skyBox4/negx.jpg",
      "http://three.zuoben.top/assets/bgImage/skyBox4/posy.jpg",
      "http://three.zuoben.top/assets/bgImage/skyBox4/negy.jpg",
      "http://three.zuoben.top/assets/bgImage/skyBox4/posz.jpg",
      "http://three.zuoben.top/assets/bgImage/skyBox4/negz.jpg",
    ];
    var cubeLoader = new CubeTextureLoader();
    scene.background = cubeLoader.load(urls);
    const camera = new PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(60, 15, 60);
    camera.lookAt(scene.position);
    scene.add(camera);

    // 渲染场景
    const renderer = new WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(W, H);

    scene.add(new AmbientLight(0x666666));
    scene.add(new AmbientLight("#ffffff", 1));

    var orbit = new OrbitControls(camera, renderer.domElement);
    // 在屏幕上显示坐标轴
    var axes = new AxesHelper(100);
    scene.add(axes);

    // 创建一个平面
    var textureLoader = new TextureLoader();
    const Material = new MeshStandardMaterial({ map: textureLoader.load("http://three.zuoben.top/assets/textures/cd.jpg") });
    Material.map.wrapS = RepeatWrapping;
    Material.map.wrapT = RepeatWrapping;
    Material.map.repeat.set(18, 18);
    const plane = new Mesh(new PlaneGeometry(500, 500), Material);
    plane.position.set(0, 0, 0);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // const lod = new LOD();
    // 立方体
    // const cube = new Mesh(new BoxGeometry(8, 8, 8), new MeshPhongMaterial({ map: textureLoader.load("http://three.zuoben.top/assets/textures/brick-wall.jpg") }));
    // cube.position.set(-10, 3, 0);
    // lod.addLevel(cube, 200);
    // 长方体
    // const cubes = new Mesh(new BoxGeometry(14, 14, 7), new MeshPhongMaterial({ color: "blue" }));
    // cubes.position.set(-5, 10, -30);
    // lod.addLevel(cubes, 100);
    // 球形几何体
    // const sphere = new Mesh(new SphereGeometry(), new MeshStandardMaterial({ map: textureLoader.load("http://three.zuoben.top/assets/textures/brick-wall.jpg") }));
    // sphere.position.set(20, 4, 2);
    // lod.addLevel(sphere, 300);
    // scene.add(lod);

    const mesh = [];
    renderer.domElement.addEventListener(
      "click",
      (event) => {
        // 点击屏幕创建一个向量
        var vector = new Vector3((event.clientX / W) * 2 - 1, -(event.clientY / H) * 2 + 1, 0.5);
        vector = vector.unproject(camera); // 将屏幕的坐标转换成三维场景中的坐标

        var raycaster = new Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          //   intersects[0].object.material.color.set("#006100");
        }
      },
      false
    );

    function animation() {
      //   lod.update(camera);
      orbit.update();
      renderer.render(scene, camera);
      that.AnimationId = requestAnimationFrame(animation);
    }
    animation();
    dom.appendChild(renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.W = W;
    this.H = H;
  }
  renderDom(width, height) {
    if (width == this.W && height == this.H) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
