import { createRoute } from '@hono/zod-openapi';

import { BookListResponseSchema } from '~/types/book.type';
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
