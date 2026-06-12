<script setup>
/**
 * @file pages/addrepository.vue
 * @description Administrative interface 
 * provide access to create new repositories
 */

// dynamic title binding
useHead({
  title: 'Add Repository' 
})
 
  
</script>

<template>

  <div class="contentContainer">
      <h1 tabindex="0">Admin Panel</h1>
      <p tabindex="0">Manage repositories from a single admin workspace</p>

      <!-- Repository Form -->
      <AddRepository />
  </div>

</template>

<style lang="scss" scoped>


   
    .contentContainer{
      width:100%;
      max-width:100%;
      box-sizing:border-box;
      display:flex;
      flex-direction:column;
      
      

      h1{
        font-size: $font-heading;
        margin-bottom:2px;
      }
      p{
        font-size: $font-forDesc;
        color:gray;
        
      }
      
      
    }
  
</style>
