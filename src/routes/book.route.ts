import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getAllBooksQuerySchema = z.object({
  isAvailable: z.coerce.boolean().optional(),
});

export const getAllBooksRoute = createRoute({
  operationId: 'getAllBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: getAllBooksQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                author: z.string(),
                publishedYear: z.number().nullable(),
                isAvailable: z.boolean(),
                createdAt: z.string(),
                updatedAt: z.string(),
              }),
            ),
          }),
        },
      },
      description: 'Successfully fetched all books',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
