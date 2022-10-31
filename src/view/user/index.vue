<template>
  <div class="user">
    <div class="ul" v-scroll.x="scroll">
      <div style="height: 100%; display: flex">
        <div v-for="(item, index) in 30" :key="index" class="li">{{ item }}</div>
      </div>
    </div>
    <div class="ul" v-scroll.x="scroll">
      <div style="height: 100%; display: flex">
        <div v-for="(item, index) in 30" :key="index" class="li">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
function scroll() {
  console.log("到底了");
}
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  .ul {
    width: 500px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid red;
    overflow: hidden;
    .li {
      text-align: center;
      height: 100%;
      width: 50px;
      line-height: 100%;
      flex-shrink: 0;
    }
  }
}
</style>
