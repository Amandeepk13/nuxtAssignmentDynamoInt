// Validation for creating new repositories...

import { ZodError } from "zod";

export function validateBody(schema, body) {
  try {
    return schema.parse(body);

  } catch (err) {

    if (err instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: err.issues[0].message
      });
    }

    throw err;
  }
}
