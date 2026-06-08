// Repository Schema that is to be validated -  the request body comes form submission

import { z } from 'zod'; 

export const repositorySchema = z.object({
  name: z.string().trim().min(1, "Repository name is required"),
  type: z.enum(["Applications", "Stacks", "Library"], { error : "Invalid repository type" } ),
  description: z.string().trim().min(1, "Description is required"),
  repositoryLink: z.url("Invalid reposiotry URL")
});