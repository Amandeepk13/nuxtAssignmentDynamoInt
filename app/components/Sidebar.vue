<script setup>

  const { isLoading } = useGlobalLoader()
  const { user } = useUserSession()

  const isSidebarOpen = ref(true)

  const route = useRoute()

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const goToDashboard = () => {
    navigateTo('/dashboard')
  }

  const goToAddRepository = () => {
   navigateTo('/addrepository')
  }

</script>

<template>

  <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }" v-if="user?.role === 'admin'">

      <button class="toggleBtn" @click="toggleSidebar" :aria-label="isSidebarOpen ? 'Close sidebar' : 'Open sidebar'" >
        <img src="../assets/img/menuIcon.svg" aria-hidden="true"/>
      </button>

      <nav class="sidebarContainer">
        <ul>
          <li>
            <button 
            class="linkBtn dashboard" :class= "route.path === '/dashboard' ? 'active' : '' " @click="goToDashboard" aria-label="Click to activate Dashboard"> Dashboard
            </button>
          </li>
          
          <li>
            <button 
            class="linkBtn addrepo" :class="route.path === '/addrepository'  ? 'active' : '' " @click="goToAddRepository"  aria-label="Click to activate Add Repository Form">Add Repository
            </button>
          </li>
        </ul>
      </nav>
       
    </aside>
</template>

<style lang="scss" scoped>


  .sidebar{
     width:220px;
     min-height: 100vh;
     padding:20px 0px;
     overflow: hidden;
     transition: 0.3s ease;
     position:relative;

     &.collapsed{
      width:28px;

      .sidebarContainer{
        opacity:0;
        visibility:hidden;
      }

     }

     .toggleBtn{
        position: absolute;
        top: 20px;
        right: -10px;
        width: 38px;
        height: 44px;
        border: none;
        border-radius: 14px;
        background: rgb(171, 171, 173);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: 0.2s ease;
      }

    .sidebarContainer{
      display:flex; 
      flex-direction: column;
      padding:2px 6px;

      ul{
        padding: 2px;
        list-style: none;
        li{
          margin: 4px;
        }
        
      }
    
      .linkBtn{
        width:150px;
        display:flex;
        align-items: center;
        gap:12px;
        border:none;
        padding:12px 8px;
        cursor:pointer;
        border-radius:8px;
        font-size: 14px;
        font-weight: 600;
        background-color: rgba(194, 200, 205, 0.854);
        color: rgb(75, 74, 74);
        transition:0.2s ease;


        &::before {
          content: "";
          width: 12px;
          height:12px;
          border-radius: 4px;
          background-color: gray;
        }
        
        &.active {
          background-color: black;
          color:white;

          &::before {
            background-color: rgb(17, 101, 245);
          }
        }
      }
     }
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

  .sidebar{
    width:100% ;
    min-height:auto ;
    padding:12px ;

    &.collapsed{
      width:100% ;
   }

   .linkBtn{
      width:auto ;
      min-width:140px;
      justify-content:center;
    }
  }


  .sidebarContainer{
    visibility:visible !important;

    ul{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      justify-content:center;
    }
  }
 
  .toggleBtn{
    display:none !important;
  }

  .content{
    padding:16px ;
    min-height:auto ;
  }
}

</style>