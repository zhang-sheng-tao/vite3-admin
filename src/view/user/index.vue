<template>
  <div class="user">
    <div class="ul" v-scroll.y="scroll">
      <div style="width: 100%">
        <div v-for="(item, index) in list" :key="index" class="li">{{ item.a }}</div>
      </div>
    </div>
    <div>
      <p><el-button type="primary" size="default" v-file.img="file">上传文件</el-button></p>
      <p><el-button type="primary" size="default" @click="listarr">更改数组</el-button></p>
      <p><el-button type="primary" size="default" @click="dispatchEvent">触发全局自定义事件</el-button></p>
    </div>
    <div>
      <h1 @click="childs">父组件</h1>
      <div>自定义事件：{{ ChildView }}</div>
      <div>组件v-mode：{{ model1 }},{{ model2 }}</div>
      <div>插槽传参：{{ soltmsg }}</div>
      <Dire ref="Dires" v-model:model1="model1" v-model:model2="model2" @some-event="someEvent">
        <div>默认插槽</div>
        <template #content="{ child }">
          <div>子组件通过插槽传递的参数：{{ child(slots) }}</div>
        </template>
      </Dire>
    </div>
  </div>
</template>
<script setup>
import { arr } from "@/api/user";
import Dire from "./directive.vue";
const list = ref([]);
const ChildView = ref("");
const Dires = ref(null);
const model1 = ref("v-model的使用1");
const model2 = ref("v-model的使用2");
const soltmsg = ref("插槽传参");

function scroll(num) {
  console.log("到底了", num);
}

// 指令语法
const VScroll12 = {
  a: 1,
  created(el, binding, vnode, prevVnode) {
    console.log("在绑定元素的 attribute 前或事件监听器应用前调用1", el, binding, VScroll12.a);
  },
  beforeMount(el, binding, vnode, prevVnode) {
    console.log("在元素被插入到 DOM 前调用2", el, binding, VScroll12.a);
  },
  mounted(el, binding, vnode, prevVnode) {
    console.log("在绑定元素的父组件及他自己的所有子节点都挂载完成后调用3", el, binding, VScroll12.a);
  },
  beforeUpdate(el, binding, vnode, prevVnode) {
    console.log("绑定元素的父组件更新前调用4", el, binding, VScroll12.a);
  },
  updated(el, binding, vnode, prevVnode) {
    console.log("在绑定元素的父组件及他自己的所有子节点都更新后调用5", el, binding, VScroll12.a);
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log("绑定元素的父组件卸载前调用6", el, binding, VScroll12.a);
  },
  unmounted(el, binding, vnode, prevVnode) {
    console.log(" 绑定元素的父组件卸载后调用7", el, binding, VScroll12.a);
  },
};

function dispatchEvent() {
  window.dispatchEvent(new Event("Testevent"));
  console.log(import.meta.env);
}

function file(file) {
  console.log(file);
}

arr().then((res) => {
  list.value = res.data;
});
function listarr() {
  list.value = [...list.value, ...list.value];
}

function someEvent(value) {
  console.log(value); // child message
  ChildView.value = value;
}
function childs() {
  console.log(Dires.value);
  Dires.value.onexpose();
}

function slots(val) {
  console.log(val);
  return (soltmsg.value = val);
}
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  display: flex;

  .ul {
    width: 200px;
    height: 500px;
    box-sizing: border-box;
    border: 1px solid red;
    overflow: hidden;
    display: inline-block;

    .li {
      text-align: center;
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
