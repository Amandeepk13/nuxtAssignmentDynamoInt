<script setup>
/**
 * Sidebar Component
 * 
 * 
 * Administrative navigation menu
 * Visible only to admin users
 */

 /**
  * Props
  */
 const props = defineProps({
    isOpen: {
      type: Boolean,
    }
  })

  /**
   * Composables
   */
  const { user } = useUserSession()
  const route = useRoute()

  /**
   * Navigation Configuration
   */
  // Navigate to dashboard
  const goToDashboard = () => {
    navigateTo('/dashboard')
  }
  // Navigate to addrepository
  const goToAddRepository = () => {
   navigateTo('/addrepository')
  }

</script>

<template>

  <aside class="sidebar" :class="{ collapsed: !props.isOpen }" v-if="user?.role === 'admin'">


      <nav class="sidebarContainer">
        <ul>
          <li>
            <button 
            class="linkBtn dashboard" :class= "route.path === '/dashboard' ? 'active' : '' " @click="goToDashboard" aria-label="Click to activate Dashboard">
            <img src="../assets/img/dashboardIcon.svg" class="navIcon" aria-hidden="true"/>
            <span>Dashboard</span> 
            </button>
          </li>
          
          <li>
            <button 
            class="linkBtn addrepo" :class="route.path === '/addrepository'  ? 'active' : '' " @click="goToAddRepository"  aria-label="Click to activate Add Repository Form">
            <img src="../assets/img/add-repositoryIcon.svg" class="navIcon" aria-hidden="true"/>
            <span>Add Repository</span>
            </button>
          </li>
        </ul>
      </nav>
       
    </aside>
</template>

<style lang="scss" scoped>

  .sidebar{
     width:200px;
     min-height: 100vh;
     padding:20px 0px;
     overflow: hidden;
     transition: 0.3s ease;
     position:relative;
     background-color: white;
     flex-shrink:0;
     

     &.collapsed{
      width:28px;

      .sidebarContainer{
        opacity:0;
        visibility:hidden;
      }

     }

    .sidebarContainer{
      display:flex; 
      flex-direction: column;
      padding:2px 6px;
      max-width: 180px;

      ul{
        padding: 2px;
        list-style: none;
        li{
          margin: 4px;
        }
        
      }
    
      .linkBtn{
        width:100%;
        display:flex;
        align-items: center;
        gap:12px;
        border:none;
        padding:12px 8px;
        cursor:pointer;
        border-radius: $border-radius-md;
        font-size: 14px;
        font-weight: 600;
        background-color: white;
        color: black;
        transition:0.2s ease;

        .navIcon{
          width:18px;
          height:18px;
          flex-shrink:0;
        }
        
        &.active {
          background-color: $bgcolor-appBadge;
        }
      }
     }
    }

//responsiveness for tablets
@media (max-width: 992px){

  .sidebar{
    width:160px;

    .sidebarContainer{
      width:150px;

     .linkBtn{
        font-size:12px;
        gap:8px;
        padding:10px 6px;
      }  
    }
  }
}

//responsiveness for mobile
@media (max-width: 576px){

  .sidebar{
    width:140px;

    .sidebarContainer{
      width:130px;

      .linkBtn{
        font-size:12px;
        padding:8px 4px;
        gap:4px;

      }

      
    }
      &.collapsed{
        width:60px;

        .sidebarContainer{
          opacity: 1;
          visibility: visible;
          max-width: 100%;
        }

        .linkBtn{
          justify-content: center;
        }
        span{
          display:none;
        }

      }
    
  }
}

</style>