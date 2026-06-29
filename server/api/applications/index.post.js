/**
 * POST /api/applications
 * 
 * creates a new repository
 * access by admin only
 */

/**
 * imports
 */
import { z, ZodError } from "zod";
import { dbOperations } from "../../libs/dynamo-service";

/**
 * repository schema needed for validation
 */
const appSchema = z.object({
  name: z.string().trim().min(1, "Repository name is required"),
  type: z.enum(["Applications", "Stacks", "Library"], {
    error: "Invalid repository type",
  }),
  description: z.string().trim().min(1, "Description is required"),
  repositoryLink: z.url("Invalid reposiotry URL"),
});

export default defineEventHandler(async(event)=>{

 try{

  /**
   * Admin authorization
   */
  if (event.context?.user?.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Access Denied. Only Admins are authorized"
    });
  }

  /**
   * Request Validation
   */
  const body = await readBody(event)
  
  let data;

  try {
    data = appSchema.parse(body);
    } catch (err) {

      if (err instanceof ZodError) {
        throw createError({
          statusCode: 400,
          statusMessage: err.issues[0].message
        });
      }

      throw err;
    }



  /**
   * Duplicate Repository Check
   */
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