<template>
  <div>
    <h3>子组件</h3>
    <el-button type="primary" size="default" @click="onClick">修改v-model</el-button>

    <div>model1：{{ props.model1 }}</div>
    <div>model2：{{ props.model2 }}</div>
    <div>作用域插槽的使用：<slot name="content" :child="fnSolts" /></div>
  </div>
</template>
<script setup>
const props = defineProps(["model1", "model2"]);
const emit = defineEmits(["someEvent", "update:model1", "update:model2"]);
const child = "子组件向父组件传递的插槽参数";

function onClick() {
  emit("someEvent", "子组件的参数");
  emit("update:model1", "子组件修改父组件的v-mode1参数1");
  emit("update:model2", "子组件修改父组件的v-mode2参数2");
}

function onexpose() {
  console.log(1231231);
  emit("someEvent", "子组件的暴露的方法传参");
}

function fnSolts(fn) {
  return fn(child);
}

// 属性或方法必须暴露出去，父组件才能使用
defineExpose({ onexpose });
</script>
<style lang="scss" scoped></style>
