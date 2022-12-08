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
        meta: { title: "首页", keepAlive: true, icon: "HomeFilled" },
        component: () => import("@/view/home/index.vue"),
      },
      {
        path: "emoij",
        name: "emoij",
        meta: { title: "图标集", keepAlive: true, icon: "Avatar" },
        component: () => import("@/view/emoij/index.vue"),
      },

      {
        path: "user",
        name: "user",
        meta: { title: "指令学习", keepAlive: true, icon: "Wallet" },
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
    path: "/three",
    meta: { title: "three3D可视化", icon: "Notebook" },
    component: layout,
    redirect: "/three/index",
    children: [
      {
        path: "index",
        name: "three",
        meta: { title: "课程", icon: "Wallet", padding: "0px" },
        component: () => import("@/view/three/index.vue"),
      },
      {
        path: "dome1",
        name: "dome1",
        meta: { title: "随机几何体阴影材质", icon: "Wallet", padding: "0px" },
        component: () => import("@/view/three/dome1.vue"),
      },
      {
        path: "dome2",
        name: "dome2",
        meta: { title: "全景层次近景", icon: "Wallet", padding: "0px" },
        component: () => import("@/view/three/dome2.vue"),
      },
    ],
  },
  {
    path: "/video",
    meta: { title: "视频直播DOME", icon: "Monitor" },
    component: layout,
    redirect: "/video/index",
    // alwaysShow: true,
    children: [
      {
        path: "index",
        name: "video",
        meta: { title: "flv直播", icon: "VideoPlay" },
        component: () => import("@/view/video/index.vue"),
      },
      {
        path: "camera",
        name: "camera",
        meta: { title: "推流", icon: "VideoPlay" },
        component: () => import("@/view/video/camera.vue"),
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
