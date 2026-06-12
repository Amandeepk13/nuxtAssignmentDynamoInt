/**
 * Validation Helper
 * 
 * Standardized validation using zod
 */

/**
 * imports
 */
import { ZodError } from "zod";

/**
 * Validates request payload against schema
 */
export function validateBody(schema, body) {
  try {
    return schema.parse(body);

  } catch (err) {

    if (err instanceof ZodError) {
      /**
       * validation errors into api responses
       */
      throw createError({
        statusCode: 400,
        statusMessage: err.issues[0].message
      });
    }

    throw err;
  }
}
