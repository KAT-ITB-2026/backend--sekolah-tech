import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';
import { GetBooksQuerySchema, BooksResponseSchema } from '~/types/book.type'


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