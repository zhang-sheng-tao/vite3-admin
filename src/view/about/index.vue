<template>
  <div class="about">
    <div>{{ num }}</div>
    <el-button type="primary" size="default" @click="num += 1">加1</el-button>
    <el-button type="primary" size="default" @click="list">跳转</el-button>
  </div>
</template>
<script setup name="about">
const router = useRouter();
const route = useRoute();
const num = ref(0);

function list() {
  router.push("/about/index/list");
}
</script>
<style lang="scss" scoped>
.about {
}
</style>
