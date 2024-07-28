import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
});
