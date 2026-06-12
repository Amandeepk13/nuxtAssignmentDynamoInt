<script setup>

  const { user } = useUserSession()
  const route = useRoute()

  const props = defineProps({
    isOpen: {
      type: Boolean,
    }
  })

  const goToDashboard = () => {
    navigateTo('/dashboard')
  }

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

        &::before{
          width:10px;
          height:10px;
        }
      }
    }
  }
}

</style>