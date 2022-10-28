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
  //   年
  year() {
    return this.data.getFullYear();
  }
  //   月
  month() {
    return this.data.getMonth() + 1;
  }
  //   日
  day() {
    return this.data.getDate();
  }
  yearMonthDay(str) {
    if (str === "yearMonthDay") {
      return `${this.year()}年${this.month()}月${this.day()}日`;
    }
  }
  //   小时
  getHours() {
    return this.data.getHours();
  }
  //   分钟
  getMinutes() {
    return this.data.getMinutes();
  }
  //   秒
  getSeconds() {
    return this.data.getSeconds();
  }
  // 16:56:36
  toLocaleTimeString() {
    return this.data.toLocaleTimeString();
  }
  //   获取时间对象的时间戳
  getTime() {
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
