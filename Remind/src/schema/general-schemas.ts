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

export const objectIdschema = z.object({
  id: z.string().min(24, "Invalid Id"),
});

export type  contentBody = z.infer<typeof contentSchema>
export type linkBody = z.infer<typeof linkSchema>
export type tagsBody = z.infer<typeof tagsSchema>
