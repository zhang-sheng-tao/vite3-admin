<template>
  <el-aside width="auto">
    <el-scrollbar height="100%" :style="{ background: menuBg }">
      <Logo v-show="isLayout" />
      <el-menu class="el-menu-vertical-demo" :default-active="route.path" :background-color="menuBg" :collapse="isCollapse" :default-openeds="[route.path]" :unique-opened="true" text-color="#fff">
        <menu-item v-for="(item, index) in MENULIST" :key="index" :item="item" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import MenuItem from "./MenuItem.vue";
import Logo from "@/layout/Logo/index.vue";
import PINIA_USERINFO from "@/store/user";
import PINIA_LAYOUT from "@/store/layout";
const { isCollapse, menuBg, menuWidth, isLayout } = toRefs(PINIA_LAYOUT());
const { MENULIST } = PINIA_USERINFO();
const route = useRoute();
</script>
<style lang="scss" scoped>
::v-deep(.el-scrollbar__thumb) {
  opacity: 0.5;
}
::v-deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: v-bind(menuWidth);
  border: none;
}
</style>
