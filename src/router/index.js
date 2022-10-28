import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import layout from "@/layout/index.vue";
/*
alwaysShow: true  // 不显示本级目录只显示子级目录
hidden : true // 不显示在目录列表
*/

export const routes = [
  {
    path: "/404",
    name: "404",
    meta: { title: "页面找不到了" },
    hidden: true,
    component: () => import("@/view/user/404.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/view/user/login.vue"),
    hidden: true,
  },
  {
    path: "/",
    meta: { title: "", icon: "HomeFilled" },
    component: layout,
    redirect: "/home",
    alwaysShow: true,
    children: [
      {
        path: "home",
        name: "home",
        meta: { title: "首页", icon: "HomeFilled" },
        component: () => import("@/view/home/index.vue"),
      },
      {
        path: "emoij",
        name: "emoij",
        meta: { title: "图标", icon: "Avatar" },
        component: () => import("@/view/emoij/index.vue"),
      },
      {
        path: "https://www.baidu.com",
        name: "baidu",
        // hidden: true,
        meta: { title: "百度", icon: "Ship" },
      },
    ],
  },
  {
    path: "/link",
    name: "link",
    component: layout,
    // alwaysShow: true,
    meta: { title: "外部链接", icon: "Link" },
    children: [
      {
        path: "https://www.baidu.com",
        meta: { title: "百度", icon: "Link" },
        hidden: true,
      },
      {
        path: "https://www.baidu.com",
        meta: { title: "百度", icon: "Link" },
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
});

export default router;
