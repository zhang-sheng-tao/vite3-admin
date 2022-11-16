export class TCanvasEditor {
  canvas;
  constructor(width = 512, height = 512, bgColor = "rgb(255, 255, 255)") {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = bgColor;
  }
  draw(fun) {
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      fun(ctx);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  preview() {
    const canvas = this.canvas;
    canvas.style.position = "fixed";
    canvas.style.top = "5%";
    canvas.style.left = "5%";
    document.body.appendChild(this.canvas);
    return this;
  }
}
