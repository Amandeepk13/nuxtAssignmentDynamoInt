<script setup>

 
  
</script>

<template>

  <div class="contentContainer">
      <h1 tabindex="0">Admin Panel</h1>
      <p tabindex="0">Manage repositories from a single admin workspace</p>

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
        font-size:32px;
        margin-bottom:2px;
      }
      p{
        font-size:14px;
        color:gray;
        
      }
      
      
    }
  
</style>
