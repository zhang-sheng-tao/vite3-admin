<template>
  <div class="user">
    <div class="ul" v-scroll.y="scroll">
      <div style="width: 100%">
        <div v-for="(item, index) in 30" :key="index" class="li">{{ item }}</div>
      </div>
    </div>
    <el-button type="primary" size="default" v-file.img="file">上传文件</el-button>
  </div>
</template>
<script setup>
function scroll() {
  console.log("到底了");
}
function file(file) {
  console.log(file);
}
</script>
<style lang="scss" scoped>
.user {
  width: 100%;

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
