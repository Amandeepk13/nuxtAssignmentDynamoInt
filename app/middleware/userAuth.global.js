/**
 * 
 * Global Authentication Middleware
 * 
 * Rules:-
 * - Logged-in users cannot access login page.
 * - Unauthenticated users are redirected
 *   to login page.
 * - Add Repository page is restricted
 *   to administrators only.
 */


export default defineNuxtRouteMiddleware(async(to)=> {
 
  /**
   * Session
   */
  const {user} =  useUserSession()

  /**
   * Redirect Logged-In Users
   */
  if (to.path === '/login' && user.value){
    return navigateTo('/dashboard')
  }

  /**
   * Protect private routes
   */
  if (to.path !== '/login' && !user.value){
    return navigateTo('/login')
  }

  /**
   * Role-Based Authorization
   */
  if(to.path.startsWith('/addrepository') && user.value.role !== 'admin'){
    return navigateTo('/dashboard')
  }

  
})


