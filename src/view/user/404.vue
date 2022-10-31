<template>
  <div>
    <div class="ul" v-tscroll.x="">
      <div style="height: 100%;display: flex;">
        <div class="li" v-for="(item, index) in 30" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
function file(file) {
  console.log(file);
}
</script>
<style lang="scss" scoped>
.ul {
  width: 500px;
  height: 200px;
  border: 1px solid red;
  overflow: hidden;
  margin: 0 auto;



  .li {
    height: 100%;
    width: 50px;
    line-height: 100%;
    flex-shrink: 0;
    text-align: center;
  }
}
</style>
