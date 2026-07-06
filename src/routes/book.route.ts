import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const bookSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    yearpublish: z.coerce.number().nullable(),
    avaliable: z.coerce.boolean(),
    created: z.coerce.string().datetime(),
    updated: z.coerce.string().datetime(),
})
.openapi('Book');

export const librarySchema = z.object({
    totalBooks: z.number(),
    totalAvailable: z.number(),
}).openapi('LibraryStatus');

export const getCondition = createRoute({
    operationId: 'getCondition',
    tags: ['books'],
    method: 'get',
    path: '/api/library/status',
    responses:{
        200: {
            description:'Mendapatkan total buku dan total available',
            content:{
                'application/json': {schema: librarySchema}
            }
        },
        500: createErrorResponse('GENERIC', 'Internal Server Error'),
    }
})

export const getBookRoute = createRoute({   
    operationId: 'getBooks',
    tags: ['books'],
    method: 'get',
    path: '/api/books',
    request: {
        query: z.object({
            isAvailable: z
                .string()
                .optional()
                .transform((val) => val === undefined ? undefined : val.toLowerCase() === 'true')
                .openapi({ 
                    type: 'boolean',
                    description: 'Filter by availability (true/false)'
                }),
        }),
    },
    responses:{
        200: {
            description: 'Mendapatkan semua buku',
            content: {
                'application/json':{
                    schema: z.array(bookSchema)
                }
            }
        },
        500: createErrorResponse('GENERIC', 'Internal Server Error'),
    }
});

export const getById = createRoute({
    operationId: 'getById',
    tags: ['books'],
    method: 'get',
    path: '/books',
    request: {
        query: z.object({
            bookid: z
                .string()
                .optional()
                .openapi({ 
                    type: 'string',
                    description: 'Get a book by the ID'
                }),
        }),
    },
    responses:{
        200: {
            description: 'Mendapatkan buku dengan id tertentu',
            content: {
                'application/json':{
                    schema: z.array(bookSchema)
                }
            }
        },
        500: createErrorResponse('GENERIC', 'Internal Server Error'),
    }
})

export const newBook = createRoute({
    operationId: 'newBook',
    tags: ['books'],
    method: 'post',
    path:'/books',
    request: {
        query: z.object({
            id: z.string(),
            title: z.string(),
            author: z.string(),
            yearpublish: z.coerce.number().nullable(),
            avaliable: z.coerce.boolean(),
            created: z.coerce.date(),
            updated: z.coerce.date(),
        })
    },
    responses:{
        200: {
            description: 'Memasukan buku baru',
            content: {
                'application/json':{
                    schema: z.array(bookSchema)
                }
            }
        },
        500: createErrorResponse('GENERIC', 'Internal Server Error'),
    }
})