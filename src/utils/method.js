import { defineAsyncComponent, h } from "vue";
import { RouterView } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

// 过滤父组件
export function RouterReplaceComp(component) {
  return {
    comp: component,
    name: "routeReplaceSelf",
    computed: {
      // 获取当前页面组件，并将当前组件改为自己的组件
      currentPage() {
        // this.$route.matched[this.$route.matched.length - 1]获取当前匹配的子路由
        const curComp = this.$route.matched[this.$route.matched.length - 1];
        // 当前渲染页面
        const curPage = curComp.components.default.comp;
        // 若当前子组件中没有渲染内容
        return curPage === component;
      },
    },
    render() {
      // defineAsyncComponent 创建一个在需要时才会加载的异步组件
      // 若不同 则渲染 当前路由所对应的页面   若相同则渲染当前
      return this.currentPage ? h(defineAsyncComponent(component)) : h(RouterView);
    },
  };
}

// 时间
export class formatting {
  data = new Date();
  constructor(time) {
    if (time) this.data = time;
  }
  // 年
  year() {
    this.data = new Date();
    return this.data.getFullYear();
  }
  // 月
  month() {
    this.data = new Date();
    return this.data.getMonth() + 1;
  }
  // 日
  day() {
    this.data = new Date();
    return this.data.getDate();
  }
  yearMonthDay(str) {
    this.data = new Date();
    if (str === "yearMonthDay") {
      return `${this.year()}年${this.month()}月${this.day()}日`;
    }
  }
  // 小时
  getHours() {
    this.data = new Date();
    return this.data.getHours();
  }
  // 分钟
  getMinutes() {
    this.data = new Date();
    return this.data.getMinutes();
  }
  // 秒
  getSeconds() {
    this.data = new Date();
    return this.data.getSeconds();
  }
  // 16:56:36
  toLocaleTimeString() {
    this.data = new Date();
    return this.data.toLocaleTimeString();
  }
  // 获取时间对象的时间戳
  getTime() {
    this.data = new Date();
    return this.data.getTime();
  }
}

// 判断类型
export function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

// 全局提示操作
export function confirm(callback, option) {
  ElMessageBox.confirm("确定当前的操作吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true,
  })
    .then(() => {
      callback(option);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "您已取消当前操作",
      });
    });
}

// 判断是PC端还是手机端
export function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flagPc = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flagPc = false;
      break;
    }
  }
  // flagPc=true为PC端，flagPc=false为手机端
  return flagPc;
}

// 精度相加
export function floatAdd(a, b) {
  var c, d, e;
  if (undefined == a || null == a || "" == a || isNaN(a)) {
    a = 0;
  }
  if (undefined == b || null == b || "" == b || isNaN(b)) {
    b = 0;
  }
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (accMul(a, e) + accMul(b, e)) / e;
}
// 精度乘法
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
}

// 精度除法
export function accDiv(arg1, arg2) {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return accMul(r1 / r2, Math.pow(10, t2 - t1));
}

// 精度减法
export function floatSub(a, b) {
  var c, d, e;
  if (undefined == a || null == a || "" == a || isNaN(a)) {
    a = 0;
  }
  if (undefined == b || null == b || "" == b || isNaN(b)) {
    b = 0;
  }
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (accMul(a, e) - accMul(b, e)) / e;
}
