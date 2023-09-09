<template>
  <el-form :model="form" label-width="120px" @submit="handleSubmit">
    <!-- 用户名输入 -->
    <el-form-item label-width="0">
      <el-input
        type="text"
        v-model="form.username"
        clearable
        :placeholder="placeHolder.username"
        :prefix-icon="User"
        maxlength="20"
        show-word-limit
      />
    </el-form-item>
    <!-- 密码输入 -->
    <el-form-item label-width="0">
      <el-input
        type="password"
        v-model="form.password"
        show-password
        :placeholder="placeHolder.password"
        :prefix-icon="Lock"
        show-word-limit
      />
    </el-form-item>
    <!-- 登录按钮 -->
    <el-form-item label-width="0">
      <el-button type="primary" native-type="submit" id="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import user from "@/api/user";
import router from "@/router";
// 请求数据加密
import getEntryptData from "@/encrypt";
import { placeHolder, alertStatus, alertText } from "@/string";
import Alert from "@/utils/alert";

// 表单信息存储
const form = reactive({
  username: "",
  password: "",
});

// 处理提交表单的回调
async function handleSubmit(event: { preventDefault: () => void }) {
  event.preventDefault();

  // 密码长度超限
  if (form.password.length > 15) {
    Alert(alertText.lengthExceed, alertStatus.error)
  } else {
    // 数据加密
    const encryptedData = getEntryptData(form.password);
    const userData = { username: form.username, password: encryptedData };
    // 发送请求
    const res = await user.login(userData);
    const data = res.data;

    // 请求正常就将用户名和id写到session里面
    window.sessionStorage.setItem("username", data.username);
    window.sessionStorage.setItem("uid", data.uid);
    window.sessionStorage.setItem("token", data.token);
    router.push("/trading");
  }
}
</script>

<style scoped>
span {
  color: red;
  font-size: 12px;
}
#login {
  margin: auto;
}
</style>
