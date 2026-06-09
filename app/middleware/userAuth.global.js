
export default defineNuxtRouteMiddleware(async(to)=> {
 
  const {user} =  useUserSession()

  //if a logged in user tries to hit login page
  if (to.path === '/login' && user.value){
    return navigateTo('/dashboard')
  }

  //if not logged in
  if (to.path !== '/login' && !user.value){
    return navigateTo('/login')
  }

  if(to.path.startsWith('/addrepository') && user.value.role !== 'admin'){
    return navigateTo('/dashboard')
  }

  
})



