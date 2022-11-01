<template>
  <el-main class="elmain">
    <el-scrollbar class="scrollbar" :style="{ padding: meta.padding }">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="['layout', 'about']">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>
<script setup>
const route = useRoute();
const { meta } = toRefs(route);
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
