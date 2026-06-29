/**
 * GET /api/applications
 * 
 * retrieves all repositories from storage
 */

/**
 * imports
 */
import { dbOperations } from "../../libs/dynamo-service"


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