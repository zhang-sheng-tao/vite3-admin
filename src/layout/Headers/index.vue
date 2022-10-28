<template>
  <el-header class="elheader flex">
    <div class="left flex" :style="{ 'padding-left': !isLayout ? '0px' : '10px' }">
      <Logo v-show="!isLayout" />
      <el-icon :style="{ 'padding-left': isLayout ? '0px' : '10px' }" @click="isCollapse = !isCollapse"><Expand /></el-icon>
      <el-breadcrumb separator="/" style="margin-left: 10px">
        <template v-for="item in breadcrumb" :key="item.path">
          <el-breadcrumb-item v-if="item.meta.title">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right flex">
      <el-autocomplete v-model.trim="searchMenu" clearable :fetch-suggestions="querySearch" placeholder="请输入页面名称" @select="handleSelect" />
      <el-tooltip content="刷新" placement="bottom">
        <el-icon class="icon" @click="router.go(0)"> <Refresh /> </el-icon>
      </el-tooltip>
      <el-dropdown style="user-select: none">
        <span class="el-dropdown-link">
          <img class="active" src="~@/assets/user.gif" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="isLayout = !isLayout">修改布局样式</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import Logo from "@/layout/Logo/index.vue";
import PINIA_USERINFO from "@/store/user";
import PINIA_LAYOUT from "@/store/layout";
const { isCollapse, isLayout } = toRefs(PINIA_LAYOUT());
const { MENULIST, SEARCHMENULIST, logout } = PINIA_USERINFO();
const router = useRouter();
const route = useRoute();
const searchMenu = ref("");

const breadcrumb = computed(() => {
  return route.matched;
});

function querySearch(searchName, callback) {
  if (searchName) {
    callback(SEARCHMENULIST.filter((item) => item.value.includes(searchName)));
  } else {
    callback([]);
  }
}

function handleSelect({ path }) {
  searchMenu.value = "";
  if (path.includes("http") && path.includes("://")) {
    window.open(path);
  } else {
    router.push({ path });
  }
}

function userLogout() {
  logout().then((res) => {
    console.log(res);
  });
}
</script>

<style lang="scss" scoped>
.elheader {
  height: 50px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  justify-content: space-between;
  padding: 0;
}
.active {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.right {
  padding-right: 10px;
}
.flex {
  display: flex;
  align-items: center;
}
.icon {
  margin: 0 10px;
}
.breadcrumb {
  cursor: text;
  font-weight: 400;
  color: #606266;
  margin-left: 10px;
  cursor: pointer;
}
</style>
