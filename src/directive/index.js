import { file } from "./file";

// 批量注册自定义指令
export default function (app) {
  app.directive("file", file);
}
