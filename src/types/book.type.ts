import { z } from '@hono/zod-openapi';

export const BookSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().nullable(),
    isAvailable: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Book');

export const GetBooksQuerySchema = z
  .object({
    isAvailable: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
  })
  .openapi('GetBooksQuery');

export const GetBooksResponseSchema = z
  .object({
    data: z.array(BookSchema),
  })
  .openapi('GetBooksResponse');

export const GetBookByIdParamsSchema = z
  .object({
    id: z.string(),
  })
  .openapi('GetBookByIdParams');

export const GetBookByIdResponseSchema = z
  .object({
    data: BookSchema,
  })
  .openapi('GetBookByIdResponse');
