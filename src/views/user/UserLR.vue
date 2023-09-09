<template>
  <div id="formBox">
    <nav>
      <RouterLink to="/user/login">
        <el-icon class="icon">
          <Female />
        </el-icon>
        <span>登录</span>
      </RouterLink>
      <RouterLink to="/user/register">
        <el-icon class="icon">
          <Male />
        </el-icon>
        <span>注册</span>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
#formBox {
  width: 300px;
  margin: 100px auto;
  background-color: white;
  border: 1px solid #666;
  padding: 20px 20px;
}

nav {
  text-align: center;
  margin-bottom: 20px;
}

nav a {
  color: black;
  padding: 5px 20px;
  display: inline-block;
  width: 100px;
}

nav a.router-link-exact-active {
  color: blue;
  border-bottom: 1px solid blue;
}

.icon, span {
  vertical-align: middle
}
</style>
