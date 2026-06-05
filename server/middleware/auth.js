export default defineEventHandler(async (event) => {
  
  //only run checks for for api's
  if (!event.path.startsWith('/api')) return;


  // add the user to the event context so that it can be accessed
  const session = await getUserSession(event);
  event.context.user = session?.user;

  // rules for admin
  if(event.path.startsWith('/api/applications')){

    if(!event.context.user || event.context.user.role !== 'admin'){
      throw createError({
        statusCode: 403,
        statusMessage: 'Access Denied. Only Admins are autorized.'
      })
    }
  }

}) 