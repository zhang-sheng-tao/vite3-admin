<template>
  <div ref="three" class="three"></div>
</template>
<script setup>
import { TEngine } from "@/three/index";

const three = ref(null);

onMounted(() => {
  const TE = new TEngine(three.value);
  // console.log(TE);
});
</script>
<style lang="scss" scoped>
.three {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
