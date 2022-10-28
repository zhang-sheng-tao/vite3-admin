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
          <el-button type="primary" style="height: 50px; font-size: 18px; width: 100%" @click="onSubmit">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup name="logins">
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
  if (!formData) return;
  formData.value.validate((valid) => {
    if (valid) {
      login(userinfo).then((res) => {
        router.replace({
          path: route.query.redirect || "/",
        });
      });
    } else {
      return false;
    }
  });
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(89deg, #b74f4f, #1b54ef);
  .form {
    width: 30%;
    margin: 0 auto;
    background: #ffa400;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    top: 20%;
  }
  .title {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    margin: 0 auto;
  }
}
</style>
