<script setup>
import mergeIcon from '~/assets/img/git-mergeIcon.svg'
import pushIcon from '~/assets/img/git-pushicon.svg'

 const { user, clear } = useUserSession()
 

 const handleLogout = async() => {
  const loader = useGlobalLoader()

  loader.value = true   

  try {
    await $fetch('/api/auth/logout', { 
      method: 'POST' 
    })
    await clear()
    navigateTo('/login')

  } finally {
      loader.value = false              
  }

}

  const route = useRoute()
  const isAdmin = computed( () => route.path === '/admin')

  
</script>

<template>
  <header class = "header">
      <div class="headerContent">

       <div class="leftSection" aria-labelledby= "app-title app-subtitle" tabindex="0">
          <div class="logoBox">
            <img :src= "isAdmin ? pushIcon : mergeIcon "  class="mergeLogo" alt="Logo" aria-hidden="true" />
          </div>
          <div class="title" aria-hidden="true">
            <h2 id="app-title">Merge Token</h2>
            <p id="app-subtitle" class="d-none d-md-block">Repository Management</p>
          </div>
       </div>

       <div class="dropdown rightSide" role="Dropdown" aria-label="Click to display dropdown menu." tabindex="0">

       
       <div class="userInfo dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
          <div v-if="user?.picture" class="userPicContainer">
            <img :src="user.picture" class="userPic" alt="User Profile"  referrerPolicy="no-referrer" aria-hidden="true"/>
          </div>
          <div class="usernameContainer d-none d-md-flex">
            <span class="username" aria-hidden="true">{{ user?.name }}</span>
            <img src="../assets/img/dropdown.svg" aria-hidden="true" />
          </div>
          
          
        </div>

        <ul class="dropdown-menu customDropdownMenu">
          <li> 
            <button @click="handleLogout" class="dropdown-item LogoutBtn" type="button" aria-label="Click to logout" >
              <img src="../assets/img/logout.svg" alt="logout" class="logoutIcon" aria-hidden="true"/> Logout 
            </button>
          </li> 
        </ul>
        
       </div>
      </div>
     </header>
</template>

