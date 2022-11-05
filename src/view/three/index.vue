<template>
  <div ref="three" class="three"></div>
</template>
<script setup>
import { TEngine } from "@/three/index";
import box from '@/three/TEbasicObject'
import light from '@/three/Tlight'
import helper from '@/three/THelper'
import codeBox from '@/three/TCodeModelts'
import { framePromis, frameMaterial } from '@/three/TLoadModelts'
// import { Mesh } from "three";

const three = ref(null);

onMounted(() => {
  const TE = new TEngine(three.value);
  TE.addObject(box)
  TE.addObject(light)
  TE.addObject(helper)
  TE.addObject(codeBox)
  framePromis.then(group => {
    const frame = group.children[0]
    frame.material.dispose()
    frame.material = frameMaterial

    group.position.set(0, 30, 0);
    group.rotateY(-(Math.PI / 180) * 90);

    TE.addObject([group])
  })
});
</script>
<style lang="scss" scoped>
.three {
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
}
</style>
