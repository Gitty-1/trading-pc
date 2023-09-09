<template>
  <el-form :model="form" label-width="120px" @submit="handleSubmit">
    <!-- 用户名输入 -->
    <el-form-item label-width="0">
      <el-input type="text" v-model="form.username" clearable :placeholder="placeHolder.newUsername" :prefix-icon="User"
        maxlength="20" show-word-limit />
    </el-form-item>
    <!-- 密码输入 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="form.password" show-password :placeholder="placeHolder.oldPasword"
        :prefix-icon="Lock" maxlength="32" show-word-limit />
    </el-form-item>
    <!-- 修改按钮 -->
    <el-form-item label-width="0">
      <el-button type="primary" @click="handleBack" class="update">返回</el-button>
      <el-button type="primary" native-type="submit" class="update">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import user from '@/api/user'
import router from '@/router'
import getEncryptData from '@/encrypt'
import { placeHolder, alertStatus, alertText } from '@/string'
import Alert from '@/utils/alert'


// 表单信息存储
const form = reactive({
  username: '',
  password: '',
})


// 处理表单提交的回调
async function handleSubmit(event: { preventDefault: () => void }) {
  event.preventDefault()

  // 数据加密
  const encryptedData = getEncryptData(form.password)

  const oldUsername = window.sessionStorage.getItem('username')
  const userData = { oldUsername, newUsername: form.username, oldPassword: encryptedData, newPassword: encryptedData }

  // 发送请求
  const token = window.sessionStorage.getItem('token')
  await user.updateUserMsg(userData, token as string)

  // 验证成功则跳转到交易页面，否则弹出错误信息
  Alert(alertText.successChange, alertStatus.success)

  window.sessionStorage.setItem('username', form.username)
  router.replace('/trading')
}
// 返回
function handleBack() {
  router.push('/trading')
}
</script>

<style scoped>
span {
  color: red;
  font-size: 12px;
}

.update {
  margin: auto;
}
</style>
