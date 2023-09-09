<template>
  <div id="formBox">
    <nav>
      <RouterLink to="/update/updateUsername">
        <span class="update">修改用户名</span>
      </RouterLink>
      <RouterLink to="/update/updatePassword">
        <span class="update">修改密码</span>
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

.update {
  vertical-align: middle; 
  font-size: 12px;
}

</style>
