<template>
  <el-form :model="form" label-width="120px" @submit="handleSubmit">
    <!-- 旧密码输入 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="form.oldPassword" show-password :placeholder="placeHolder.oldPasword" :prefix-icon="Lock"
        show-word-limit />
    </el-form-item>
    <!-- 新密码输入 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="form.newPassword" show-password :placeholder="placeHolder.newPassword" :prefix-icon="Lock"
        show-word-limit />
    </el-form-item>
    <!-- 再次输入密码 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="checkUserMsg.checkpasswordData.checkpassword" :placeholder="placeHolder.newPasswordAgain"
        :prefix-icon="Lock" @input="validatePassword" />
      <br>
      <span v-show="!checkUserMsg.checkpasswordData.isSame">两次输入的密码不同</span>
    </el-form-item>
    <!-- 注册按钮 -->
    <el-form-item label-width="0">
      <el-button type="primary" @click="handleBack" class="update">返回</el-button>
      <el-button type="primary" native-type="submit" class="update">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Lock } from '@element-plus/icons-vue'
import user from '@/api/user'
import router from '@/router'
import getEncryptData from '@/encrypt'
import { placeHolder, alertText, alertStatus } from '@/string'
import Alert from '@/utils/alert'

// 表单信息存储
const form = reactive({
  oldPassword: '',
  newPassword: '',
})

// 密码二次验证及密码长度的变量
const checkUserMsg = reactive({
  checkpasswordData: {
    checkpassword: '',
    isSame: true,
  },
  checkPasswordLength: false,
  checkPasswordLength2: false,
  checkPasswordLength3: false,
})

// 处理表单提交的回调
async function handleSubmit(event: { preventDefault: () => void }) {

  event.preventDefault()

  if (checkUserMsg.checkPasswordLength || checkUserMsg.checkPasswordLength2 || checkUserMsg.checkPasswordLength3) {
    Alert(alertText.lengthExceed, alertStatus.error)
  } else {

    // 数据加密
    const encryptedData1 = getEncryptData(form.oldPassword)
    const encryptedData2 = getEncryptData(form.newPassword)
    const oldUsername = window.sessionStorage.getItem('username')
    const userData = { oldUsername, newUsername: oldUsername, oldPassword: encryptedData1, newPassword: encryptedData2 }

    // 发送请求
    const token = window.sessionStorage.getItem('token')
    await user.updateUserMsg(userData, token as string)

    // 验证成功则跳回到交易页面
    Alert(alertText.successChange, alertStatus.success)
    router.replace('/trading')

  }
}
// 密码二次验证的回调
function validatePassword() {
  if (checkUserMsg.checkpasswordData.checkpassword && (form.newPassword !== checkUserMsg.checkpasswordData.checkpassword)) {
    checkUserMsg.checkpasswordData.isSame = false
  } else {
    checkUserMsg.checkpasswordData.isSame = true
  }
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
