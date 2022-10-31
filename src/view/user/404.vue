<template>
  <div>
    <div class="ul" v-tscroll.y="">
      <div style="width: 100%">
        <div class="li" v-for="(item, index) in 30" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.ul {
  width: 200px;
  height: 500px;
  border: 1px solid red;
  overflow: hidden;
  .li {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
}
</style>
