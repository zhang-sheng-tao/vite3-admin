<template>
  <el-sub-menu :index="item.path" v-if="item.children && item.children.length >= 1">
    <template #title>
      <el-icon v-if="item.meta && item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <menu-item v-for="rout in item.children" :key="rout.path" :item="rout" />
  </el-sub-menu>

  <app-link :to="item.path" v-else>
    <el-menu-item :index="item.path">
      <el-icon v-if="item.meta && item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </app-link>
</template>

<script setup>
import AppLink from "../AppLink/index.vue";
const props = defineProps(["item", "path"]);
const { item, path } = toRefs(props);

function resolvePath(pathUrl, num) {
  if (pathUrl.includes("http") && pathUrl.includes("://")) return pathUrl;
  pathUrl = pathUrl.startsWith("/") ? pathUrl : "/" + pathUrl;
  if (!pathUrl.includes("http") && num == 1) {
    return path.value + pathUrl;
  }
  pathUrl = pathUrl.replaceAll("//", "/");
  return pathUrl;
}
</script>

<style lang="scss" scoped>
::v-deep(.el-menu-item:hover),
::v-deep(.el-sub-menu__title:hover) {
  background-color: #ebeef166;
}
</style>
