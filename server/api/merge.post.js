import { dbOperations } from "../utils/dbOperations";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session.user.name;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Access Denied. Authenticate first",
    });
  }

  const body = await readBody(event);

  const { applicationName } = body;

  const app = await dbOperations.findByName(applicationName);

  if (app.merged) {

    if (app.mergedBy === user) {
      app.merged = false;
      app.mergedBy = null;
      app.mergedAt = null;
      app.status = "Available";

      await dbOperations.saveApp(app);

      return { message: "Done merging. Token is relieved" };
    }

    throw createError({
      statusCode: 400,
      statusMessage: "This token is being taken and the Repository is in merging zone.",
      data: {
        mergedBy: app.mergedBy,
      },
    });
  }

  app.merged = true;
  app.mergedBy = user;
  app.status = "Not Available";
  app.mergedAt = new Date().toISOString();

  await dbOperations.saveApp(app);
});
