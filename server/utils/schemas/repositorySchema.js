/**
 * Repository Creation schema
 *
 * Used by:
 * POST /api/applications
 *
 * - validates repository name, type, description, url
 */

/**
 * imports
 */
import { z } from "zod";

/**
 * Repository payload validation
 */
export const repositorySchema = z.object({
  name: z.string().trim().min(1, "Repository name is required"),
  type: z.enum(["Applications", "Stacks", "Library"], {
    error: "Invalid repository type",
  }),
  description: z.string().trim().min(1, "Description is required"),
  repositoryLink: z.url("Invalid reposiotry URL"),
});
