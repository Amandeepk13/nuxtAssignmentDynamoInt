export default defineEventHandler(async (event) => {
  
  //only run checks for for api's
  if (!event.path.startsWith('/api')) return;


  // add the user to the event context so that it can be accessed
  const session = await getUserSession(event);
  event.context.user = session?.user;

  

}) 