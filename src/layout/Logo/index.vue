<template>
  <div class="logo" :style="{ width: isCollapse && isLayout ? '60px' : menuWidth, padding: !isCollapse ? '0 20px' : '0px' }">
    <template v-if="isCollapse && isLayout">
      <div class="calendar">
        {{ month }}<span class="font12">/{{ day }}</span>
      </div>
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
const formattings = new formatting();
const yearMonthDay = ref(shallowRef(formattings.yearMonthDay("yearMonthDay")));
const toLocaleTimeString = ref(shallowRef(formattings.toLocaleTimeString()));
const month = ref(formattings.month());
const day = ref(formattings.day());

let timer;
function time12() {
  timer = setInterval(() => {
    yearMonthDay.value = formattings.yearMonthDay("yearMonthDay");
    toLocaleTimeString.value = formattings.toLocaleTimeString();
    month.value = formattings.month();
    day.value = formattings.day();
  }, 1000);
}

onMounted(() => {
  time12();
});
onBeforeMount(() => {
  clearInterval(timer);
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
