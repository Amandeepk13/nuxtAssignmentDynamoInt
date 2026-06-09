import { dbOperations } from "../utils/dbOperations";
import { repositorySchema } from "../utils/schemas/repositorySchema"
import { validateBody } from "../utils/validateBody";


export default defineEventHandler(async(event)=>{

 try{

  //Admin authorization
  if (event.context?.user?.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Access Denied. Only Admins are authorized"
    });
  }

  //parsing the request body from client and validating
  const body = await readBody(event)
  const data = validateBody(repositorySchema,body);


  // if reposiotry is present with same name
  const exists = await dbOperations.getApplicationByName(data.name.toLowerCase());

  if (exists) {

    throw createError({
      statusCode: 400,
      statusMessage: `'${data.name}' repository already exists`
    });

  }

  const application = {
    ...data,
    name: data.name.toLowerCase(),
    status: "Available",
    merged: false,
    mergedBy: null,
    mergedAt: null
  };

  await dbOperations.createApplication(application);


  return { 
    success: true,
    statusCode: 201,
    message: `'${data.name}' repository created successfully`,
  };

} catch (err){

  if (err.statusCode) { // already defined one's.. like duplicate existing error
    throw err;
  }

    throw createError({
      statusCode: 500,
      statusMessage:
        "Unable to create repository."
    });
}
  
})