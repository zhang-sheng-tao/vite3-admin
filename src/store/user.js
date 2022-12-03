import { defineStore } from "pinia";
import axios from "axios";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";
import { login, info, logout, menulist } from "@/api/user.js";
import admins from "@/router/admin";
import router, { routes } from "@/router";
const cancelToken = axios.CancelToken;
const { VITE_BASE_TOKEN } = import.meta.env;

export default defineStore("PINIA_USERINFO", {
  state() {
    return {
      USERINFO: "", // 用户信息
      THOKEN: getStorage(VITE_BASE_TOKEN) || "", // token
      ROUTER: [], // 用户带有权限的完整路由
      MENULIST: [], // 要显示在左侧目录列表的路由
      SEARCHMENULIST: [], // 搜索目录
      PENDING: [], // 记录每一个请求得唯一标识
    };
  },
  actions: {
    async login(data) {
      const res = await login(data);
      if (200 <= res.data.code < 300) {
        setStorage(VITE_BASE_TOKEN, res.data.token);
        this.THOKEN = res.data.token;
        return res.data;
      } else {
        return Promise.reject(res.data);
      }
    },
    async info() {
      await info().then((res) => {
        this.USERINFO = res.data;
      });
    },
    async logout() {
      const res = await logout();
      if (200 <= res.code < 300) {
        this.THOKEN = "";
        this.USERINFO = "";
        this.ROUTER = [];
        this.MENULIST = [];
        this.SEARCHMENULIST = [];
        removeStorage(VITE_BASE_TOKEN);
        return res;
      } else {
        return Promise.reject(res);
      }
    },
    async menulist() {
      const res = await menulist();
      const ROUTER = concat(admins, res.data);
      ROUTER.forEach((rote) => router.addRoute(rote));
      router.addRoute({ path: "/:catchAll(.*)", redirect: "/404", hidden: true });
      const route = routes.concat(ROUTER); // routes(静态)； ROUTER(动态)
      this.ROUTER = route; // 全局的完整路由
      const MENULIST = filterMenu(route); // 显示在侧边目录路由
      this.MENULIST = MENULIST;
      const SEARCHMENULIST = filterMenuList(MENULIST); // 搜索目录的路由
      this.SEARCHMENULIST = SEARCHMENULIST;
    },
    // 添加请求标识
    addRequestToken(config) {
      let params = "";
      if (config.method === "post") {
        params = JSON.stringify(config.data);
      } else {
        params = config.params;
      }
      let url = `${config.url}&${config.method}&${params}`;
      new cancelToken((c) => {
        this.PENDING.push({ c, url });
      });
    },
    // 清除请求
    removeRequestToken(config) {
      let params = "";
      if (config.method === "post") {
        params = config.data;
      } else {
        params = config.params;
      }
      let url = `${config.url}&${config.method}&${params}`;
      for (let i = 0; i < this.PENDING.length; i++) {
        if (this.PENDING[i].url === url) {
          this.PENDING[i].c();
          this.PENDING.splice(i, 1);
          break;
        }
      }
    },
    // 清空请求
    cleatRequestToken() {
      for (let i = 0; i < this.PENDING.length; i++) {
        this.PENDING[i].c();
        this.PENDING.splice(i, 1);
      }
    },
  },
});

// 判断是否还有子路由
function isArray(arr) {
  if (!arr) return false;
  const type = Object.prototype.toString.call(arr).slice(8, -1) === "Array";
  if (type) {
    return type && arr.length >= 1;
  } else {
    return false;
  }
}
function isHttp(str) {
  return str.includes("http") && str.includes("://");
}

// 前后端过滤权限路由
function concat(admins, arrs) {
  let arr = [];
  arrs.forEach((i) => {
    admins.forEach((j) => {
      if (i.name === j.name && !i.isAuth && isArray(i.children) && isArray(j.children)) {
        j.meta = { ...j.meta, ...i.meta };
        j.children = concat(j.children, i.children);
        arr.push(j);
      } else if (i.name === j.name && !i.isAuth && !isArray(i.children) && !isArray(j.children)) {
        if (j.path.startsWith("/")) j.path.replace("/", "");
        j.meta = { ...j.meta, ...i.meta };
        arr.push(j);
      }
    });
  });
  return arr;
}
/*
alwaysShow: true  // 不显示本级目录只显示子级目录
hidden : true // 不显示在目录列表
*/
function filterMenu(routerList, path = null) {
  const arr = [];
  routerList.forEach((item) => {
    let p = null;
    if (!item.hidden) {
      if (item.alwaysShow && isArray(item.children)) {
        if (!isHttp(item.path) && path != "/") p = path ? path + "/" + item.path : item.path;
        p = p.replaceAll("//", "/");
        const rr = filterMenu(item.children, p);
        arr.push(...rr);
      } else if (!item.alwaysShow && isArray(item.children)) {
        if (!isHttp(item.path) && path != "/") p = path ? path + "/" + item.path : item.path;
        item.path = p.replaceAll("//", "/");
        const rr = filterMenu(item.children, p);
        item.children = rr;
        arr.push(item);
      } else {
        if (path && !isHttp(item.path)) item.path = `${path}/${item.path}`;
        if (!isHttp(item.path)) item.path = item.path.replaceAll("//", "/");
        arr.push(item);
      }
    }
  });
  return arr;
}

// 重组路由列表
function filterMenuList(menulist, name = null) {
  let arr = [];
  menulist.forEach((item) => {
    if (!isArray(item.children)) {
      arr.push({ path: item.path, value: name ? name + ">" + item.meta.title : item.meta.title });
    }
    if (isArray(item.children)) {
      let n = name ? name + ">" + item.meta.title : item.meta.title;
      const rr = filterMenuList(item.children, n);
      arr = arr.concat(rr);
    }
  });
  return arr;
}
