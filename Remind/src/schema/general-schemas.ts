import z from "zod";

export const contentSchema = z.object({
  link: z.url(),
  title: z.string().max(24),
});

export const linkSchema = z.object({
  hash: z.url(),
});

export const tagsSchema = z.object({
  title: z.string().max(30),
});
