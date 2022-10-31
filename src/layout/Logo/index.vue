<template>
  <div class="logo" :style="{ width: isCollapse && isLayout ? '60px' : menuWidth, padding: !isCollapse ? '0 20px' : '0px' }">
    <template v-if="isCollapse && isLayout">
      <div class="calendar">27<span class="font12">/10</span></div>
    </template>
    <template v-else>
      <div class="top">{{ yearMonthDay }}</div>
      <div class="bottom">{{ toLocaleTimeString }}</div>
    </template>
  </div>
</template>
<script setup>
import PINIA_LAYOUT from "@/store/layout";
import { formatting } from "@/utils/method";
const { isCollapse, menuBg, menuWidth, isLayout } = toRefs(PINIA_LAYOUT());
const bg = computed(() => {
  return !isLayout.value ? "#939394" : menuBg.value;
});
const yearMonthDay = shallowRef(new formatting().yearMonthDay("yearMonthDay"));
const toLocaleTimeString = shallowRef(new formatting().toLocaleTimeString());

const time = setInterval(() => {
  yearMonthDay.value = new formatting().yearMonthDay("yearMonthDay");
  toLocaleTimeString.value = new formatting().toLocaleTimeString();
}, 1000);

onBeforeMount(() => {
  clearInterval(time);
});
</script>
<style lang="scss" scoped>
.logo {
  height: 50px;
  background-color: v-bind(bg);
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  transition: width 0.5s;
  .top,
  .bottom {
    overflow: hidden;
    font-size: 20px;
    white-space: nowrap;
    font-weight: bold;
    text-align: center;
  }
  .calendar {
    text-align: center;
    line-height: 50px;
    font-size: 26px;
  }
  .font12 {
    font-size: 12px;
  }
}
</style>
