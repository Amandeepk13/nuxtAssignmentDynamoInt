<script setup>
  definePageMeta({
    layout:false 
  })
</script>

<template>
  <div class="loginPage">
    <LoginForm/>
  </div>
</template>

<style lang="scss" scoped>
.loginPage{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(221, 230, 250);
  width:100%;
  min-height:100vh;
}
</style>


