// import "@/assets/debug.js";
import { createApp, h } from "vue";
import { RouterView } from "vue-router";
import store from "./store";
import rotuer from "./router";
import directive from "./directive";

import "element-plus/dist/index.css"; // 引入element-plus样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //引入icons图标
// 引入自己的样式
import "@/styles/index.scss";
// 引入权限
import "./permission";
import * as echarts from "echarts";
import "echarts-gl";
console.log(import.meta.env);
const app = createApp({ render: () => h(RouterView) });
app.config.globalProperties.$echarts = echarts;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

window.addEventListener(
  "Testevent",
  function (event) {
    console.log(event, "======");
  },
  false
);

app.use(store);
app.use(rotuer);
app.use(directive);
app.mount("#app");
