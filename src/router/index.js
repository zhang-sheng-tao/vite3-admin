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
        meta: { title: "图标集", icon: "Avatar" },
        component: () => import("@/view/emoij/index.vue"),
      },
      {
        path: "three",
        name: "three",
        meta: { title: "3D学习", icon: "Wallet", padding: "0px" },
        component: () => import("@/view/three/index.vue"),
      },
      {
        path: "user",
        name: "user",
        meta: { title: "指令学习", icon: "Wallet" },
        component: () => import("@/view/user/index.vue"),
      },
      {
        path: "echart",
        name: "echart",
        meta: { title: "echart图表库", icon: "PriceTag" },
        component: () => import("@/view/echarts/index.vue"),
      },
    ],
  },
  {
    path: "/link",
    name: "link",
    component: layout,
    alwaysShow: true,
    meta: { title: "外部链接", icon: "Link" },
    children: [
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
