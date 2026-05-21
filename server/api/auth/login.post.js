import { dbOperations } from "../../utils/dbOperations";

export default defineEventHandler( async (event) => {
   const body = await readBody(event);

   const { name, email, picture } = body

   if(!name || !email || !picture){
    throw createError({
      statusCode: 400,
      statusMessage: "Fulfill all the credentials for authentication."
    })
   }

   const isAdmin = await dbOperations.findAdmin( email );
   const role = isAdmin ? 'admin' : 'user';

   await setUserSession(event, {
    user:{
      name, email, picture, role
    }
   })
  
  return { role }; 
})