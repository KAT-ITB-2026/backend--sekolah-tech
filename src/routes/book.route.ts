import { createRoute, z } from '@hono/zod-openapi';

import { BookListResponseSchema, BookResponseSchema } from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getAllBooksRoute = createRoute({
  operationId: 'getAllBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookListResponseSchema,
        },
      },
      description: 'List all books',
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
  request: {
    params: z.object({
      id: z.string().min(1),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookResponseSchema,
        },
      },
      description: 'Get a book by id',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
