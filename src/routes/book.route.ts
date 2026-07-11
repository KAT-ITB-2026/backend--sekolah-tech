import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory.js';

const BookSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publishedYear: z.number().nullable(),
    isAvailable: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi('Book');

export const getBooksRoute = createRoute({
  operationId: 'getBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: z.object({
      isAvailable: z
        .enum(['true', 'false'])
        .optional()
        .openapi({
          param: {
            name: 'isAvailable',
            in: 'query',
            required: false,
            description: 'Filter buku berdasarkan ketersediaan (true/false)',
          },
        }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(BookSchema),
        },
      },
      description: 'Retrieve a list of books',
    },
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
