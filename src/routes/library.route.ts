import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getLibraryStatusRoute = createRoute({
  operationId: 'getLibraryStatus',
  tags: ['library'],
  method: 'get',
  path: '/library/status',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            totalBooks: z.number(),
            totalAvailable: z.number(),
          }),
        },
      },
      description: 'Successfully fetched library statistics',
    },
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
