import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
import PINIA_USERINFO from "@/store/user";

// 路由白名单
const whiteList = ["/login", "/404"];

router.beforeEach(async (to, from, next) => {
  const { THOKEN, USERINFO, info, logout, menulist } = await PINIA_USERINFO();
  NProgress.start();
  document.title = to.meta.title;
  if (THOKEN) {
    if (to.path === "/login") {
      next("/");
      NProgress.done();
    } else {
      if (USERINFO.name) {
        next();
      } else {
        try {
          await info(); // 用户信息
          await menulist(); // 动态路由
          next({ ...to, redirect: true });
        } catch (err) {
          // 退出登录
          await logout();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 这里是在没有登录的情况下可以进入的页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 强制跳转带本来要去的路径query
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
