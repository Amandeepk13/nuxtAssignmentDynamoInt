<script setup>

  const { isLoading } = useGlobalLoader()

</script>

<template>

  <div class="defaultLayoutContainer">

    <AppLoader v-if="isLoading" />

    <Header />

    <main class="mainBody">

      <div class="adminPage container-fluid">

        <Sidebar />

        <section class = "content">
      
          <slot/>
        </section>

      </div>

    </main>

  </div>

</template>

<style lang="scss" scoped>

  .adminPage{
    display:flex;
    
    margin: 2px;
    flex-direction: row;
    width:100%;
    padding:0;
    overflow-x:hidden;
  }

    .content{
      flex:1;
      margin:2px;
      box-sizing: border-box; 
      box-shadow: -2px 0 2px rgba(121, 121, 123, 0.345);
      background-color: $bgcolor-primary;
      border-radius:8px;
      padding: 10px 28px;
      min-height: 100vh;
      position: relative;
    }

  
  // responsiveness to the page - sidebar wrt outer card 
@media (max-width: 768px){

  .adminPage{
    flex-direction: column;
  }


  .content{
    padding:16px ;
    min-height:auto ;
  }
}

</style>