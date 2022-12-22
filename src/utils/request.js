import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import PINIA_USERINFO from "@/store/user";
import { removeStorage } from "@/utils/storage";
import { typeOf } from "./method";
const { VITE_BASE_TOKEN } = import.meta.env;

const request = axios.create({
  baseURL: "/",
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  const { removeRequestToken, addRequestToken, THOKEN } = PINIA_USERINFO();
  // config.headers['X-Requested-With'] = 'XMLHttpRequest'
  THOKEN && (config.headers.Authorization = "Bearer " + THOKEN);
  // 删除已有的请求
  removeRequestToken(config);
  addRequestToken(config);
  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    const { removeRequestToken } = PINIA_USERINFO();
    // 删除已有的请求
    removeRequestToken(response.config);
    const res = response.data;
    if ((res.code >= 200 && res.code < 300) || typeOf(res) === "Blob") {
      return Promise.resolve(res);
    } else {
      return errorHandle(res);
    }
  },
  (error) => {
    if (error) {
      return errorHandle(error);
    }
  }
);

// 请求失败后的错误统一处理
function errorHandle(res) {
  // 状态码判断
  switch (res.code) {
    case 401: // 401: 未登录状态，跳转登录页
      tip(res.msg);
      removeStorage(VITE_BASE_TOKEN);
      toLogin();
      return Promise.reject(res);
      break;
    case 403: // 403 token过期 清除token并跳转登录页
      tip(res.msg);
      removeStorage(VITE_BASE_TOKEN);
      return Promise.reject(res);
      break;
    case 404: // 404请求不存在
      tip(res.msg);
      return Promise.reject(res);
      break;
    case 500: // 服务器报错
    case 502:
      tip("服务器报错" + res.code);
      return Promise.reject(res);
      break;
    default:
      return Promise.reject(res);
  }
}

// 提示错误信息
function tip(message) {
  ElMessage({
    message,
    grouping: true,
    type: "error",
  });
}

function toLogin() {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  });
}

export default request;
