import { number, string, z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
});

export const commentSchema = z.object({
  blogId: number(),
  text: string(),
});
