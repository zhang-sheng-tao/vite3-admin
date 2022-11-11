<template>
  <div class="user">
    <div class="ul" v-scroll.y="scroll">
      <div style="width: 100%">
        <div v-for="(item, index) in 30" :key="index" class="li">{{ item }}</div>
      </div>
    </div>
    <el-button type="primary" size="default" v-file.img="file">上传文件</el-button>
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
import Dire from "./directive.vue";
const ChildView = ref("");
const Dires = ref(null);
const model1 = ref("v-model的使用1");
const model2 = ref("v-model的使用2");
const soltmsg = ref("插槽传参");
function scroll() {
  console.log("到底了");
}
function file(file) {
  console.log(file);
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
