<script setup>
/**
 * Header Component
 * 
 * 
 * Top navigation bar 
 * display logo, title and current user
 * logout action
 */


 /**
  * composables
  */
 const { user, clear } = useUserSession()
 const loader = useGlobalLoader()
 

/**
 * logout actions
 */
 const handleLogout = async() => {   

  try {
    loader.value = true
    await $fetch('/api/auth/logout', { 
      method: 'POST' 
    })
    await clear()
    navigateTo('/login')

  } finally {
      loader.value = false              
  }

}

  
  
  
</script>

<template>
  <header class = "header">
      <div class="headerContent">

       <div class="leftSection" aria-labelledby= "app-title app-subtitle" tabindex="0">
          <div class="logoBox">
            <img src= "../assets/img/git-mergeIcon.svg "  class="mergeLogo" alt="Logo" aria-hidden="true" />
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
              <img src="../assets/img/logout.svg" alt="logout" class="logoutIcon" aria-hidden="true"/> 
              <span class="d-none d-md-inline"> Logout</span> 
            </button>
          </li> 
        </ul>
        
       </div>
      </div>
     </header>
</template>

<style lang="scss" src="../assets/scss/header.scss">
</style>

