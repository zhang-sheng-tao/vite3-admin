<template>
  <div class="layout">
    <el-config-provider :locale="zhCn">
      <el-container :class="{ 'is-vertical': !isLayout }">
        <!-- 不显示不被解析 -->
        <!-- <component :is="!isLayout ? 'Headers' : 'Menus'" /> -->
        <Menus v-show="isLayout" />
        <headers v-show="!isLayout" />
        <el-container :class="{ 'is-vertical': isLayout }">
          <!-- 不显示不被解析 -->
          <!-- <component :is="isLayout ? 'Headers' : 'Menus'" /> -->
          <Menus v-show="!isLayout" />
          <Headers v-show="isLayout" />
          <AppMain />
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>
<script setup name="layout">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import Menus from "./Menu/index.vue";
import Headers from "./Headers/index.vue";
import AppMain from "./AppMain/index.vue";
import PINIA_LAYOUT from "@/store/layout.js";
const { isLayout } = toRefs(PINIA_LAYOUT());
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
