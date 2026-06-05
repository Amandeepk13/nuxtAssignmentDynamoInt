import { dbOperations } from "../utils/dbOperations";

export default defineEventHandler(async (event) => {

try { 

  // accessing the user
  const user = event.context.user?.name;

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

  const app = await dbOperations.findByName(applicationName);

  if (!app) {
    throw createError({
      statusCode: 404,
      statusMessage: "Repository not found"
    });
  }

  //releasing token 
  if (app.merged) {

    if (app.mergedBy === user) { // if same user
      app.merged = false;
      app.mergedBy = null;
      app.mergedAt = null;
      app.status = "Available";

      
     try{

      await dbOperations.saveApp(app,user);

      return {
        success: true,
        statusCode: 200,
        message: `'${applicationName}' token released successfully`,
      };

    } catch(err){ 

        if (err.name === "ConditionalCheckFailedException") {
            throw createError({
              statusCode: 400,
              statusMessage: `'${applicationName}' can only be released by its owner`
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


  //take token
  app.merged = true;
  app.mergedBy = user;
  app.status = "Not Available";
  app.mergedAt = new Date().toISOString();

  try {

  await dbOperations.saveApp(app, user);

  return {
    success: true,
    statusCode: 200,
    message: `'${applicationName}' merging in process by you`,
  };

 } catch(err){

    if(err.name === "ConditionalCheckFailedException"){
      
      const currentApp = await dbOperations.findByName(applicationName);

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
