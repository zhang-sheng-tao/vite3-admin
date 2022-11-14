<template>
  <div>
    <div class="ul" v-scroll.y="scroll">
      <div style="width: 100%">
        <div class="li" v-for="(item, index) in 8" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { floatAdd } from "../../utils/method.js";

function testV(file) {
  console.log("到地里", file);
}

function scroll(num) {
  console.log(num);
}

console.log(floatAdd(0.1, 0.2));
</script>
<style lang="scss" scoped>
.ul {
  width: 200px;
  height: 500px;
  border: 1px solid red;
  overflow: hidden;
  margin: 0 auto;
  .li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    flex-shrink: 0;
    text-align: center;
  }
}
</style>
