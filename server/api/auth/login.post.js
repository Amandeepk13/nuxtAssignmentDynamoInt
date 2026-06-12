import { dbOperations } from "../../utils/dbOperations";

/**
 * POST /api/auth/login
 * 
 * Creates authenticated user session
 * 
 */

export default defineEventHandler( async (event) => {

  /**
   * Request Body
   */
   const body = await readBody(event);
   const { name, email, picture } = body


   /**
    * Validation
    */
   if(!name || !email || !picture){
    throw createError({
      statusCode: 400,
      statusMessage: "Fulfill all the credentials for authentication."
    })
   }

   /**
    * User Role assigned
    */
   const isAdmin = await dbOperations.listAdminUsers( email );
   const role = isAdmin ? 'admin' : 'user';

   /**
    * Session Creation
    */
   await setUserSession(event, {
    user:{
      name, email, picture, role
    }
   })
  
   /**
    * Success Response
    */
  return { 
    success : true,
    message: "User is successfully logged in",
    role 
  }; 
})