import { EventDispatcher, Raycaster, Vector2 } from "three";

export class TEventManger extends EventDispatcher {
  static raycaster;
  static move;
  static camera;
  static scene;
  static dom;
  constructor(option) {
    super();
    const { camera, scene, dom, H, W } = option;
    const raycaster = new Raycaster();
    const move = new Vector2();
    let newObject = null;

    // 鼠标按下
    dom.addEventListener("mousedown", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      this.dispatchEvent({
        type: "mousedown",
      });
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "mousedown",
        });
      }
    });
    // 鼠标移动
    dom.addEventListener("mousemove", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      move.x = (x - W / 2) / (W / 2);
      move.y = (H / 2 - y) / (H / 2);
      // 选取物体
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);

      this.dispatchEvent({
        type: "mousemove",
        intersects,
      });
      if (intersects.length) {
        const object = intersects[0].object;
        if (newObject != object) {
          if (newObject) {
            newObject.dispatchEvent({
              type: "mouseleave",
            });
          }
          object.dispatchEvent({
            type: "mouseenter",
          });
        } else if (newObject == object) {
          object.dispatchEvent({
            type: "mousemove",
          });
        }
        newObject = object;
      } else {
        if (newObject) {
          newObject.dispatchEvent({
            type: "mouseleave",
          });
        }
        newObject = null;
      }
    });
    // 鼠标抬起
    dom.addEventListener("mouseup", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      this.dispatchEvent({
        type: "mouseup",
        intersects,
      });
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "mouseup",
        });
      }
    });
    // 鼠标移入(不会触发事件的冒泡)
    dom.addEventListener("mouseenter", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      this.dispatchEvent({
        type: "mouseenter",
        intersects,
      });
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "mouseenter",
        });
      }
    });
    // 鼠标移出(不会触发事件的冒泡)
    dom.addEventListener("mouseleave", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      this.dispatchEvent({
        type: "mouseleave",
        intersects,
      });
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "mouseleave",
        });
      }
    });
    // 鼠标点击
    dom.addEventListener("click", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      this.dispatchEvent({
        type: "click",
        intersects,
      });
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "click",
        });
      }
    });
    this.raycaster = raycaster;
    this.move = move;
  }
}
