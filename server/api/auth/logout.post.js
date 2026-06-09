export default defineEventHandler(async(event) => {
  try {
    await clearUserSession(event)

    return {
      success: true,
      message: "User is successfully logged out"
    }
  } catch {
    return {
      success: true,
      message: "User logout fails..."
    }
  }
})