import { createRoute } from '@hono/zod-openapi';
import {
  GetBookByIdParamsSchema,
  GetBookByIdResponseSchema,
  GetBooksQuerySchema,
  GetBooksResponseSchema,
} from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getBooksRoute = createRoute({
  operationId: 'getBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: GetBooksQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBooksResponseSchema,
        },
      },
      description: 'Successfully fetched books',
    },
    400: createErrorResponse('VALIDATION', 'Validation error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookByIdRoute = createRoute({
  operationId: 'getBookById',
  tags: ['books'],
  method: 'get',
  path: '/books/{id}',
  request: {
    params: GetBookByIdParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookByIdResponseSchema,
        },
      },
      description: 'Successfully fetched book by id',
    },
    400: createErrorResponse('VALIDATION', 'Validation error'),
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
