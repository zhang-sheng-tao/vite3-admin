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

const app = createApp({ render: () => h(RouterView) });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store);
app.use(rotuer);
app.use(directive);
app.mount("#app");
