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

export const CreateBookBodySchema = z.object({
    title : z.string().nonempty(),
    author : z.string().nonempty(),
    publishedYear: z.number().int().optional()
});
export type CreateBookInput = z.infer<typeof CreateBookBodySchema>;

export const UpdateBookByIdParamsSchema = z.object({
    id : z.string().max(128)
});
export const UpdateBookByIdBodySchema = z.object({
    title: z.string().optional().nullable()
        .transform((val) => (val === "" || val === null ? undefined : val)),
        
    author: z.string().optional().nullable()
        .transform((val) => (val === "" || val === null ? undefined : val)),
        
    isAvailable: z.boolean().optional().nullable()
        .transform((val) => (val === null ? undefined : val)),
        
    publishedYear: z.number().int().optional().nullable()
        .transform((val) => (val === null ? undefined : val))
});
export type UpdateBookInput = z.infer<typeof UpdateBookByIdBodySchema>;
export const UpdateBookSchema = z.object({
    id: z.string().max(128),
    data: UpdateBookByIdBodySchema
});
export type UpdateBook = z.infer<typeof UpdateBookSchema>;

export const DeleteBookByIdParamsSchema = z.object({
    id : z.string().max(128)
});