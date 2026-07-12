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

export const CreateBookSchema = z
  .object({
    title: z.string().min(1),
    author: z.string().min(1),
    publishedYear: z.number().int().positive().optional(),
  })
  .openapi('CreateBook');

export const UpdateBookSchema = z
  .object({
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    publishedYear: z.number().int().positive().optional(),
    isAvailable: z.boolean().optional(),
  })
  .openapi('UpdateBook');

export const BookListResponseSchema = z.array(BookSchema).openapi('BookListResponse');
export const BookResponseSchema = BookSchema.openapi('BookResponse');
export const CreateBookResponseSchema = BookSchema.openapi('CreateBookResponse');
export const UpdateBookResponseSchema = BookSchema.openapi('UpdateBookResponse');
export const DeleteBookResponseSchema = BookSchema.openapi('DeleteBookResponse');
