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

export const CreateBookBodySchema = z
  .object({
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().optional(), 
  })
  .openapi('CreateBookBody');

export const CreateBookResponseSchema = z
  .object({
    data: BookSchema,
  })
  .openapi('CreateBookResponse');

export const UpdateBookParamsSchema = z
  .object({
    id: z.string(),
  })
  .openapi('UpdateBookParams');

export const UpdateBookBodySchema = z
  .object({
    title: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    isAvailable: z.boolean().nullable().optional(),
    publishedYear: z.number().int().nullable().optional(),
  })
  .openapi('UpdateBookBody');

export const UpdateBookResponseSchema = z
  .object({
    data: BookSchema,
  })
  .openapi('UpdateBookResponse');

export const DeleteBookParamsSchema = z
  .object({
    id: z.string(),
  })
  .openapi('DeleteBookParams');

export const DeleteBookResponseSchema = z
  .object({
    message: z.string(),
  })
  .openapi('DeleteBookResponse');