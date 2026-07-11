import { z } from '@hono/zod-openapi';

export const BookSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().nullable().optional(),
    isAvailable: z.boolean(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .openapi('Book');

export const BookListResponseSchema = z.array(BookSchema).openapi('BookListResponse');

export const BookResponseSchema = BookSchema.openapi('BookResponse');
