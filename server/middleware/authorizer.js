/**
 * Authentication Middleware
 * 
 * Protect backend api routes
 * 
 */

export default defineEventHandler(async (event) => {
  
  /**
   * Only protect api routes
   */
  if (!event.path?.startsWith('/api')) return;

  /**
   * Skip authentication endpoints excluded routes
   * as these endpoints are responsible for creating sessions
   */
  if (event.path?.startsWith('/api/auth') || event.path?.startsWith('/api/_auth')) {
    return
  }

  /**
   * Session Validation
   */
  const session = await getUserSession(event);

  if(!session?.user){
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied.Please Authenticate first"
    })
  }

  /**
   * Make authenticated user globally available  
   * for all protected api handlers 
   */ 
  event.context.user = session.user;

}) 

