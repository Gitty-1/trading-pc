<template>
  <el-form :model="form" label-width="120px" @submit="handleSubmit">
    <!-- 用户名输入 -->
    <el-form-item label-width="0">
      <el-input type="text" v-model="form.username" clearable :placeholder="placeHolder.username" :prefix-icon="User"
        maxlength="20" show-word-limit />
    </el-form-item>
    <!-- 密码输入 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="form.password" show-password :placeholder="placeHolder.password"
        :prefix-icon="Lock" show-word-limit />
    </el-form-item>
    <!-- 再次输入密码 -->
    <el-form-item label-width="0">
      <el-input type="password" v-model="checkpasswordData.checkpassword" :placeholder="placeHolder.newPasswordAgain"
        :prefix-icon="Lock" @input="validatePassword" />
      <!-- <br> -->
      <div class="tip">
        <span v-show="!checkpasswordData.isSame">两次输入的密码不一致</span>
      </div>
    </el-form-item>
    <!-- 注册按钮 -->
    <el-form-item label-width="0">
      <el-button type="primary" native-type="submit" id="register">注册</el-button>
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

const form = reactive({
  username: '',
  password: '',
})

// 密码二次验证的变量
const checkpasswordData = reactive({
  checkpassword: '',
  isSame: true,
})

// 处理表单提交的回调
async function handleSubmit(event: { preventDefault: () => void }) {

  event.preventDefault()

  // 密码长度超限
  if (form.password.length > 15) {
    Alert(alertText.lengthExceed, alertStatus.error)
  } else if (checkpasswordData.isSame === false) {
    Alert(alertText.twicePasswordWrong, alertStatus.error)
  } else {
    // 数据加密
    const encryptedData = getEncryptData(form.password)
    const userData = { username: form.username, password: encryptedData }
    // 发送请求
    await user.register(userData)

    // 跳转页面
    Alert(alertText.successRegister, alertStatus.success)
    router.replace('/user/login')

  }
}
// 密码二次验证的回调
function validatePassword() {
  if (checkpasswordData.checkpassword && (form.password !== checkpasswordData.checkpassword)) {
    checkpasswordData.isSame = false
  } else {
    checkpasswordData.isSame = true
  }
}
</script>

<style scoped>
#register {
  margin: auto;
}

.tip {
  width: 100%;
  height: 15px;
  color: red;
  font-size: 12px;
}
</style>
