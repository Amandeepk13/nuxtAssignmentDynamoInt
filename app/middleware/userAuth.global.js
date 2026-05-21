
export default defineNuxtRouteMiddleware(async(to)=> {
 
  const {user} =  useUserSession()

  if (to.path === '/login') return

  if(!user.value){
    return navigateTo('/login')
  }

  if(to.path.startsWith('/admin') && user.value.role !== 'admin'){
    return navigateTo('/')
  }

  
})

