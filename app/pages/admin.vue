<script setup>

  // definePageMeta({
  // middleware:'auth'
  // })

  const appStore = useApplicationsStore()
  const currentlyActive = ref("dashboard")
  const isSidebarOpen = ref(true)

  const goToAddRepository = () => {
    currentlyActive.value = "addRepository"
  }
  const goToDashboard = () => {
    currentlyActive.value = "dashboard"
  }
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
</script>

<template>
  <div class="adminPage container-fluid">

    <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }">

      <button class="toggleBtn" @click="toggleSidebar" :aria-label="isSidebarOpen ? 'Close sidebar' : 'Open sidebar'" >
        <img src="../assets/img/menuIcon.svg" aria-hidden="true"/>
      </button>

      <nav class="sidebarContainer">
        <ul>
          <li 
            class="linkBtn dashboard" :class=" currentlyActive === 'dashboard' ? 'active' : '' " @click="goToDashboard" tabindex="0" aria-label="Click to activate Dashboard"> Dashboard
          </li>
          
          <li 
            class="linkBtn addrepo" :class=" currentlyActive === 'addRepository' ? 'active' : '' " @click="goToAddRepository" tabindex="0" aria-label="Click to activate Add Repository Form">Add Repository
          </li>
        </ul>
      </nav>
       
    </aside>

    <section class = "content">
      

      <div class="contentContainer" v-show="currentlyActive === 'addRepository'">
        
         <h1 tabindex="0">Admin Panel</h1>
         <p tabindex="0">Manage repositories from a single admin workspace</p>

         <AddRepository />
         
       
      </div>

      <div class="adminDashboard" v-show="currentlyActive === 'dashboard'">
        <DashboardContent  :appsList="appStore.filteredApplications" />
      </div>
    </section>

  </div>

</template>

<style lang="scss" scoped>
  .adminPage{
    display:flex;
    font-family: Arial, Helvetica, sans-serif;
    margin: 2px;
    flex-direction: row;
    width:100%;
    padding:0;
    overflow-x:hidden;
  }
   
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
      background-color: rgba(240, 241, 243, 0.338);
      border-radius:8px;
      padding: 10px 28px;
      min-height: 100vh;
      position: relative;
    }
   
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
    .adminDashboard{
      display:flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }


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
