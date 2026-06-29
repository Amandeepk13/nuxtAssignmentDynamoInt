/**
* GET /api/applications/:name
*
* Fetches a single repository respect to name.
* - Refresh repository state after taking token
* 
*/

/**
* Imports
*/
import { dbOperations } from "../../libs/dynamo-service";

export default defineEventHandler(async (event) => {
 try {

   /**
    * Route Parameter
    */
   const name = getRouterParam(event, "name");

   if (!name?.trim()) {
     throw createError({
       statusCode: 400,
       statusMessage: "Repository name is required"
     });
   }

   /**
    * Repository Lookup in database
    */
   const repository = await dbOperations.getApplicationByName(
     name.trim().toLowerCase()
   );

   if (!repository) {
     throw createError({
       statusCode: 404,
       statusMessage: "Repository not found"
     });
   }

   return repository;

 } catch (err) {

   if (err.statusCode) {
     throw err;
   }

   throw createError({
     statusCode: 500,
     statusMessage: "Unable to fetch repository"
   });
 }
});
