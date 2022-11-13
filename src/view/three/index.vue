<template>
  <div ref="three" class="three"></div>
</template>
<script setup>
import { TEngine } from "@/three/index";
import box from '@/three/TEbasicObject'
import light from '@/three/Tlight'
import helper from '@/three/THelper'
import codeBox from '@/three/TCodeModelts'
// import { framePromis } from '@/three/TLoadModelts'
import { groupPromise } from '@/three/TGroup'
// import { Mesh } from "three";

const three = ref(null);

onMounted(() => {
  const TE = new TEngine(three.value);
  TE.addObject(box)
  TE.addObject(light)
  TE.addObject(helper)
  TE.addObject(codeBox)
  // framePromis().then(group => {
  //   TE.addObject([group])
  // })
  groupPromise.then(group => {
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
