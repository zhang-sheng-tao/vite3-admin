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

    dom.addEventListener("mousedown", (event) => {
      raycaster.setFromCamera(move, camera);
      // 选中的物体
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length) {
        const object = intersects[0].object;
        object.dispatchEvent({
          type: "mousedown",
        });
      }
    });

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
              type: "mouselevae",
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
            type: "mouselevae",
          });
        }
        newObject = null;
      }
    });

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
