import { dbOperations } from "../utils/dbOperations"

export default defineEventHandler(async(event) => {

  
  try{
    return await dbOperations.getAllApplications();

    }
     catch(err){
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server error"
      })
    }  
})