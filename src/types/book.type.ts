import { z } from '@hono/zod-openapi';

export const BookSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().nullable(),
    isAvailable: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
}).openapi("Book");

export const GetBooksQuerySchema = z.object({
    isAvailable: z.enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional()
}).openapi("BooksQuerySchema")

export const BooksResponseSchema = z.object({
    books : z.array(BookSchema),
})

export const GetBooksByIdParamsSchema = z.object({
    id : z.string(),
});

export const CreateBookBodySchema = z.object({
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().int().optional(),
}).openapi("CreateBookBody");

export const UpdateBookBodySchema = z.object({
    title: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    isAvailable: z.boolean().nullable().optional(),
    publishedYear: z.number().int().nullable().optional(),
}).openapi("UpdateBookBody");