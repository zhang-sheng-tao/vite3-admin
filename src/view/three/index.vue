<template>
  <div ref="three" class="three"></div>
</template>
<script setup>
import { TEngine } from "@/three/index";
import box from '@/three/TEbasicObject'
const three = ref(null);

onMounted(() => {
  const TE = new TEngine(three.value);
  TE.addObject(box)
});
</script>
<style lang="scss" scoped>
.three {
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
}
</style>
