<template>
  <header>
   <div>
    <a href="http://www.szse.cn/" target="_blank"><img src="../../assets/logo2.png"
        alt="无法显示文本"></a>
    <img src="../../assets/logo5.png" alt="无法显示文本">
   </div>
    <ul>
      <li>
        <a href="#" id="first" @click="update">{{ username }}</a>
      </li>
      <li>
        <a href="" @click="exit">退出</a>
      </li>
    </ul>
  </header>
</template>

<script lang="ts" setup>
import router from '@/router'

const username = window.sessionStorage.getItem('username')

// 退出按钮得回调
function exit() {
  window.sessionStorage.removeItem('username')
  window.sessionStorage.removeItem('uid')
  window.sessionStorage.removeItem('stockCode')
  window.sessionStorage.removeItem('token')
  router.push('/user/login')
}

// 用户名点击的回调，跳转到修改用户信息的页面
function update() {
  router.push('/update/updateUsername')
}

</script>

<style scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

ul {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  list-style: none;
}


a {
  padding: 0 20px;
}

#first {
  font-size: 12px;
  border-right: 1px solid #666;
}</style>
