import { dbOperations } from "../utils/dbOperations";

export default defineEventHandler(async(event)=>{

 try{

  //parsing the request body from client and validating
  const body = await readBody(event)
  let { name, type, description, repositoryLink } = body;

  name = name.trim().toLowerCase();
  type = type.trim();
  description = description.trim();
  repositoryLink = repositoryLink.trim();

  if(!name || !type || !description || !repositoryLink){
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required."
    })
  }
  

  const validTypes = [ "Applications", "Stacks", "Library" ];

  if (!validTypes.includes(type)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid repository type."
      });
  }

  if( description.length > 100){
    throw createError({
       statusCode: 400,
       statusMessage: "The description should be less than 100 words"
    })
  }

  try {
    new URL(repositoryLink);
  } catch {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid repository URL."
      });
  }

  

  const exists = await dbOperations.findByName(name);

  if (exists) {

    throw createError({
      statusCode: 400,
      statusMessage: `'${name}' repository already exists`
    });

  }

  const application = {
    name,
    type,
    description,
    repositoryLink,
    status: "Available",
    merged: false,
    mergedBy: null,
    mergedAt: null
  };

  await dbOperations.createApp(application);


  return { 
    success: true,
    statusCode: 201,
    message: `'${name}' repository created successfully`,
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