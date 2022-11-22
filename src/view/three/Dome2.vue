<template>
  <div class="three" v-observerDom="renderDom" ref="dom"></div>
</template>
<script setup>
import { dome2 } from "@/three/Dome2.js";
const dom = ref(null);
const Domes = ref("");

function renderDom(Dom) {
  Domes.value.renderDom(Dom.width, Dom.height);
}

onMounted(() => {
  const DOME = new dome2(dom.value);
  Domes.value = DOME;
});
onBeforeUnmount(() => {
  cancelAnimationFrame(Domes.value.AnimationId);
});
</script>
<style lang="scss" scoped>
.three {
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
}
</style>
