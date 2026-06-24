/**
 * POST /api/merge
 * 
 * Repository Token Management
 * - acquire/release tokens, handle concurrent 
 *   and race condition
 */

/**
 * imports
 */
import { dbOperations } from "../../libs/dynamo-service";

export default defineEventHandler(async (event) => {

try { 

  /**
   * Authentication
   */
  const user = event.context?.user?.name; // accessing the user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied. Authenticate first",
    });
  }

  const body = await readBody(event); 

  let { applicationName } = body;

  applicationName = applicationName.trim().toLowerCase();

  if (!applicationName) {
      throw createError({
         statusCode: 400,
         statusMessage: "Repository name is required."
      });
  }

  /**
   * Repository Lookup
   */
  const app = await dbOperations.getApplicationByName(applicationName);

  if (!app) {
    throw createError({
      statusCode: 404,
      statusMessage: "Repository not found"
    });
  }

  /**
   * Release Token Flow
   */ 
  if (app.merged) {

    if (app.mergedBy === user) { // if same user
      app.merged = false;
      app.mergedBy = null;
      app.mergedAt = null;
      app.status = "Available";

      
     try{

      await dbOperations.updateApplicationData(app,user);

      return {
        success: true,
        statusCode: 200,
        message: `'${applicationName}' token released successfully`,
      };

    } catch(err){ 
        // race condition if somehow at the same msec someone else acquired the token and the user has no access to release it ...
        if (err.name === "ConditionalCheckFailedException") { 
            throw createError({
              statusCode: 400,
              statusMessage: `'${applicationName}' is acquired by someone else`
            });
        }

      throw err;

     }

    }

    throw createError({
      statusCode: 400,
      statusMessage: `'${applicationName}' is already in merging by ${app.mergedBy}`
      
    });
  }


  /**
   * Acquire Token Flow
   */
  app.merged = true;
  app.mergedBy = user;
  app.status = "Not Available";
  app.mergedAt = new Date().toISOString();

  try {

  await dbOperations.updateApplicationData(app, user);

  return {
    success: true,
    statusCode: 200,
    message: `'${applicationName}' merging in process by you`,
  };

 } catch(err){

    if(err.name === "ConditionalCheckFailedException"){
      
      const currentApp = await dbOperations.getApplicationByName(applicationName);

      throw createError({
          statusCode: 400,
          statusMessage: `'${applicationName}' is already in merging by ${currentApp?.mergedBy}`
      });

    }
    throw err;

  }

} catch (err) {

    // the defined error to be passed
    if (err.statusCode) { 
      throw err;
    }

    //any other db connection error
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to process merge requests"
    });
  }

});
