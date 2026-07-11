import { z } from '@hono/zod-openapi';

export const BookSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().nullable(),
    isAvailable: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi('Book');

export const ListBookSchema = z.array(BookSchema).openapi('ListBook');

export const QueryBookSchema = z.object({
  isAvailable: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
});

export const GetBookByIdSchema = z.object({
  id: z.string(),
});

export const CreateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  publishedYear: z.number().int().optional(),
});

export const UpdateBookSchema = z.object({
  title: z.string().min(1).nullable().optional(),
  author: z.string().min(1).nullable().optional(),
  isAvailable: z.boolean().nullable().optional(),
  publishedYear: z.number().int().nullable().optional(),
});
