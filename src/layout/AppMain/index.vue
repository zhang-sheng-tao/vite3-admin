<template>
  <el-main class="elmain">
    <el-scrollbar class="scrollbar" :style="{ ...meta.style }">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="KEEPALIVE">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>
<script setup>
import PINIA_USERINFO from "@/store/user";
const route = useRoute();
const { meta } = toRefs(route);
const { addKeepAlive, KEEPALIVE } = PINIA_USERINFO();

watch(route, (val) => {
  addKeepAlive(val);
});
</script>
<style lang="scss" scoped>
.elmain {
  padding: 0;
}

.section {
  width: 100%;
  height: 100%;
}

.scrollbar {
  padding: 15px;
  box-sizing: border-box;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
