const layout = import("@/layout/index.vue");
import { RouterReplaceComp } from "@/utils/method";
import { RouterView } from "vue-router";
/*
hidden : true // 不显示在目录列表
*/
export default [
  {
    path: "/about",
    name: "about",
    meta: { title: "测试功能页面", icon: "Aim" },
    component: () => layout,
    redirect: "/about/index",
    // alwaysShow: true,
    children: [
      {
        path: "index",
        name: "index",
        meta: { title: "分级目录", icon: "WalletFilled" },
        // component: RouterReplaceComp(() => import("@/view/about/index.vue")),
        component: () => import("@/view/about/index.vue"),
      },
      {
        path: "list",
        name: "list",
        meta: { title: "分级目录详情", icon: "Wallet" },
        component: () => import("@/view/about/list/index.vue"),
        // hidden: true,
      },
      {
        path: "dashboards",
        name: "dashboards",
        meta: { title: "分级目录得首页", icon: "WalletFilled" },
        component: () => import("@/view/dashboard/index.vue"),
      },
    ],
  },
];
