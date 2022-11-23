<template>
  <div class="three" v-observerDom="renderDom" ref="dom"></div>
</template>
<script setup>
import { dome1 } from "@/three/Dome1.js";
const dom = ref(null);
const Domes = ref("");

function renderDom(Dom) {
  Domes.value.renderDom(Dom.width, Dom.height);
}

onMounted(() => {
  const Dome = new dome1(dom.value);
  Domes.value = Dome;
});
onBeforeUnmount(() => {
  Domes.value.gui.destroy();
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
