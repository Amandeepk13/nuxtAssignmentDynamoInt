<script setup>
/**
 * @file pages/login.vue
 * @description login page for authentication 
 * 
 */

 
  // Disable default layout.
  definePageMeta({
    layout:false 
  })

  // Page title binding..
  useHead({
    title: 'Login'
  })
</script>

<template>
  <div class="loginPage container-fluid">
    <LoginComponent/>
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


