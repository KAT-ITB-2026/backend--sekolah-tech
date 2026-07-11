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

export const GetBooksQuerySchema = z.object({
    isAvailable: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional()),
});

export const GetBookByIdParamsSchema = z.object({
    id : z.string().max(128)
});