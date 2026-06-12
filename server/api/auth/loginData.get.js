/**
 * GET /api/auth/loginData
 * 
 * Returns authenticated user details
 * 
 */

export default defineEventHandler( async(event) => {

  /**
   * Session Verification
   */
  if(!event.context?.user){
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied. Please authenticate"
    })
  }

  return event.context.user
})
