import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';
import {  GetBooksQuerySchema, BookSchema, GetBookByIdParamsSchema, CreateBookBodySchema, DeleteBookByIdParamsSchema } from 'src/types/book.type'

export const getBooksRoute = createRoute({
    operationId: 'getBooks',
    tags: ['books'],
    method: 'get',
    path: '/books',
    request : {
        query : GetBooksQuerySchema
    },
    responses: {
    200: {
        content: {
        'application/json': {
            schema: z.array(BookSchema),
        },
        },
        description: 'Get all books',
        },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});

export const getBookByIdRoute = createRoute({
    operationId: 'getBookById',
    tags: ['books'],
    method: 'get',
    path: '/books/{id}',
    request : {
        params : GetBookByIdParamsSchema
    },
    responses: {
    200: {
        content: {
        'application/json': {
            schema: BookSchema
        },
        },
        description: 'Get a book',
        },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
    },
})

export const createBookRoute = createRoute({
    operationId: 'createBook',
    tags: ['books'],
    method: 'post',
    path: '/books',
    request: {
    body: {
            content: {
                "application/json": {
                    schema: CreateBookBodySchema,
                },
            },
        },
    },
    responses: {
    201: {
        content: {
        'application/json': {
            schema: BookSchema
        },
        },
        description: 'Successfully create a book',
        },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
    },
})

export const deleteBookRoute = createRoute({
    operationId: 'deleteBook',
    tags: ['books'],
    method: 'delete',
    path: '/books/{id}',
    request: {
        params : DeleteBookByIdParamsSchema
    },
    responses: {
    201: {
        content: {
        'application/json': {
            schema: BookSchema
        },
        },
        description: 'Successfully delete a book',
        },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
    },
})