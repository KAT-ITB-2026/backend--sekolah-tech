import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';
import { GetBooksQuerySchema, BooksResponseSchema, GetBooksByIdParamsSchema, BookSchema, CreateBookBodySchema } from '~/types/book.type'


export const getAllBooksRoute = createRoute({
    method : 'get',
    path : '/books',
    request : {
        query : GetBooksQuerySchema,
    },
    responses:{
        200: {
            content: {
                'application/json' : {
                    schema : BooksResponseSchema,
                },
            },
            description : 'Get All Books!'
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});

export const getBooksByIdRoute = createRoute({
    method : 'get',
    path : '/books/{id}',
    request : {
        params : GetBooksByIdParamsSchema,
    },
    responses:{
        200: {
            content: {
                'application/json' : {
                    schema : BookSchema,
                },
            },
            description : 'Get Books by Id!'
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
        404: createErrorResponse('UNION','Not found')
    },
});

export const createBookRoute = createRoute({
    method : 'post',
    path : '/books',
    request : {
        body : {
            content : {
                'application/json' : {
                    schema : CreateBookBodySchema,
                },
            },
        },
    },
    responses:{
        201: {
            content: {
                'application/json' : {
                    schema : BookSchema,
                },
            },
            description : 'Book created!'
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});