<template>
  <div class="login">
    <div class="form">
      <el-form ref="formData" :model="userinfo" :rules="rules">
        <el-form-item>
          <div class="title">后台管理系统</div>
        </el-form-item>
        <el-form-item prop="name">
          <el-input prefix-icon="UserFilled" placeholder="请输入账号" v-model.trim="userinfo.name" style="height: 50px; font-size: 18px" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password prefix-icon="Lock" placeholder="请输入密码" v-model.trim="userinfo.password" style="height: 50px; font-size: 18px" type="password" @keyup.enter="onSubmit" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" style="height: 50px; font-size: 18px; width: 100%" @click="onSubmit">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import PINIA_USERINFO from "@/store/user";
const { login } = PINIA_USERINFO();
const router = useRouter();
const route = useRoute();

const userinfo = reactive({
  name: "",
  password: "",
});
function validator(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    callback(new Error("请输入不包含汉字的密码"));
  } else {
    callback();
  }
}
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请填写账号" }],
  password: [{ validator, trigger: "blur", required: true }],
});
const loading = ref(false);
const formData = ref(null);
function onSubmit() {
  if (!formData.value) return;
  loading.value = true;
  formData.value.validate((valid) => {
    if (valid) {
      login(userinfo)
        .then((res) => {
          loading.value = false;
          router.replace({
            path: route.query.redirect || "/",
          });
        })
        .catch((err) => {
          loading.value = false;
        });
    } else {
      loading.value = false;
      return false;
    }
  });
}

const windth = ref("30%");
window.onresize = function () {
  if (innerWidth <= 768) {
    windth.value = "80%";
  } else if (innerWidth <= 992) {
    windth.value = "60%";
  } else if (innerWidth <= 1200) {
    windth.value = "40%";
  } else {
    windth.value = "30%";
  }
};

onMounted(() => {
  if (innerWidth <= 768) {
    windth.value = "80%";
  } else if (innerWidth <= 992) {
    windth.value = "60%";
  } else if (innerWidth <= 1200) {
    windth.value = "40%";
  } else {
    windth.value = "30%";
  }
});
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(89deg, #b74f4f, #1b54ef);
  .form {
    width: v-bind(windth);
    margin: 0 auto;
    background: #ffa400;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    top: 25vh;
  }

  .title {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    margin: 0 auto;
  }
}
</style>
