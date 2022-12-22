import { file, isScroll, observerDom } from "./method";

// 批量注册自定义指令
export default function (app, option) {
  console.log(option, "-=====");
  app.directive("file", file);
  app.directive("scroll", isScroll);
  app.directive("observerDom", observerDom);
}
