<script setup>
/**
 * @file layouts/default.vue
 * @description Default layout. It wraps shared layout across authenticated pages 
 * like headers, sidebars, or containers.
 */

  const { isLoading } = useGlobalLoader()
  const { user } = useUserSession()

  const isSidebarOpen = ref(true)

  /**
   * Lifecycle method
   * - for styling mobile responsiveness
   */
  onMounted(() => {
  if (window.innerWidth <= 576) {
    isSidebarOpen.value = false
  }
})

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  // Check if user is an admin or normal user to strip the styling dynamically
  const isAdmin = computed(() => {
    return user.value?.role === 'admin'; 
  });

</script>

<template>

  <div class="defaultLayoutContainer">

    <AppLoader v-if="isLoading" />

    <Header class="globalHeader" />

    <main class="mainBody">

      <div class="adminPage ">

        <Sidebar v-if="isAdmin" :isOpen="isSidebarOpen"/>

        <button v-if="isAdmin" class="sidebarToggle" :class="{ collapsed: !isSidebarOpen }" @click="toggleSidebar" :aria-label="isSidebarOpen ? 'Close sidebar' : 'Open sidebar'" >
          <img src="../assets/img/sidebarToggle.svg" aria-hidden="true"/>
        </button>

        <section :class="['content', { 'normalUserLayout': !isAdmin }]">
      
          <slot/>
        </section>

      </div>

    </main>

  </div>

</template>

<style lang="scss" scoped>

  .defaultLayoutContainer {
    width: 100%;
    overflow-x: hidden; 
  }

  .globalHeader{
    position: relative;
    z-index: 10;
  }

  .adminPage{
    display:flex;
    margin: 0;
    flex-direction: row;
    width:100%;
    min-width:0;
    position:relative;
  }

    .content{
      flex:1;
      margin:2px;
      box-sizing: border-box; 
      box-shadow: -2px 0 2px rgba(121, 121, 123, 0.345);
      background-color: $bgcolor-primary;
      border-radius: $border-radius-md;
      padding: 10px 28px;
      min-height: 100vh;
      position: relative;
      min-width:0;

      &.normalUserLayout {
        box-shadow:none;
        margin:0;
        padding:20px;
      }
    }

  
.sidebarToggle{
  position:absolute;
  top:24px;
  left:196px;
  transform:translateX(-50%);
  width:38px;
  height:38px;
  border:none;
  border-radius:50%;
  background:white;
  box-shadow:0 2px 10px rgba(0,0,0,.15);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  z-index:1000;
  transition:left .3s ease;

    img{
      width:20px;
      height:20px;
      
    }

    &.collapsed{
      left:80px;
    }
  }

  
// responsiveness to tablet view
@media (max-width:992px){

  .sidebarToggle{
    left:158px;
  }

  .content{
    padding:10px 20px;
  }
}

// responsiveness to mobile view
@media (max-width:576px){

  .sidebarToggle{
    left:142px;
    width:34px;
    height:34px;

    &.collapsed{
      left:62px;
    }

    img{
      width:16px;
      height:16px;
    }
  }

  .content{
    padding:10px 14px;
  }
}


</style>