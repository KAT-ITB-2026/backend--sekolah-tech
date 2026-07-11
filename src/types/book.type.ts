import { z } from '@hono/zod-openapi';

export const BookSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().nullable(),
    isAvailable: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .openapi('Book');

export const GetBookParamsSchema = z.object({
  id: z.string(),
});

export const CreateBookBodySchema = z.object({
  title: z.string(),
  author: z.string(),
  publishedYear: z.number().int().optional(),
});

export const UpdateBookBodySchema = z.object({
  title: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  publishedYear: z.number().int().optional().nullable(),
  isAvailable: z.boolean().optional().nullable(),
});

export const deleteBookResponseSchema = z.object({
  message: z.string(),
});

export const LibraryStatusSchema = z.object({
  totalBooks: z.number(),
  totalAvailable: z.number(),
});
