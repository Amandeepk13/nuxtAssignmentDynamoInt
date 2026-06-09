export default defineEventHandler(async (event) => {
  
  //only run checks for for api's
  if (!event.path?.startsWith('/api')) return;

  
  if (event.path?.startsWith('/api/auth') || event.path?.startsWith('/api/_auth')) {
    return
  }

  // check if the session exists for the user
  const session = await getUserSession(event);

  if(!session?.user){
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied.Please Authenticate first"
    })
  }

  // added to the global event context...to make accessible for all apis
  event.context.user = session.user;

}) 

