<template>
  <el-image class="elimage" :hide-on-click-modal="true" fit="cover" :z-index="9999999" :preview-src-list="[src]" :src="src" />
</template>
<script setup>
const { src } = defineProps(["src"]);
</script>
<style lang="scss" scoped>
.elimage {
  width: 50px;
  height: 50px;
}
</style>
