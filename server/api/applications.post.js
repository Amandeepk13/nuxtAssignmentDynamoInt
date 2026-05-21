import { dbOperations } from "../utils/dbOperations";

export default defineEventHandler(async(event)=>{

  const session = await getUserSession(event);

  if(!session.user || session.user.role !== "admin"){
    throw createError({
      statusCode: 403,
      statusMessage: "Access Denied. Only Admins are authorized"
    })
  }


  const body = await readBody(event)

  let { name, type, description, repositoryLink } = body;

  if(!name || !type || !description || !repositoryLink){
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required."
    })
  }

  name = name.trim().toLowerCase();

  const exists = await dbOperations.findByName(name);

  if (exists) {

    throw createError({
      statusCode: 400,
      statusMessage: "This Repository is already present"
    });

  }

  await dbOperations.createApp({
    name,
    type,
    description,
    repositoryLink,
    status: "Available",
    merged: false,
    mergedBy: null,
    mergedAt: null
  });


  return { success: true, message: "Repository created successfully" };
  
})