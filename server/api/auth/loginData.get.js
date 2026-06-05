export default defineEventHandler( async(event) => {

  if(!event.context.user){
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied. Please authenticate"
    })
  }

  return event.context.user
})