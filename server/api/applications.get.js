import { dbOperations } from "../utils/dbOperations"

export default defineEventHandler(async(event) => {


  if(!event.context.user){
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied.Please Authenticate first"
    })
  }
  
  try{
    return await dbOperations.getApp();

    }
     catch(err){
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server error"
      })
    }  
})