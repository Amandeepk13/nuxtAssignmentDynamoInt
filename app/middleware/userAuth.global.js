
export default defineNuxtRouteMiddleware(async(to)=> {
 
  const {user} =  useUserSession()

  if (to.path === '/login') return

  if(!user.value){
    return navigateTo('/login')
  }

  if(to.path.startsWith('/addrepository') && user.value.role !== 'admin'){
    return navigateTo('/dashboard')
  }

  
})

